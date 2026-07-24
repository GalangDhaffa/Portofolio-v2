"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { UploadButton } from "@/utils/uploadthing"
import { addProject, deleteProject, updateProject } from "@/app/actions/projects"
import { HiTrash, HiPlus, HiPencil } from "react-icons/hi"
import { Project } from "@prisma/client"

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)

  useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")
  const [image, setImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const uploadBtnMemo = useMemo(() => (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]) setImage(res[0].url)
      }}
      onUploadError={(error: Error) => { toast.error(error.message) }}
      appearance={{
        button: "bg-primary hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm",
      }}
    />
  ), [setImage])

  function openAddModal() {
    setEditId(null)
    setTitle("")
    setDescription("")
    setLink("")
    setImage("")
    setIsModalOpen(true)
  }

  function openEditModal(item: Project) {
    setEditId(item.id)
    setTitle(item.title)
    setDescription(item.description)
    setLink(item.link || "")
    setImage(item.image)
    setIsModalOpen(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("link", link)
    formData.append("image", image)

    const res = editId
      ? await updateProject(editId, formData)
      : await addProject(formData)
      
    setIsLoading(false)

    if (res.success) {
      toast.success(editId ? "Project berhasil diperbarui!" : "Project berhasil ditambahkan!")
      setIsModalOpen(false)
      router.refresh()
    } else {
      toast.error(res.message || "Terjadi kesalahan")
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus project ini?")) return
    
    const res = await deleteProject(id)
    if (res.success) {
      toast.success("Project berhasil dihapus!")
      setProjects(projects.filter(p => p.id !== id))
    } else {
      toast.error("Gagal menghapus project.")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Portofolio & Project</h2>
          <p className="text-foreground/70">Kelola portofolio project Anda.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <HiPlus /> Tambah Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="glass rounded-3xl overflow-hidden group relative flex flex-col border border-white/5 hover:border-white/20 transition-colors">
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button 
                onClick={() => openEditModal(project)}
                className="text-blue-400 p-2 bg-blue-500/90 hover:bg-blue-600 text-white rounded-lg shadow-lg"
                title="Edit"
              >
                <HiPencil />
              </button>
              <button 
                onClick={() => handleDelete(project.id)}
                className="text-red-400 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg shadow-lg"
                title="Hapus"
              >
                <HiTrash />
              </button>
            </div>
            
            <div className="h-48 relative overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h4 className="font-bold text-xl mb-2">{project.title}</h4>
              <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{project.description}</p>
              {project.link && (
                <div className="mt-auto">
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm font-medium">Link Live Demo</a>
                </div>
              )}
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full text-center py-12 text-foreground/50 glass rounded-3xl">
            Belum ada project yang ditambahkan.
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
            <h2 className="text-2xl font-bold mb-6">{editId ? 'Edit Project' : 'Tambah Project Baru'}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Judul Project</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Deskripsi Lengkap</label>
                <textarea 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white h-24"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Link Project / Demo (Opsional)</label>
                <input 
                  type="url" 
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Screenshot / Gambar</label>
                {image ? (
                  <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/10">
                    <img src={image} alt="Preview" className="w-20 h-12 object-cover rounded" />
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
                {isLoading ? 'Menyimpan...' : 'Simpan Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
