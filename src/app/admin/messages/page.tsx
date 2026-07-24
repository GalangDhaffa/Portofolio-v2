import prisma from "@/lib/prisma"
import MessagesClient from "./MessagesClient"

export default async function AdminMessages() {
  const messages = await prisma.message.findMany({ orderBy: { createdAt: 'desc' } })
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gradient">Kotak Masuk</h1>
      <MessagesClient initialMessages={messages} />
    </div>
  )
}
