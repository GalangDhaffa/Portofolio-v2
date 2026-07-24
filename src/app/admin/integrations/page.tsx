import prisma from "@/lib/prisma"
import IntegrationClient from "./IntegrationClient"

export const dynamic = 'force-dynamic'

export default async function IntegrationsPage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } })
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">API Integrations (Sync)</h1>
      <IntegrationClient initialProfile={profile} />
    </div>
  )
}
