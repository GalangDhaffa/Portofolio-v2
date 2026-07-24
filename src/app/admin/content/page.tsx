import prisma from "@/lib/prisma"
import ContentClient from "./ContentClient"
import WidgetContentClient from "./WidgetContentClient"

export const dynamic = 'force-dynamic'

export default async function AdminContent() {
  const contents = await prisma.socialContent.findMany({ orderBy: { order: 'desc' } })
  const profile = await prisma.profile.findUnique({ where: { id: 1 } })
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Kelola Konten Terbaru</h1>
      
      <WidgetContentClient initialProfile={profile} />

      <h2 className="text-2xl font-bold mb-4">Daftar Konten Manual</h2>
      <ContentClient initialData={contents} />
    </div>
  )
}
