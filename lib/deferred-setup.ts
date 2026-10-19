"use client";

import { useGSAP } from "@gsap/react";

/**
 * Below-the-fold scroll setup (pins, scrubbed timelines) is expensive: every
 * pinned ScrollTrigger forces a full-page style + layout pass when created.
 * Run inside React's hydration commit, those passes pile up into one long
 * main-thread task that delays the first paint of real content and makes the
 * page feel stuck on slower phones.
 *
 * This queue runs such setups after hydration, once the browser is idle, one
 * per animation frame and in the order they were queued (top of the page
 * first). Visitors can't reach those sections within that fraction of a
 * second, so what they see is unchanged. ScrollEffects queues its own work
 * last, so its final ScrollTrigger.refresh() measures every pin.
 */

type Task = () => void;

const queue: Task[] = [];
let pumping = false;

function pump() {
  const task = queue.shift();
  if (!task) {
    pumping = false;
    return;
  }
  task();
  requestAnimationFrame(pump);
}

export function queueSetup(task: Task): () => void {
  queue.push(task);
  if (!pumping) {
    pumping = true;
    const start = () => requestAnimationFrame(pump);
    // Safari has no requestIdleCallback.
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(start, { timeout: 400 });
    else setTimeout(start, 50);
  }
  return () => {
    const i = queue.indexOf(task);
    if (i !== -1) queue.splice(i, 1);
  };
}

/**
 * Drop-in for useGSAP whose callback runs from the setup queue instead of
 * during the commit. Everything it creates still belongs to the component's
 * GSAP context, so it is reverted on unmount exactly like with useGSAP.
 */
export function useDeferredGSAP(setup: () => void, config: Parameters<typeof useGSAP>[1]) {
  useGSAP((_context, contextSafe) => {
    if (!contextSafe) return;
    return queueSetup(contextSafe(setup));
  }, config);
}
