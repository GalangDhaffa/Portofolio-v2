import Image from "next/image"
import Reveal from "@/components/Reveal"
import { TimelineItem } from "@/components/Timeline"
import ParallaxElement from "@/components/ParallaxElement"

import prisma from "@/lib/prisma"

export const metadata = {
  title: "About | Dhaffa Galang Fahriza",
  description: "Lebih dekat dengan Dhaffa Galang Fahriza, seorang Web Developer & Content Creator.",
}

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } })
  const timelines = await prisma.timeline.findMany({ orderBy: { order: 'desc' } })
  const organizations = await prisma.organization.findMany({ orderBy: { order: 'desc' } })

  const aboutImage = profile?.aboutImage || "/images/profil.png"
  const defaultDetail = `<p>Halo! Saya Dhaffa Galang Fahriza. Saya adalah seorang pembuat konten yang berfokus pada dunia <span class="text-primary font-medium">Gaming, Teknologi, dan Hiburan Digital</span>. Sejak awal menyentuh dunia internet, saya selalu memiliki ketertarikan besar pada bagaimana komunitas terbentuk dan berkembang secara online.</p><br/><p>Selain membuat konten <em>streaming</em>, saya juga mempelajari pengembangan web (<em>Web Development</em>) untuk membangun platform dan pengalaman interaktif seperti website yang sedang Anda kunjungi saat ini.</p><br/><p>Bagi saya, setiap baris kode dan setiap video yang saya buat adalah sebuah medium untuk bercerita dan memberikan dampak positif bagi orang yang melihatnya.</p>`
  const aboutDetail = profile?.aboutDetail || defaultDetail

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <ParallaxElement offset={30}>
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Me</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Perjalanan karir, pendidikan, dan pengalaman saya dalam dunia digital, kreatif, dan teknologi.
            </p>
          </div>
        </Reveal>
      </ParallaxElement>

      {/* Detailed Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
        <Reveal>
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="glass rounded-[3rem] p-4 relative h-full w-full overflow-hidden">
              <Image 
                src={aboutImage}
                alt="About Bio" 
                fill 
                className="object-cover rounded-[2.5rem]"
              />
            </div>
          </div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
            <h2 className="text-3xl font-bold text-foreground mb-4">Mengenal Lebih Dekat</h2>
            <div dangerouslySetInnerHTML={{ __html: aboutDetail }} />
          </div>
        </Reveal>
      </div>

      {/* Timeline Perjalanan Karir & Pendidikan */}
      <Reveal>
        <h2 className="text-4xl font-bold text-center mb-16">Perjalanan & Karir</h2>
      </Reveal>
      <div className="max-w-5xl mx-auto mb-32">
        {timelines.length === 0 ? (
          <p className="text-center text-foreground/50">Data timeline belum ditambahkan.</p>
        ) : (
          timelines.map((item, index) => (
            <TimelineItem 
              key={item.id}
              year={item.year}
              title={item.title}
              description={item.description}
              isLast={index === timelines.length - 1}
            />
          ))
        )}
      </div>

      {/* Pengalaman Organisasi */}
      <Reveal>
        <h2 className="text-4xl font-bold text-center mb-16">Pengalaman Organisasi</h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {organizations.length === 0 ? (
          <div className="col-span-full text-center text-foreground/50">Data organisasi belum ditambahkan.</div>
        ) : (
          organizations.map((org, index) => (
            <Reveal key={org.id} delay={0.1 * (index % 4)}>
              <div className="glass p-8 rounded-3xl h-full border-l-4 border-l-primary hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all">
                <div className="text-sm text-cyan-400 font-medium mb-2">{org.period}</div>
                <h3 className="text-2xl font-bold mb-3">{org.title}</h3>
                <p className="text-foreground/70">{org.description}</p>
              </div>
            </Reveal>
          ))
        )}
      </div>
    </div>
  )
}
