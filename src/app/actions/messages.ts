"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteMessage(id: string) {
  try {
    await prisma.message.delete({ where: { id } })
    revalidatePath("/admin/messages")
    return { success: true }
  } catch (error) {
    console.error("Error deleting message:", error)
    return { success: false, message: "Gagal menghapus pesan." }
  }
}
