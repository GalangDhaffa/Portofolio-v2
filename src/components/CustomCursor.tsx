"use client"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.remove('custom-cursor-active')
      return
    }

    document.body.classList.add('custom-cursor-active')

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const points: { x: number; y: number; age: number }[] = []
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let isMoving = false

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      isMoving = true
      points.push({ x: mouseX, y: mouseY, age: 0 })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update ages and remove old points
      for (let i = 0; i < points.length; i++) {
        points[i].age += 1
      }
      while (points.length > 0 && points[0].age > 20) {
        points.shift()
      }

      // Draw tail
      if (points.length > 1) {
        ctx.beginPath()
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i]
          const p2 = points[i + 1]
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)

          // Calculate thickness and opacity based on age
          const life = 1 - p1.age / 20
          ctx.lineWidth = life * 8
          const colorRGB = resolvedTheme === 'light' ? '17, 24, 39' : '255, 255, 255'
          ctx.strokeStyle = `rgba(${colorRGB}, ${life * 0.8})` // Dynamic glow
          ctx.lineCap = "round"
          ctx.lineJoin = "round"
          ctx.stroke()
          ctx.beginPath() // Start new path for next line segment to apply different styles
        }
      }

      const colorRGB = resolvedTheme === 'light' ? '17, 24, 39' : '255, 255, 255'

      // Draw main cursor dot (comet head)
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${colorRGB}, 1)`
      ctx.fill()

      // Glow effect on head
      ctx.beginPath()
      ctx.arc(mouseX, mouseY, 12, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${colorRGB}, 0.4)`
      ctx.fill()

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)

    resize()
    animate()

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isAdmin, resolvedTheme])

  if (isAdmin) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    />
  )
}
