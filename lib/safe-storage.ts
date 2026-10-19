// localStorage throws (SecurityError) when site data is blocked, e.g. in some
// private windows or with strict cookie settings. A thrown error inside an
// effect would reach the error boundary and replace the whole page, so every
// read/write goes through these and simply degrades to "nothing stored".

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable: the choice just won't persist across visits.
  }
}
