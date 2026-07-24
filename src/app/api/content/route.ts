import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const contents = await prisma.socialContent.findMany({
      orderBy: { order: 'desc' }
    })
    return NextResponse.json(contents)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const content = await prisma.socialContent.create({
      data: {
        platform: data.platform,
        title: data.title,
        image: data.image,
        link: data.link,
        order: data.order ? parseInt(data.order) : 0
      }
    })
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}
