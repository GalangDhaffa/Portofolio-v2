"use client"
import { useEffect, useState } from "react"

interface GlitchTextProps {
  text: string
  delay?: number
  className?: string
}

export default function GlitchText({ text, delay = 0, className = '' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), delay)
    const stopTimer = setTimeout(() => setIsGlitching(false), delay + 2000)

    return () => {
      clearTimeout(mountTimer)
      clearTimeout(stopTimer)
    }
  }, [delay])

  return (
    <span className={`inline-block relative ${className}`}>
      <span className={mounted && isGlitching ? 'glitch-text' : ''} data-text={text}>
        {text}
      </span>
    </span>
  )
}
