import type { KeyboardEvent } from "react";

/**
 * Props that make a clickable, non-button element (accordion row, expanding
 * card) reachable and operable from the keyboard and announced as expandable.
 * Mouse behaviour and looks are unchanged: browsers only draw the focus ring
 * for keyboard focus.
 */
export function expandableProps(expanded: boolean, onToggle: () => void) {
  return {
    role: "button" as const,
    tabIndex: 0,
    "aria-expanded": expanded,
    onClick: onToggle,
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      }
    },
  };
}
