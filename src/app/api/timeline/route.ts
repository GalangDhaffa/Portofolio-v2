import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const timelines = await prisma.timeline.findMany({
      orderBy: { order: 'desc' }
    })
    return NextResponse.json(timelines)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch timeline" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const timeline = await prisma.timeline.create({
      data: {
        year: data.year,
        title: data.title,
        description: data.description,
        order: data.order ? parseInt(data.order) : 0
      }
    })
    return NextResponse.json(timeline)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create timeline" }, { status: 500 })
  }
}
