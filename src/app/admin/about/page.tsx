import prisma from "@/lib/prisma"
import TimelineClient from "./TimelineClient"
import OrganizationClient from "./OrganizationClient"
import AboutBioClient from "./AboutBioClient"

export const dynamic = 'force-dynamic'

export default async function AdminAbout() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } })
  const timelines = await prisma.timeline.findMany({ orderBy: { order: 'desc' } })
  const organizations = await prisma.organization.findMany({ orderBy: { order: 'desc' } })
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gradient">Kelola About Page</h1>
      
      <AboutBioClient initialProfile={profile} />

      <hr className="border-white/10 my-12" />

      <TimelineClient initialData={timelines} />
      
      <hr className="border-white/10 my-12" />
      
      <OrganizationClient initialData={organizations} />
    </div>
  )
}
