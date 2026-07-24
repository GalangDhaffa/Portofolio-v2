import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.timeline.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete timeline" }, { status: 500 })
  }
}
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json()
    const { year, title, description, order } = body
    const timeline = await prisma.timeline.update({
      where: { id },
      data: { year, title, description, order }
    })
    return NextResponse.json(timeline)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update timeline" }, { status: 500 })
  }
}
