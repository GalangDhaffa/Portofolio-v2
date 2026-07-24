"use client"
import { motion } from "framer-motion"
import Reveal from "./Reveal"

interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLast?: boolean
}

export function TimelineItem({ year, title, description, isLast }: TimelineItemProps) {
  return (
    <div className="relative pl-8 sm:pl-32 py-6 group">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] sm:left-[107px] top-10 bottom-0 w-[2px] bg-foreground/10 group-hover:bg-primary/50 transition-colors duration-500" />
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-0 sm:left-24 top-8 w-6 h-6 rounded-full border-4 border-background bg-primary shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:scale-125 transition-transform duration-300" />
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-12 items-start w-full">
        {/* Year */}
        <div className="text-primary font-bold text-xl sm:w-48 whitespace-nowrap shrink-0 sm:text-left mt-1">
          {year}
        </div>
        
        {/* Content */}
        <div className="flex-1 w-full">
          <Reveal>
            <div className="glass p-6 rounded-2xl w-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-primary/50">
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-foreground/70 leading-relaxed">
                {description}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
