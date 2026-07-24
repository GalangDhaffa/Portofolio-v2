"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Hanya jalankan preloader saat pertama kali web di-load atau di-refresh (di halaman manapun),
  // bukan saat navigasi antar halaman (Next.js SPA routing)
  useEffect(() => {
    // Jika ada session storage berarti sudah pernah load
    const hasLoaded = sessionStorage.getItem("hasLoadedPreloader")
    
    if (hasLoaded) {
      setIsLoading(false)
      return
    }

    // Simulasi loading 4 detik
    const timer = setTimeout(() => {
      setIsLoading(false)
      sessionStorage.setItem("hasLoadedPreloader", "true")
    }, 4000)

    return () => clearTimeout(timer)
  }, [])



  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Black Hole Animation for Preloader */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-primary/80 opacity-50"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
              className="absolute inset-4 rounded-full border-b-2 border-cyan-400/80 opacity-70"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-black shadow-[0_0_30px_10px_rgba(34,211,238,0.5)]"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl font-light tracking-widest text-primary uppercase"
          >
            Entering Space...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
