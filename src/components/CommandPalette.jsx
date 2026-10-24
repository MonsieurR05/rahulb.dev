"use client";

import { Fragment, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { contact, projects } from "@/data/portfolio";
import { openProject } from "@/lib/events";
import { Copy, Folder, GitHub, Hash, Mail, Search } from "./Icons";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const commands = [
  { id: "work", group: "Navigate", label: "Work", hint: "Selected projects", icon: Hash, run: () => scrollToSection("work") },
  { id: "about", group: "Navigate", label: "About", hint: "Focus, education, toolkit", icon: Hash, run: () => scrollToSection("about") },
  { id: "experience", group: "Navigate", label: "Experience", hint: "Education and work", icon: Hash, run: () => scrollToSection("experience") },
  { id: "contact", group: "Navigate", label: "Contact", hint: "Get in touch", icon: Hash, run: () => scrollToSection("contact") },
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    group: "Projects",
    label: project.title,
    hint: project.type,
    icon: Folder,
    run: () => openProject(project.slug),
  })),
  {
    id: "copy-email",
    group: "Contact",
    label: "Copy email address",
    hint: contact.email,
    icon: Copy,
    run: ({ notify }) =>
      navigator.clipboard
        .writeText(contact.email)
        .then(() => notify("Email copied to clipboard"))
        .catch(() => notify(contact.email)),
  },
  {
    id: "email",
    group: "Contact",
    label: "Send an email",
    icon: Mail,
    run: () => {
      window.location.href = `mailto:${contact.email}`;
    },
  },
  {
    id: "github",
    group: "Contact",
    label: "Open GitHub",
    hint: contact.github.replace("https://", ""),
    icon: GitHub,
    run: () => window.open(contact.github, "_blank", "noopener,noreferrer"),
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState(null);
  const dialogRef = useRef(null);
  const listRef = useRef(null);
  const toastTimer = useRef(null);

  const items = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((item) =>
      `${item.label} ${item.hint ?? ""} ${item.group}`.toLowerCase().includes(needle)
    );
  }, [query]);

  function show() {
    setQuery("");
    setActive(0);
    setOpen(true);
  }

  function hide() {
    dialogRef.current?.close();
  }

  const handleShortcut = useEffectEvent((event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (open) hide();
      else show();
    }
  });

  const handleOpenRequest = useEffectEvent(() => show());

  useEffect(() => {
    const onKeyDown = (event) => handleShortcut(event);
    const onOpen = () => handleOpenRequest();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("rahul:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("rahul:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, items]);

  function notify(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }

  function select(item) {
    hide();
    item.run({ notify });
  }

  function handleKeyDown(event) {
    if (!items.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index - 1 + items.length) % items.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (items[active]) select(items[active]);
    }
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-label="Command menu"
        className="palette-dialog"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) hide();
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-subtle" />
          <input
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={items[active] ? `palette-${items[active].id}` : undefined}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search sections, projects, links…"
            spellCheck={false}
            autoComplete="off"
            className="h-14 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-subtle"
          />
          <kbd className="hidden rounded-sm border border-line px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">
            ESC
          </kbd>
        </div>

        <ul
          id="palette-list"
          ref={listRef}
          role="listbox"
          aria-label="Commands"
          className="max-h-[min(60dvh,420px)] overflow-y-auto overscroll-contain p-2"
        >
          {items.length === 0 && (
            <li role="presentation" className="px-3 py-8 text-center text-sm text-subtle">
              No results for “{query.trim()}”
            </li>
          )}
          {items.map((item, index) => {
            const Icon = item.icon;
            const startsGroup = index === 0 || items[index - 1].group !== item.group;
            return (
              <Fragment key={item.id}>
                {startsGroup && (
                  <li
                    role="presentation"
                    className="px-3 pb-1.5 pt-3 font-mono text-[11px] text-subtle"
                  >
                    {item.group}
                  </li>
                )}
                <li
                  id={`palette-${item.id}`}
                  role="option"
                  aria-selected={index === active}
                  onMouseMove={(event) => {
                    // Browsers fire zero-movement mousemoves when the list
                    // re-renders under a still cursor; ignore those.
                    if (event.movementX || event.movementY) setActive(index);
                  }}
                  onClick={() => select(item)}
                  className={`flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm ${
                    index === active ? "bg-white/[0.07] text-fg" : "text-muted"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                  {item.hint && (
                    <span className="ml-auto hidden truncate pl-4 text-xs text-subtle sm:block">
                      {item.hint}
                    </span>
                  )}
                </li>
              </Fragment>
            );
          })}
        </ul>

        <div className="hidden items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle sm:flex">
          <span>↑↓ navigate · ↵ select · esc close</span>
          <span>rahulb.dev</span>
        </div>
      </dialog>

      {toast && (
        <div
          role="status"
          className="toast fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-sm border border-line-strong bg-raised px-4 py-2.5 text-sm text-fg"
        >
          {toast}
        </div>
      )}
    </>
  );
}
