"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useIsMac } from "@/lib/useIsMac";
import { Check, Copy } from "./Icons";

const londonTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  hour: "2-digit",
  minute: "2-digit",
  timeZoneName: "short",
});

function subscribeToClock(callback) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function readClock() {
  const parts = londonTime.formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("hour")}:${get("minute")} ${get("timeZoneName")}`;
}

export function LondonClock() {
  const value = useSyncExternalStore(subscribeToClock, readClock, () => null);
  const [time, zone] = value ? value.split(" ") : ["--:--", "GMT"];

  return (
    <p className="flex items-baseline gap-3">
      <time className="font-mono text-5xl tabular-nums tracking-tight">{time}</time>
      <span className="font-mono text-xs text-subtle">{zone}</span>
    </p>
  );
}

export function CopyEmailButton({ email }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-11 items-center gap-2 rounded-sm border border-line-strong px-5 text-sm transition-colors hover:border-fg"
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}

export function ShortcutHint() {
  const isMac = useIsMac();
  return (
    <kbd className="rounded-sm border border-line px-1.5 py-0.5 font-mono text-[11px]">
      {isMac ? "⌘" : "Ctrl"} K
    </kbd>
  );
}
