"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { HiTrash, HiPlus, HiPencil } from "react-icons/hi"
import { ServiceCard } from "@prisma/client"

export default function ServiceClient({ initialData }: { initialData: ServiceCard[] }) {
  const router = useRouter()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [iconName, setIconName] = useState("HiGlobeAlt")
  const [link, setLink] = useState("")
  const [order, setOrder] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  function openAddModal() {
    setEditId(null)
    setTitle("")
    setDescription("")
    setIconName("HiGlobeAlt")
    setLink("")
    setOrder(0)
    setIsModalOpen(true)
  }

  function openEditModal(item: ServiceCard) {
    setEditId(item.id)
    setTitle(item.title)
    setDescription(item.description)
    setIconName(item.iconName)
    setLink(item.link || "")
    setOrder(item.order)
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const url = editId ? `/api/service/${editId}` : '/api/service'
    const method = editId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, iconName, link, order })
    })

    setIsLoading(false)

    if (res.ok) {
      toast.success(editId ? "Berhasil diperbarui!" : "Berhasil ditambahkan!")
      setIsModalOpen(false)
      router.refresh()
    } else {
      toast.error("Gagal menyimpan data")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus?")) return
    
    const res = await fetch(`/api/service/${id}`, { method: 'DELETE' })
    if (res.ok) {
      toast.success("Berhasil dihapus!")
      setData(data.filter(d => d.id !== id))
    } else {
      toast.error("Gagal menghapus.")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Service Cards (Home)</h2>
          <p className="text-foreground/70">Kelola 3 Card yang muncul di halaman utama.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <HiPlus /> Tambah Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.id} className="glass p-6 rounded-3xl group relative flex flex-col border border-white/5 hover:border-white/20 transition-colors">
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={() => openEditModal(item)}
                className="text-blue-400 p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                title="Edit"
              >
                <HiPencil />
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="text-red-400 p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                title="Hapus"
              >
                <HiTrash />
              </button>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4 font-mono text-xs">
              {item.iconName}
            </div>
            <h4 className="font-bold text-xl mb-2">{item.title}</h4>
            <p className="text-sm text-foreground/70 mb-4">{item.description}</p>
            {item.link && (
              <span className="text-sm text-primary mt-auto">Link: {item.link}</span>
            )}
          </div>
        ))}
        {data.length === 0 && (
          <div className="col-span-full text-center py-12 text-foreground/50 glass rounded-3xl">
            Belum ada data.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass w-full max-w-lg p-8 rounded-3xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-foreground/50 hover:text-white"
            >
              Tutup
            </button>
            <h2 className="text-2xl font-bold mb-6">{editId ? 'Edit Card' : 'Tambah Card Baru'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Judul</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Deskripsi Singkat</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white h-20"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama Ikon (react-icons/hi)</label>
                <input 
                  type="text" 
                  required
                  placeholder="Misal: HiGlobeAlt, HiVideoCamera"
                  value={iconName}
                  onChange={(e) => setIconName(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
                <p className="text-xs text-foreground/50">Cari ikon di: react-icons.github.io/react-icons/icons/hi</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link Tujuan (Opsional)</label>
                <input 
                  type="text" 
                  placeholder="Misal: https://instagram.com/..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Urutan (Angka)</label>
                <input 
                  type="number" 
                  value={order}
                  onChange={(e) => setOrder(parseInt(e.target.value))}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-primary hover:bg-blue-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium mt-6 transition-colors shadow-lg hover:shadow-blue-500/25"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Data'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
