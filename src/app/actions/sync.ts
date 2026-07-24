"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function syncYouTube() {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 1 } })
    if (!profile?.youtubeApiKey || !profile?.youtubeChannelId) {
      return { success: false, message: "YouTube API Key & Channel ID belum diatur." }
    }

    const url = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${profile.youtubeChannelId}&maxResults=5&key=${profile.youtubeApiKey}&type=video`
    const res = await fetch(url)
    const data = await res.json()

    if (data.error) {
      return { success: false, message: `YouTube Error: ${data.error.message}` }
    }

    // Delete old synced items for YouTube
    await prisma.socialContent.deleteMany({
      where: { platform: "YouTube", isAutoSynced: true }
    })

    // Insert new ones
    for (const item of data.items) {
      await prisma.socialContent.create({
        data: {
          platform: "YouTube",
          title: item.snippet.title,
          image: item.snippet.thumbnails.high.url,
          link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          isAutoSynced: true,
          order: 0
        }
      })
    }

    revalidatePath("/content")
    revalidatePath("/admin/integrations")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}

export async function syncTikTok() {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 1 } })
    if (!profile?.rapidApiKey || !profile?.tiktokUsername) {
      return { success: false, message: "RapidAPI Key & TikTok Username belum diatur." }
    }

    // We use a common RapidAPI for TikTok (e.g., 'tiktok-api23' or 'tokapi'). 
    // This is an example endpoint. The user might need to adjust this depending on the exact RapidAPI service they subscribe to.
    const url = `https://tiktok-scraper7.p.rapidapi.com/user/posts?unique_id=${profile.tiktokUsername}`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': profile.rapidApiKey,
        'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
      }
    };

    const res = await fetch(url, options)
    const data = await res.json()

    if (!data.data || !data.data.videos) {
      console.log("TikTok API Error:", JSON.stringify(data, null, 2))
      return { 
        success: false, 
        message: `API Error: ${data.message || data.error || "Format tidak sesuai"}` 
      }
    }

    await prisma.socialContent.deleteMany({
      where: { platform: "TikTok", isAutoSynced: true }
    })

    const videos = data.data.videos.slice(0, 5)
    for (const item of videos) {
      await prisma.socialContent.create({
        data: {
          platform: "TikTok",
          title: item.title || "TikTok Video",
          image: item.cover || "/images/placeholder.jpg",
          link: item.play || `https://www.tiktok.com/@${profile.tiktokUsername}/video/${item.video_id}`,
          isAutoSynced: true,
          order: 0
        }
      })
    }

    revalidatePath("/content")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}

export async function syncInstagram() {
  try {
    const profile = await prisma.profile.findUnique({ where: { id: 1 } })
    if (!profile?.rapidApiKey || !profile?.instagramUsername) {
      return { success: false, message: "RapidAPI Key & Instagram Username belum diatur." }
    }

    const url = `https://instagram-scraper-stable-api.p.rapidapi.com/get_ig_user_posts.php`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': profile.rapidApiKey,
        'X-RapidAPI-Host': 'instagram-scraper-stable-api.p.rapidapi.com'
      },
      body: `username_or_url=https://www.instagram.com/${profile.instagramUsername}/`
    };

    const res = await fetch(url, options)
    const data = await res.json()

    if (!data.posts || !Array.isArray(data.posts)) {
      console.log("Instagram API Error:", JSON.stringify(data, null, 2))
      return { 
        success: false, 
        message: `API Error: ${data.message || data.error || "Format tidak sesuai"}` 
      }
    }

    await prisma.socialContent.deleteMany({
      where: { platform: "Instagram", isAutoSynced: true }
    })

    const posts = data.posts.slice(0, 5)
    for (const post of posts) {
      const item = post.node || post;
      const image = item.image_versions2?.candidates?.[0]?.url || item.thumbnail_url || item.display_url || "/images/placeholder.jpg"
      const title = item.caption?.text ? item.caption.text.slice(0, 50) + "..." : (item.accessibility_caption ? item.accessibility_caption.slice(0, 50) : "Instagram Post")
      const link = `https://www.instagram.com/p/${item.code}/`
      
      await prisma.socialContent.create({
        data: {
          platform: "Instagram",
          title: title,
          image: image,
          link: link,
          isAutoSynced: true,
          order: 0
        }
      })
    }

    revalidatePath("/content")
    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
