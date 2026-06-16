import { useEffect } from "react"
import { applyTheme } from "../lib/theme"

export function useTheme() {
  useEffect(() => {
    applyTheme()
  }, [])
}
