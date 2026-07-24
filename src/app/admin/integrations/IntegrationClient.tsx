"use client"

import { useState } from "react"
import { toast } from "sonner"
import { updateProfile } from "@/app/actions/profile"
import { syncYouTube, syncTikTok, syncInstagram } from "@/app/actions/sync"
import { Profile } from "@prisma/client"
import { HiOutlineRefresh } from "react-icons/hi"

export default function IntegrationClient({ initialProfile }: { initialProfile: Profile | null }) {
  const [youtubeApiKey, setYoutubeApiKey] = useState(initialProfile?.youtubeApiKey || "")
  const [youtubeChannelId, setYoutubeChannelId] = useState(initialProfile?.youtubeChannelId || "")
  const [rapidApiKey, setRapidApiKey] = useState(initialProfile?.rapidApiKey || "")
  const [instagramUsername, setInstagramUsername] = useState(initialProfile?.instagramUsername || "")
  const [tiktokUsername, setTiktokUsername] = useState(initialProfile?.tiktokUsername || "")
  
  const [isSaving, setIsSaving] = useState(false)
  const [isSyncingYoutube, setIsSyncingYoutube] = useState(false)
  const [isSyncingTikTok, setIsSyncingTikTok] = useState(false)
  const [isSyncingInstagram, setIsSyncingInstagram] = useState(false)

  async function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSaving(true)

    const formData = new FormData()
    formData.append("youtubeApiKey", youtubeApiKey)
    formData.append("youtubeChannelId", youtubeChannelId)
    formData.append("rapidApiKey", rapidApiKey)
    formData.append("instagramUsername", instagramUsername)
    formData.append("tiktokUsername", tiktokUsername)

    const res = await updateProfile(formData)
    setIsSaving(false)

    if (res.success) {
      toast.success("Pengaturan API berhasil disimpan!")
    } else {
      toast.error(res.message || "Gagal menyimpan API.")
    }
  }

  async function handleSyncYouTube() {
    setIsSyncingYoutube(true)
    toast.info("Menarik data YouTube...")
    const res = await syncYouTube()
    setIsSyncingYoutube(false)
    if (res.success) toast.success("YouTube berhasil di-sync!")
    else toast.error(res.message)
  }

  async function handleSyncTikTok() {
    setIsSyncingTikTok(true)
    toast.info("Menarik data TikTok via RapidAPI...")
    const res = await syncTikTok()
    setIsSyncingTikTok(false)
    if (res.success) toast.success("TikTok berhasil di-sync!")
    else toast.error(res.message)
  }

  async function handleSyncInstagram() {
    setIsSyncingInstagram(true)
    toast.info("Menarik data Instagram via RapidAPI...")
    const res = await syncInstagram()
    setIsSyncingInstagram(false)
    if (res.success) toast.success("Instagram berhasil di-sync!")
    else toast.error(res.message)
  }

  return (
    <div className="space-y-12 max-w-4xl">
      
      {/* Pengaturan API */}
      <div className="glass p-8 rounded-3xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Konfigurasi API Keys</h2>
          <p className="text-foreground/70 text-sm">
            Masukkan kunci API Anda untuk mengaktifkan fitur penarikan data (Sync).
          </p>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-white/10 pb-2">YouTube API v3</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-foreground/80">API Key</label>
                <input type="text" value={youtubeApiKey} onChange={(e) => setYoutubeApiKey(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-foreground/80">Channel ID</label>
                <input type="text" value={youtubeChannelId} onChange={(e) => setYoutubeChannelId(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-semibold text-cyan-400 border-b border-white/10 pb-2">RapidAPI (TikTok & Instagram)</h3>
            <div className="space-y-2">
              <label className="text-sm text-foreground/80">RapidAPI Key</label>
              <input type="text" value={rapidApiKey} onChange={(e) => setRapidApiKey(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-foreground/80">Instagram Username</label>
                <input type="text" value={instagramUsername} onChange={(e) => setInstagramUsername(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-foreground/80">TikTok Username</label>
                <input type="text" value={tiktokUsername} onChange={(e) => setTiktokUsername(e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 text-white" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={isSaving} className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium transition-colors w-full mt-4">
            {isSaving ? 'Menyimpan...' : 'Simpan Konfigurasi'}
          </button>
        </form>
      </div>

      {/* Sync Actions */}
      <div className="glass p-8 rounded-3xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Tarik Data Sekarang (Sync)</h2>
          <p className="text-foreground/70 text-sm">
            Klik tombol di bawah ini untuk menarik 5 konten terbaru dari masing-masing platform dan menyimpannya ke halaman Latest Content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={handleSyncYouTube}
            disabled={isSyncingYoutube || !youtubeApiKey || !youtubeChannelId}
            className="flex flex-col items-center justify-center p-6 bg-black/20 border border-white/10 rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <HiOutlineRefresh className={`w-8 h-8 text-red-500 mb-2 ${isSyncingYoutube ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            <span className="font-semibold">Sync YouTube</span>
          </button>

          <button 
            onClick={handleSyncInstagram}
            disabled={isSyncingInstagram || !rapidApiKey || !instagramUsername}
            className="flex flex-col items-center justify-center p-6 bg-black/20 border border-white/10 rounded-2xl hover:bg-purple-500/10 hover:border-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <HiOutlineRefresh className={`w-8 h-8 text-purple-500 mb-2 ${isSyncingInstagram ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            <span className="font-semibold">Sync Instagram</span>
          </button>

          <button 
            onClick={handleSyncTikTok}
            disabled={isSyncingTikTok || !rapidApiKey || !tiktokUsername}
            className="flex flex-col items-center justify-center p-6 bg-black/20 border border-white/10 rounded-2xl hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <HiOutlineRefresh className={`w-8 h-8 text-cyan-400 mb-2 ${isSyncingTikTok ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            <span className="font-semibold">Sync TikTok</span>
          </button>
        </div>
      </div>

    </div>
  )
}
