"use client"
import { usePathname } from "next/navigation"

import { FaYoutube, FaTiktok } from "react-icons/fa6"

export default function Footer() {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) return null

  return (
    <footer className="w-full py-8 text-center text-foreground/60 border-t border-white/5 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dhaffa Galang Fahriza. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="https://www.youtube.com/@Langz7z" target="_blank" className="hover:text-primary transition p-2 text-2xl" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://www.tiktok.com/@langz7z" target="_blank" className="hover:text-primary transition p-2 text-2xl" aria-label="TikTok">
            <FaTiktok />
          </a>
        </div>
      </div>
    </footer>
  )
}
