"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { UploadButton } from "@/utils/uploadthing"
import { HiTrash, HiPlus, HiPencil } from "react-icons/hi"
import { SocialContent } from "@prisma/client"

export default function ContentClient({ initialData }: { initialData: SocialContent[] }) {
  const router = useRouter()
  const [data, setData] = useState(initialData)

  useEffect(() => {
    setData(initialData)
  }, [initialData])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const [platform, setPlatform] = useState("YouTube")
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [link, setLink] = useState("")
  const [order, setOrder] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const uploadBtnMemo = useMemo(() => (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]) setImage(res[0].url)
      }}
      onUploadError={(error: Error) => toast.error(error.message)}
      appearance={{
        button: "bg-primary hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm",
      }}
    />
  ), [setImage])

  function openAddModal() {
    setEditId(null)
    setPlatform("YouTube")
    setTitle("")
    setImage("")
    setLink("")
    setOrder(0)
    setIsModalOpen(true)
  }

  function openEditModal(item: SocialContent) {
    setEditId(item.id)
    setPlatform(item.platform)
    setTitle(item.title)
    setImage(item.image)
    setLink(item.link || "")
    setOrder(item.order)
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const url = editId ? `/api/content/${editId}` : '/api/content'
    const method = editId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, title, image, link, order })
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
    
    const res = await fetch(`/api/content/${id}`, { method: 'DELETE' })
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
        <p className="text-foreground/70">Kelola konten YouTube, TikTok, dan Instagram.</p>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <HiPlus /> Tambah Konten
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
            <div className="w-full h-32 mb-4 bg-black/20 rounded-xl overflow-hidden relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                {item.platform}
              </div>
            </div>
            <h4 className="font-bold mb-2 flex-1">{item.title}</h4>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline">
                Buka Link
              </a>
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
          <div className="glass w-full max-w-lg p-8 rounded-3xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-foreground/50 hover:text-white"
            >
              Tutup
            </button>
            <h2 className="text-2xl font-bold mb-6">{editId ? 'Edit Konten' : 'Tambah Konten Baru'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <select 
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white appearance-none"
                >
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Judul Konten</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link URL (Opsional)</label>
                <input 
                  type="url" 
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Thumbnail / Foto</label>
                {image ? (
                  <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/10">
                    <img src={image} alt="Preview" className="w-16 h-12 object-cover rounded" />
                    <button type="button" onClick={() => setImage("")} className="text-sm text-red-400">Ganti Foto</button>
                  </div>
                ) : (
                  <div className="bg-black/20 p-4 rounded-xl border border-white/10 border-dashed">
                    {uploadBtnMemo}
                  </div>
                )}
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
                disabled={isLoading || !image}
                className="w-full bg-primary hover:bg-blue-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium mt-6 transition-colors shadow-lg hover:shadow-blue-500/25"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Konten'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
