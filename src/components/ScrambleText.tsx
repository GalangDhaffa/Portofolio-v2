"use client"
import React, { useEffect, useState, useRef } from 'react'

interface ScrambleTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
}

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

export default function ScrambleText({ text, delay = 0, speed = 50, className = '' }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isScrambling, setIsScrambling] = useState(false)
  const frameRef = useRef(0)
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([])
  const frameCountRef = useRef(0)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const startAnimation = () => {
      setIsScrambling(true)
      let length = text.length
      queueRef.current = []
      
      for (let i = 0; i < length; i++) {
        const from = CHARS[Math.floor(Math.random() * CHARS.length)]
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        queueRef.current.push({ from, to: text[i], start, end })
      }

      const update = () => {
        let output = ''
        let complete = 0
        
        for (let i = 0, n = queueRef.current.length; i < n; i++) {
          let { from, to, start, end, char } = queueRef.current[i]
          
          if (frameCountRef.current >= end) {
            complete++
            output += to
          } else if (frameCountRef.current >= start) {
            if (!char || Math.random() < 0.28) {
              char = CHARS[Math.floor(Math.random() * CHARS.length)]
              queueRef.current[i].char = char
            }
            output += `<span class="opacity-70">${char}</span>`
          } else {
            output += from
          }
        }
        
        setDisplayText(output)
        
        if (complete === queueRef.current.length) {
          setIsScrambling(false)
        } else {
          frameRef.current = requestAnimationFrame(update)
          frameCountRef.current += (60 / speed)
        }
      }

      update()
    }

    timeoutId = setTimeout(startAnimation, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(frameRef.current)
    }
  }, [text, delay, speed])

  return (
    <span 
      className={className} 
      dangerouslySetInnerHTML={{ __html: displayText || text }} 
    />
  )
}
