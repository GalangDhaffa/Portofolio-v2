"use client"
import React, { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxElementProps {
  children: React.ReactNode
  offset?: number
  className?: string
}

export default function ParallaxElement({ children, offset = 50, className = "" }: ParallaxElementProps) {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Move opposite to scroll direction (creates depth)
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
