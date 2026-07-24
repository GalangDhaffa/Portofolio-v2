"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function addProject(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const link = formData.get("link") as string
    const image = formData.get("image") as string

    if (!title || !description || !image) {
      return { success: false, message: "Judul, Deskripsi, dan Gambar wajib diisi." }
    }

    await prisma.project.create({
      data: {
        title,
        description,
        link: link || null,
        image,
      }
    })

    revalidatePath("/admin/projects")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error adding project:", error)
    return { success: false, message: "Gagal menambahkan project." }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } })
    revalidatePath("/admin/projects")
    revalidatePath("/admin/works")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting project:", error)
    return { success: false, message: "Gagal menghapus project." }
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const link = formData.get("link") as string
    const image = formData.get("image") as string

    if (!title || !description || !image) {
      return { success: false, message: "Judul, Deskripsi, dan Gambar wajib diisi." }
    }

    await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        link: link || null,
        image,
      }
    })

    revalidatePath("/admin/projects")
    revalidatePath("/admin/works")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating project:", error)
    return { success: false, message: "Gagal mengupdate project." }
  }
}

