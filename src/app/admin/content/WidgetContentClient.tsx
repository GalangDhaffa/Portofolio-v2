"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { updateProfile } from "@/app/actions/profile"
import { Profile } from "@prisma/client"

export default function WidgetContentClient({ initialProfile }: { initialProfile: Profile | null }) {
  const [contentWidgetCode, setContentWidgetCode] = useState(initialProfile?.contentWidgetCode || "")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (initialProfile) {
      setContentWidgetCode(initialProfile.contentWidgetCode || "")
    }
  }, [initialProfile])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append("contentWidgetCode", contentWidgetCode)

    const res = await updateProfile(formData)
    setIsLoading(false)

    if (res.success) {
      toast.success("Widget berhasil disimpan!")
      router.refresh()
    } else {
      toast.error(res.message || "Gagal menyimpan widget.")
    }
  }

  return (
    <div className="mb-16 glass p-8 rounded-3xl max-w-4xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Automasi Konten (Widget Pihak Ketiga)</h2>
        <p className="text-foreground/70 text-sm">
          Gunakan layanan pihak ketiga seperti <strong>Elfsight</strong>, <strong>Curator.io</strong>, atau <strong>Tagembed</strong> untuk menarik feed dari YouTube, TikTok, atau Instagram secara otomatis.
          Paste kode <code>&lt;script&gt;</code> atau <code>&lt;iframe&gt;</code> yang diberikan ke dalam kotak di bawah ini.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Kode Widget (Embed Code)</label>
          <textarea 
            value={contentWidgetCode}
            onChange={(e) => setContentWidgetCode(e.target.value)}
            placeholder="<!-- Paste kode script/iframe di sini -->"
            rows={5}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white font-mono text-sm"
          ></textarea>
          <p className="text-xs text-foreground/50">Kosongkan jika Anda ingin menggunakan sistem manual di bawah ini saja.</p>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg hover:shadow-blue-500/25"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan Widget'}
        </button>
      </form>
    </div>
  )
}
