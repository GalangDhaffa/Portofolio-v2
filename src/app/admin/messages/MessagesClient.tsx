"use client"

import { useState } from "react"
import { toast } from "sonner"
import { deleteMessage } from "@/app/actions/messages"
import { HiTrash } from "react-icons/hi"
import { Message } from "@prisma/client"

export default function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages)

  async function handleDelete(id: string) {
    if (!confirm("Yakin ingin menghapus pesan ini?")) return
    
    const res = await deleteMessage(id)
    if (res.success) {
      toast.success("Pesan berhasil dihapus!")
      setMessages(messages.filter(m => m.id !== id))
    } else {
      toast.error("Gagal menghapus pesan.")
    }
  }

  return (
    <div>
      <p className="text-foreground/70 mb-6">Pesan dari pengunjung website (Formulir Kontak).</p>

      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="glass p-6 rounded-3xl relative group">
            <button 
              onClick={() => handleDelete(message.id)}
              className="absolute top-6 right-6 text-red-400 p-2 bg-red-500/10 rounded-lg hover:bg-red-500/20 transition-colors"
              title="Hapus"
            >
              <HiTrash />
            </button>
            <div className="mb-4 pr-12">
              <h4 className="font-bold text-lg">{message.name}</h4>
              <a href={`mailto:${message.email}`} className="text-primary hover:underline text-sm">{message.email}</a>
              <p className="text-xs text-foreground/40 mt-1">{new Date(message.createdAt).toLocaleString('id-ID')}</p>
            </div>
            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
              <p className="whitespace-pre-wrap text-foreground/80">{message.message}</p>
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center py-12 text-foreground/50 glass rounded-3xl">
            Belum ada pesan masuk.
          </div>
        )}
      </div>
    </div>
  )
}
