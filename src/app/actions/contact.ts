"use server"

import prisma from "@/lib/prisma"

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string

    if (!name || !email || !message) {
      return { success: false, message: "Semua kolom harus diisi." }
    }

    await prisma.message.create({
      data: {
        name,
        email,
        message,
      }
    })

    return { success: true }
  } catch (error) {
    console.error("Error submit contact form:", error)
    return { success: false, message: "Terjadi kesalahan server." }
  }
}
