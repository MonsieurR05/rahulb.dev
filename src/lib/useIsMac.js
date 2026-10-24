"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => /Mac|iPhone|iPad/.test(navigator.userAgent);
const getServerSnapshot = () => true;

// Picks the right shortcut label (⌘ vs Ctrl) without a hydration mismatch.
export function useIsMac() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
