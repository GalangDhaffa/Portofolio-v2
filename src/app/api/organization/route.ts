import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({
      orderBy: { order: 'desc' }
    })
    return NextResponse.json(orgs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch organization" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const org = await prisma.organization.create({
      data: {
        period: data.period,
        title: data.title,
        description: data.description,
        order: data.order ? parseInt(data.order) : 0
      }
    })
    return NextResponse.json(org)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create organization" }, { status: 500 })
  }
}
