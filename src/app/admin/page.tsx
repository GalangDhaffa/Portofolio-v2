import prisma from "@/lib/prisma"
import { HiUser, HiCollection, HiPhotograph, HiChatAlt2 } from "react-icons/hi"

export default async function AdminDashboard() {
  const [skillCount, projectCount, messageCount] = await Promise.all([
    prisma.skill.count(),
    prisma.project.count(),
    prisma.message.count(),
  ])

  const stats = [
    { name: 'Total Skills', count: skillCount, icon: <HiUser />, color: 'bg-blue-500/20 text-blue-500' },
    { name: 'Total Projects', count: projectCount, icon: <HiCollection />, color: 'bg-purple-500/20 text-purple-500' },
    { name: 'Total Messages', count: messageCount, icon: <HiChatAlt2 />, color: 'bg-green-500/20 text-green-500' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-2xl flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-foreground/60 text-sm font-medium">{stat.name}</p>
              <h3 className="text-3xl font-bold">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="glass p-8 rounded-3xl">
        <h2 className="text-xl font-bold mb-4">Selamat Datang!</h2>
        <p className="text-foreground/70">
          Gunakan menu di sebelah kiri untuk mengelola konten portofolio Anda.
          Pastikan untuk menyimpan perubahan setiap kali Anda memperbarui data.
        </p>
      </div>
    </div>
  )
}
