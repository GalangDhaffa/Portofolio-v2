"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addSkill(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as string

    if (!name || !image) {
      return { success: false, message: "Nama dan Gambar wajib diisi." }
    }

    await prisma.skill.create({
      data: {
        name,
        description,
        image,
      }
    })

    revalidatePath("/admin/skills")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error adding skill:", error)
    return { success: false, message: "Gagal menambahkan skill." }
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({ where: { id } })
    revalidatePath("/admin/skills")
    revalidatePath("/admin/works")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting skill:", error)
    return { success: false, message: "Gagal menghapus skill." }
  }
}

export async function updateSkill(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const image = formData.get("image") as string

    if (!name || !image) {
      return { success: false, message: "Nama dan Gambar wajib diisi." }
    }

    await prisma.skill.update({
      where: { id },
      data: { name, description, image }
    })

    revalidatePath("/admin/skills")
    revalidatePath("/admin/works")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating skill:", error)
    return { success: false, message: "Gagal mengupdate skill." }
  }
}

