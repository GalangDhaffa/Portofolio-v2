import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.organization.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete organization" }, { status: 500 })
  }
}
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json()
    const { period, title, description, order } = body
    const organization = await prisma.organization.update({
      where: { id },
      data: { period, title, description, order }
    })
    return NextResponse.json(organization)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update organization" }, { status: 500 })
  }
}
