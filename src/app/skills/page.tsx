import prisma from "@/lib/prisma"
import Reveal from "@/components/Reveal"
import TiltCard from "@/components/TiltCard"
import ParallaxElement from "@/components/ParallaxElement"

export const metadata = {
  title: "Skills | Dhaffa Galang Fahriza",
  description: "Daftar keahlian dan teknologi yang saya kuasai.",
}

export const dynamic = 'force-dynamic'

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <ParallaxElement offset={30}>
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Skills</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Teknologi, bahasa pemrograman, dan perangkat lunak yang saya gunakan sehari-hari.
            </p>
          </div>
        </Reveal>
      </ParallaxElement>

      {skills.length === 0 ? (
        <p className="text-center text-foreground/60">Belum ada skill yang ditambahkan.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <Reveal key={skill.id} delay={0.05 * (i % 8)}>
              <TiltCard className="h-full">
                <div className="glass p-6 rounded-3xl text-center h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-primary/50">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-2xl flex items-center justify-center p-4">
                    <img src={skill.image} alt={skill.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{skill.name}</h4>
                  {skill.description && (
                    <p className="text-sm text-foreground/70">{skill.description}</p>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
