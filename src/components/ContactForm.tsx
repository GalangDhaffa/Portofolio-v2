"use client"
import { useState } from "react"
import { toast } from "sonner"
import { submitContactForm } from "@/app/actions/contact"

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await submitContactForm(formData)
    
    setIsLoading(false)
    
    if (result.success) {
      toast.success("Pesan berhasil dikirim!")
      ;(e.target as HTMLFormElement).reset()
    } else {
      toast.error("Gagal mengirim pesan, silakan coba lagi.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white placeholder-white/30"
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white placeholder-white/30"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80">Message</label>
        <textarea 
          id="message" 
          name="message" 
          required 
          rows={5}
          className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white placeholder-white/30 resize-none"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-blue-500/25 mt-4 self-center md:self-start w-full md:w-auto"
      >
        {isLoading ? 'Mengirim...' : 'Send Message'}
      </button>
    </form>
  )
}
