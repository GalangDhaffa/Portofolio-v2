"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: FormData) {
  try {
    const aboutText = formData.get("aboutText") as string
    const homeImage = formData.get("homeImage") as string
    const aboutImage = formData.get("aboutImage") as string
    const aboutDetail = formData.get("aboutDetail") as string
    const cvUrl = formData.get("cvUrl") as string
    const contentWidgetCode = formData.get("contentWidgetCode") as string
    const youtubeApiKey = formData.get("youtubeApiKey") as string
    const youtubeChannelId = formData.get("youtubeChannelId") as string
    const rapidApiKey = formData.get("rapidApiKey") as string
    const instagramUsername = formData.get("instagramUsername") as string
    const tiktokUsername = formData.get("tiktokUsername") as string

    const data: any = {}
    if (aboutText !== null) data.aboutText = aboutText
    if (homeImage !== null) data.homeImage = homeImage
    if (aboutImage !== null) data.aboutImage = aboutImage
    if (aboutDetail !== null) data.aboutDetail = aboutDetail
    if (cvUrl !== null) data.cvUrl = cvUrl
    if (contentWidgetCode !== null) data.contentWidgetCode = contentWidgetCode
    if (youtubeApiKey !== null) data.youtubeApiKey = youtubeApiKey
    if (youtubeChannelId !== null) data.youtubeChannelId = youtubeChannelId
    if (rapidApiKey !== null) data.rapidApiKey = rapidApiKey
    if (instagramUsername !== null) data.instagramUsername = instagramUsername
    if (tiktokUsername !== null) data.tiktokUsername = tiktokUsername

    await prisma.profile.upsert({
      where: { id: 1 },
      update: data,
      create: {
        id: 1,
        homeImage: homeImage || 'default.jpg',
        aboutText: aboutText || '',
        aboutImage: aboutImage || null,
        aboutDetail: aboutDetail || null,
        cvUrl: cvUrl || null,
        contentWidgetCode: contentWidgetCode || null,
        youtubeApiKey: youtubeApiKey || null,
        youtubeChannelId: youtubeChannelId || null,
        rapidApiKey: rapidApiKey || null,
        instagramUsername: instagramUsername || null,
        tiktokUsername: tiktokUsername || null
      }
    })

    revalidatePath("/")
    revalidatePath("/admin/home")
    revalidatePath("/admin/about")
    revalidatePath("/about")

    return { success: true }
  } catch (error) {
    console.error("Error updating profile:", error)
    return { success: false, message: "Gagal mengupdate profil." }
  }
}
