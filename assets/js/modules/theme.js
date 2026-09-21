// Theme switching: applies data-theme on <html>, persists the choice in
// localStorage, and honours a ?theme= query param override. Adding a new
// theme only requires: 1) a new CSS file in assets/css/themes/, and
// 2) a new entry in data/site.json -> theme.available.

const STORAGE_KEY = 'portfolio-theme';
const loadedStylesheets = new Map();

function loadThemeStylesheet(theme) {
  if (loadedStylesheets.has(theme.id)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = theme.file;
  link.dataset.themeId = theme.id;
  document.head.append(link);
  loadedStylesheets.set(theme.id, link);
}

export function applyTheme(themeId, siteConfig) {
  const theme = siteConfig.theme.available.find((t) => t.id === themeId) || siteConfig.theme.available[0];
  loadThemeStylesheet(theme);
  document.documentElement.setAttribute('data-theme', theme.id);
  try { localStorage.setItem(STORAGE_KEY, theme.id); } catch (err) { /* storage unavailable, ignore */ }
  return theme;
}

export function resolveInitialTheme(siteConfig) {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('theme');
  if (fromQuery && siteConfig.theme.available.some((t) => t.id === fromQuery)) return fromQuery;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && siteConfig.theme.available.some((t) => t.id === stored)) return stored;
  } catch (err) { /* storage unavailable, ignore */ }

  return siteConfig.theme.active;
}

export function initThemeToggle(siteConfig, buttonId = 'theme-toggle') {
  const button = document.getElementById(buttonId);
  if (!button) return;

  const cycle = () => {
    const current = document.documentElement.getAttribute('data-theme');
    const list = siteConfig.theme.available;
    const nextIndex = (list.findIndex((t) => t.id === current) + 1) % list.length;
    const next = applyTheme(list[nextIndex].id, siteConfig);
    button.textContent = `Theme: ${next.label}`;
  };

  const activeId = document.documentElement.getAttribute('data-theme');
  const activeTheme = siteConfig.theme.available.find((t) => t.id === activeId);
  if (activeTheme) button.textContent = `Theme: ${activeTheme.label}`;
  button.addEventListener('click', cycle);
}
