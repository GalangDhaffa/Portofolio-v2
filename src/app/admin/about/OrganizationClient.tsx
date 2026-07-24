"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { HiTrash, HiPlus, HiPencil } from "react-icons/hi"
import { Organization } from "@prisma/client"

export default function OrganizationClient({ initialData }: { initialData: Organization[] }) {
  const router = useRouter()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [period, setPeriod] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [order, setOrder] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  function openAddModal() {
    setEditId(null)
    setPeriod("")
    setTitle("")
    setDescription("")
    setOrder(0)
    setIsModalOpen(true)
  }

  function openEditModal(item: Organization) {
    setEditId(item.id)
    setPeriod(item.period)
    setTitle(item.title)
    setDescription(item.description)
    setOrder(item.order)
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const url = editId ? `/api/organization/${editId}` : '/api/organization'
    const method = editId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ period, title, description, order })
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
    
    const res = await fetch(`/api/organization/${id}`, { method: 'DELETE' })
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
          <h2 className="text-2xl font-bold mb-2">Pengalaman Organisasi</h2>
          <p className="text-foreground/70">Kelola riwayat kepanitiaan dan organisasi.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <HiPlus /> Tambah Data
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="glass p-6 rounded-3xl flex justify-between items-center group relative border border-l-4 border-white/5 border-l-primary hover:border-white/20 transition-colors">
            <div>
              <div className="text-cyan-400 font-medium mb-1 text-sm">{item.period}</div>
              <h4 className="font-bold text-lg">{item.title}</h4>
              <p className="text-sm text-foreground/60 mt-1">{item.description}</p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => openEditModal(item)}
                className="text-blue-400 p-3 bg-blue-500/10 rounded-xl hover:bg-blue-500/20 transition-colors"
                title="Edit"
              >
                <HiPencil size={20} />
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="text-red-400 p-3 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors"
                title="Hapus"
              >
                <HiTrash size={20} />
              </button>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-12 text-foreground/50 glass rounded-3xl">
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
            <h2 className="text-2xl font-bold mb-6">{editId ? 'Edit Organisasi' : 'Tambah Data Baru'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Periode (Misal: 2023 - 2024)</label>
                <input 
                  type="text" 
                  required
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Posisi / Jabatan</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Deskripsi</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white h-24"
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
