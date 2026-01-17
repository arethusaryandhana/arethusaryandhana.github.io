import { useEffect, useMemo, useState } from "react"
import { applyTheme, getStoredThemeMode, setStoredThemeMode, type ThemeMode } from "../lib/theme"

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => getStoredThemeMode())

  useEffect(() => {
    applyTheme(mode)
    setStoredThemeMode(mode)
  }, [mode])

  useEffect(() => {
    if (mode !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => applyTheme("system")
    mq.addEventListener?.("change", handler)
    return () => mq.removeEventListener?.("change", handler)
  }, [mode])

  const resolvedMode = useMemo(() => {
    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return mode
  }, [mode])

  return { mode, resolvedMode, setMode }
}
