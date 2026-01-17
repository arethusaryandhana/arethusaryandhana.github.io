export type ThemeMode = "system" | "light" | "dark"

const storageKey = "aa-portfolio.theme"

export function getSystemTheme(): Exclude<ThemeMode, "system"> {
  if (typeof window === "undefined") return "dark"
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function getStoredThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system"
  const raw = window.localStorage.getItem(storageKey)
  if (raw === "light" || raw === "dark" || raw === "system") return raw
  return "system"
}

export function setStoredThemeMode(mode: ThemeMode) {
  window.localStorage.setItem(storageKey, mode)
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement
  root.classList.remove("dark")

  const resolved = mode === "system" ? getSystemTheme() : mode
  if (resolved === "dark") root.classList.add("dark")
}
