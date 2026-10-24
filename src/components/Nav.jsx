"use client";

import { useEffect, useState } from "react";
import { openPalette } from "@/lib/events";
import { useIsMac } from "@/lib/useIsMac";
import { Search } from "./Icons";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
];

export default function Nav() {
  const [active, setActive] = useState("");
  const isMac = useIsMac();

  useEffect(() => {
    const sections = ["top", ...links.map((link) => link.id), "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg">
      <nav aria-label="Primary" className="shell flex h-14 items-center justify-between gap-4">
        <a href="#top" className="font-semibold tracking-tight [font-stretch:110%]">
          Rahul Bagga
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={`text-sm underline-offset-[6px] transition-colors ${
                  active === link.id
                    ? "text-fg underline decoration-fg"
                    : "text-muted hover:text-fg"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command menu"
            className="flex h-9 items-center gap-2 rounded-sm border border-line px-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <Search className="size-4" />
            <kbd className="hidden font-mono text-[11px] sm:inline">
              {isMac ? "⌘" : "Ctrl"} K
            </kbd>
          </button>
          <a
            href="#contact"
            aria-current={active === "contact" ? "true" : undefined}
            className="flex h-9 items-center rounded-sm bg-fg px-3.5 text-sm font-medium text-bg transition-colors hover:bg-white"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
