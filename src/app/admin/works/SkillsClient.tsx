"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { UploadButton } from "@/utils/uploadthing"
import { addSkill, deleteSkill, updateSkill } from "@/app/actions/skills"
import { HiTrash, HiPlus, HiPencil } from "react-icons/hi"
import { Skill } from "@prisma/client"

export default function SkillsClient({ initialSkills }: { initialSkills: Skill[] }) {
  const router = useRouter()
  const [skills, setSkills] = useState(initialSkills)

  useEffect(() => {
    setSkills(initialSkills)
  }, [initialSkills])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
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
    setName("")
    setDescription("")
    setImage("")
    setIsModalOpen(true)
  }

  function openEditModal(item: Skill) {
    setEditId(item.id)
    setName(item.name)
    setDescription(item.description || "")
    setImage(item.image)
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append("name", name)
    formData.append("description", description)
    formData.append("image", image)

    const res = editId 
      ? await updateSkill(editId, formData)
      : await addSkill(formData)
      
    setIsLoading(false)

    if (res.success) {
      toast.success(editId ? "Skill berhasil diperbarui!" : "Skill berhasil ditambahkan!")
      setIsModalOpen(false)
      router.refresh()
    } else {
      toast.error(res.message || "Terjadi kesalahan")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus skill ini?")) return
    
    const res = await deleteSkill(id)
    if (res.success) {
      toast.success("Skill berhasil dihapus!")
      setSkills(skills.filter(s => s.id !== id))
    } else {
      toast.error("Gagal menghapus skill.")
    }
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Skills & Keahlian</h2>
          <p className="text-foreground/70">Kelola keahlian dan bahasa pemrograman Anda.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <HiPlus /> Tambah Skill
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <div key={skill.id} className="glass p-6 rounded-3xl text-center group relative border border-white/5 hover:border-white/20 transition-colors">
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => openEditModal(skill)}
                className="text-blue-400 p-2 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-colors"
                title="Edit"
              >
                <HiPencil />
              </button>
              <button 
                onClick={() => handleDelete(skill.id)}
                className="text-red-400 p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
                title="Hapus"
              >
                <HiTrash />
              </button>
            </div>
            <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-2xl flex items-center justify-center p-3">
              <img src={skill.image} alt={skill.name} className="max-w-full max-h-full object-contain" />
            </div>
            <h4 className="font-bold mb-1">{skill.name}</h4>
            {skill.description && (
              <p className="text-xs text-foreground/50 line-clamp-2">{skill.description}</p>
            )}
          </div>
        ))}
        {skills.length === 0 && (
          <div className="col-span-full text-center py-12 text-foreground/50 glass rounded-3xl">
            Belum ada skill yang ditambahkan.
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
            <h2 className="text-2xl font-bold mb-6">{editId ? 'Edit Skill' : 'Tambah Skill Baru'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama Skill</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Deskripsi (Opsional)</label>
                <input 
                  type="text" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Logo / Icon</label>
                {image ? (
                  <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/10">
                    <img src={image} alt="Preview" className="w-12 h-12 object-contain" />
                    <button type="button" onClick={() => setImage("")} className="text-sm text-red-400">Ganti Foto</button>
                  </div>
                ) : (
                  <div className="bg-black/20 p-4 rounded-xl border border-white/10 border-dashed">
                    {uploadBtnMemo}
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading || !image}
                className="w-full bg-primary hover:bg-blue-600 disabled:opacity-50 text-white py-3 rounded-xl font-medium mt-6 transition-colors shadow-lg hover:shadow-blue-500/25"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan Skill'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
