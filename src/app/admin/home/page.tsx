import prisma from "@/lib/prisma"
import ProfileClient from "./ProfileClient"
import ServiceClient from "./ServiceClient"

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } })
  const services = await prisma.serviceCard.findMany({ orderBy: { order: 'desc' } })
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gradient">Kelola Home Page</h1>
      <ProfileClient initialProfile={profile} />
      
      <hr className="border-white/10 my-12" />
      
      <ServiceClient initialData={services} />
    </div>
  )
}
