"use client"
import { HiArrowDown } from "react-icons/hi"
import { useScrollLock } from "@/context/ScrollLockContext"

export default function NextButton({ cvUrl }: { cvUrl?: string | null }) {
  const { isUnlocked, unlock } = useScrollLock()

  const handleNext = () => {
    unlock()
    const aboutSection = document.getElementById("aboutme")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col items-center lg:items-start gap-3">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={handleNext} 
          className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] flex items-center justify-center group w-max"
        >
          <span className="flex items-center gap-3 group-hover:translate-y-1 transition-transform duration-300">
            Next <HiArrowDown />
          </span>
        </button>
        
        {cvUrl && (
          <a 
            href={cvUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="glass px-8 py-4 rounded-full hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center font-medium"
          >
            Lihat CV
          </a>
        )}
      </div>
      
      {!isUnlocked && (
        <span className="text-xs text-foreground/50 animate-pulse font-medium tracking-wide text-center lg:text-left">
          Klik tombol ini untuk membuka kunci scroll
        </span>
      )}
    </div>
  )
}
