import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.serviceCard.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 })
  }
}
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json()
    const { title, description, iconName, link, order } = body
    const service = await prisma.serviceCard.update({
      where: { id },
      data: { title, description, iconName, link, order }
    })
    return NextResponse.json(service)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service card" }, { status: 500 })
  }
}
