import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const services = await prisma.serviceCard.findMany({
      orderBy: { order: 'desc' }
    })
    return NextResponse.json(services)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const service = await prisma.serviceCard.create({
      data: {
        title: data.title,
        description: data.description,
        iconName: data.iconName,
        link: data.link,
        order: data.order ? parseInt(data.order) : 0
      }
    })
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 })
  }
}
