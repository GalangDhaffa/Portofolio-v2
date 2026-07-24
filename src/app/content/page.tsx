import Reveal from "@/components/Reveal"
import TiltCard from "@/components/TiltCard"
import ParallaxElement from "@/components/ParallaxElement"
import WidgetRenderer from "@/components/WidgetRenderer"

import prisma from "@/lib/prisma"

export const metadata = {
  title: "Latest Content | Dhaffa Galang Fahriza",
  description: "Konten terbaru dari YouTube, TikTok, dan Instagram.",
}

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const contents = await prisma.socialContent.findMany({ orderBy: { order: 'desc' } })
  const profile = await prisma.profile.findUnique({ where: { id: 1 } })

  // Group by platform
  const groupedContents = contents.reduce((acc, content) => {
    if (!acc[content.platform]) acc[content.platform] = []
    acc[content.platform].push(content)
    return acc
  }, {} as Record<string, typeof contents>)

  const platforms = [
    { name: "YouTube", color: "from-red-500/20 to-red-600/10", border: "hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]" },
    { name: "TikTok", color: "from-cyan-500/20 to-pink-500/10", border: "hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]" },
    { name: "Instagram", color: "from-purple-500/20 to-pink-600/10", border: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]" }
  ]
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <ParallaxElement offset={30}>
        <Reveal>
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Content</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Karya visual dan video terbaru yang saya bagikan di berbagai platform sosial media.
            </p>
          </div>
        </Reveal>
      </ParallaxElement>

      {/* Widget Section */}
      {profile?.contentWidgetCode && (
        <Reveal delay={0.2}>
          <WidgetRenderer htmlString={profile.contentWidgetCode} />
        </Reveal>
      )}

      {/* Content Grids */}
      <div className="space-y-24">
        {platforms.map((category, index) => {
          const items = groupedContents[category.name] || []
          if (items.length === 0) return null

          return (
            <div key={category.name}>
              <Reveal delay={0.1}>
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                  <span className="w-8 h-1 bg-gradient-to-r from-primary to-cyan-400 rounded-full"></span>
                  {category.name}
                </h2>
              </Reveal>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.map((item, i) => (
                  <Reveal key={item.id} delay={0.1 * (i + 1)}>
                    <TiltCard className="h-full">
                      <a href={item.link || '#'} target={item.link ? "_blank" : "_self"} rel="noreferrer" className="block h-full">
                        <div className={`glass rounded-3xl overflow-hidden h-64 relative group transition-all duration-500 ${category.border} cursor-pointer`}>
                          <div className={`absolute inset-0 bg-gradient-to-tr ${category.color} opacity-50 mix-blend-overlay z-10`}></div>
                          
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-40 blur-[2px] group-hover:blur-none group-hover:opacity-100" 
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-20"></div>
                          
                          <div className="absolute inset-x-0 bottom-0 p-8 z-30 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h4 className="font-bold text-2xl text-white">{item.title}</h4>
                            <div className="mt-4 flex items-center gap-2 text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                              <span>Tonton Sekarang</span>
                              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
