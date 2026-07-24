"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { HiMenu, HiX, HiSun, HiMoon, HiHome, HiUser, HiLightningBolt, HiCollection, HiMail } from "react-icons/hi"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useScrollLock } from "@/context/ScrollLockContext"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isUnlocked } = useScrollLock()
  
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (pathname.startsWith('/admin')) return null

  const navLinks = [
    { name: 'Home', href: '/', icon: <HiHome className="inline mr-2" /> },
    { name: 'About', href: '/about', icon: <HiUser className="inline mr-2" /> },
    { name: 'Skills', href: '/skills', icon: <HiLightningBolt className="inline mr-2" /> },
    { name: 'Projects', href: '/projects', icon: <HiCollection className="inline mr-2" /> },
    { name: 'Contact', href: '/#contact', icon: <HiMail className="inline mr-2" /> },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-background/60 py-3 shadow-lg' : 'bg-transparent py-5 border-none'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {mounted ? (
              <Image 
                src={resolvedTheme === 'dark' ? '/assets/img/logo-dark.png' : '/assets/img/logo-light.png'} 
                alt="Logo" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            ) : (
              <div className="w-[40px] h-[40px]"></div>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center font-medium text-sm tracking-wide transition-all ${
                  isUnlocked 
                    ? 'text-foreground/80 hover:text-primary' 
                    : 'opacity-40 pointer-events-none cursor-not-allowed'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <button 
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-white/10 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {mounted && (resolvedTheme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />)}
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-white/10 text-foreground/80 hover:text-primary transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {mounted && (resolvedTheme === 'dark' ? <HiSun size={20} /> : <HiMoon size={20} />)}
            </button>
            <button
              className="text-foreground text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden glass absolute top-full left-0 w-full flex flex-col py-4 px-6 border-t border-white/10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (!isUnlocked) {
                    e.preventDefault()
                    return
                  }
                  setIsMobileMenuOpen(false)
                }}
                className={`flex items-center py-3 font-medium text-lg border-b border-white/5 last:border-0 transition-all ${
                  isUnlocked 
                    ? 'text-foreground/80 hover:text-primary' 
                    : 'opacity-40 pointer-events-none cursor-not-allowed'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
