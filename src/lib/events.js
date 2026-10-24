// Window events that let separate client components talk without shared state.

export function openPalette() {
  window.dispatchEvent(new Event("rahul:palette"));
}

export function openProject(slug) {
  window.dispatchEvent(new CustomEvent("rahul:project", { detail: { slug } }));
}
