"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface ScrollLockContextType {
  isUnlocked: boolean
  unlock: () => void
}

const ScrollLockContext = createContext<ScrollLockContextType | undefined>(undefined)

export function ScrollLockProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)

  const pathname = usePathname()

  useEffect(() => {
    // Hanya kunci scroll jika di halaman utama ('/') dan belum di-unlock
    if (pathname === '/' && !isUnlocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isUnlocked, pathname])

  const unlock = () => {
    setIsUnlocked(true)
  }

  return (
    <ScrollLockContext.Provider value={{ isUnlocked, unlock }}>
      {children}
    </ScrollLockContext.Provider>
  )
}

export function useScrollLock() {
  const context = useContext(ScrollLockContext)
  if (context === undefined) {
    throw new Error('useScrollLock must be used within a ScrollLockProvider')
  }
  return context
}
