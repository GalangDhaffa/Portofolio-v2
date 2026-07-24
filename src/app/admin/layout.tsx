"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { HiHome, HiUser, HiCollection, HiChatAlt2, HiLogout, HiOutlineViewGrid, HiClock, HiUsers, HiVideoCamera, HiStar, HiLightningBolt } from "react-icons/hi"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const navs = [
    { name: 'Dashboard', href: '/admin', icon: <HiHome /> },
    { name: 'Home Setup', href: '/admin/home', icon: <HiStar /> },
    { name: 'About Setup', href: '/admin/about', icon: <HiUser /> },
    { name: 'Works Setup', href: '/admin/works', icon: <HiCollection /> },
    { name: 'Latest Content', href: '/admin/content', icon: <HiVideoCamera /> },
    { name: 'API Integrations', href: '/admin/integrations', icon: <HiLightningBolt /> },
    { name: 'Messages', href: '/admin/messages', icon: <HiChatAlt2 /> },
  ]

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-white/5 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-bold text-gradient">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navs.map((nav) => {
            const isActive = pathname === nav.href
            return (
              <Link
                key={nav.name}
                href={nav.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-foreground/70 hover:bg-white/5 hover:text-white'}`}
              >
                <span className="text-xl">{nav.icon}</span>
                <span className="font-medium">{nav.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors font-medium"
          >
            <HiLogout className="text-xl" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-card border-b border-white/5 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gradient">Admin Panel</h2>
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="text-red-400 p-2 bg-red-500/10 rounded-lg"
          >
            <HiLogout />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
