"use client"

import { useState } from "react"
import { toast } from "sonner"
import { UploadButton } from "@/utils/uploadthing"
import { updateProfile } from "@/app/actions/profile"
import { Profile } from "@prisma/client"

export default function ProfileClient({ initialProfile }: { initialProfile: Profile | null }) {
  const [aboutText, setAboutText] = useState(initialProfile?.aboutText || "")
  const [homeImage, setHomeImage] = useState(initialProfile?.homeImage || "")
  const [cvUrl, setCvUrl] = useState(initialProfile?.cvUrl || "")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append("aboutText", aboutText)
    formData.append("cvUrl", cvUrl)
    if (homeImage) {
      formData.append("homeImage", homeImage)
    }

    const res = await updateProfile(formData)
    setIsLoading(false)

    if (res.success) {
      toast.success("Profil berhasil diperbarui!")
    } else {
      toast.error(res.message || "Gagal memperbarui profil.")
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Pengaturan Teks & Foto</h2>
      <p className="text-foreground/70 mb-6">Ubah foto dan teks deskripsi 'About Me' yang muncul di halaman depan.</p>
      
      <div className="glass p-8 rounded-3xl max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Foto Profil / Home</label>
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              {homeImage && homeImage !== 'default.jpg' ? (
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-white/10">
                  <img src={homeImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-black/20 border border-white/10 flex items-center justify-center">
                  <span className="text-foreground/50 text-sm">No Image</span>
                </div>
              )}
              
              <div className="flex-1 bg-black/20 p-6 rounded-2xl border border-white/5 border-dashed flex flex-col items-center justify-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setHomeImage(res[0].url)
                      toast.success("Gambar berhasil diupload!")
                    }
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`)
                  }}
                  appearance={{
                    button: "bg-primary hover:bg-blue-600 text-white rounded-full px-6 py-2 transition-all",
                    allowedContent: "text-foreground/50 text-sm mt-2"
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Teks About Me</label>
            <textarea 
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              required
              rows={5}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">Link CV (Google Drive URL)</label>
            <input 
              type="url"
              value={cvUrl}
              onChange={(e) => setCvUrl(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white"
            />
            <p className="text-xs text-foreground/50">Masukkan link tautan Google Drive untuk CV Anda. Kosongkan jika ingin menyembunyikan tombol CV.</p>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-blue-500/25"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Profil'}
          </button>
        </form>
      </div>
    </div>
  )
}
