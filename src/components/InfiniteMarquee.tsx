import React from "react"

interface InfiniteMarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: "left" | "right"
  pauseOnHover?: boolean
  className?: string
}

export default function InfiniteMarquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  className = "",
}: InfiniteMarqueeProps) {
  return (
    <div className={`overflow-hidden flex w-full group ${className}`}>
      <div 
        className={`flex min-w-full shrink-0 gap-6 animate-marquee ${direction === "right" ? "animate-marquee-reverse" : ""} ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      {/* Duplicate for seamless loop */}
      <div 
        className={`flex min-w-full shrink-0 gap-6 animate-marquee ${direction === "right" ? "animate-marquee-reverse" : ""} ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}
