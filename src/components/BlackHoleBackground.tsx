"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function BlackHoleBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark mode position (bottom) before mount
  const isDark = !mounted || resolvedTheme === "dark"

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* The black hole orb - slides between top and bottom */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-[140%] aspect-square rounded-full transition-all duration-[1500ms] ease-in-out"
        style={{
          background: `radial-gradient(circle, var(--hole-core) 20%, var(--hole-ring) 45%, var(--hole-edge) 70%)`,
          filter: "blur(30px)",
          top: isDark ? "-150%" : "-30%",
        }}
      />
    </div>
  )
}
