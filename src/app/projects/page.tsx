import prisma from "@/lib/prisma"
import Reveal from "@/components/Reveal"
import TiltCard from "@/components/TiltCard"
import ParallaxElement from "@/components/ParallaxElement"

export const metadata = {
  title: "Projects | Dhaffa Galang Fahriza",
  description: "Portofolio karya dan proyek yang pernah saya buat.",
}

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <ParallaxElement offset={30}>
        <Reveal>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Projects</span>
            </h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Berbagai karya, website, dan aplikasi yang telah saya kembangkan.
            </p>
          </div>
        </Reveal>
      </ParallaxElement>

      {projects.length === 0 ? (
        <p className="text-center text-foreground/60">Belum ada project yang ditambahkan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.1 * (i % 3)}>
              <div className="h-full">
                <div className="glass rounded-3xl flex flex-col group transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-primary/50 h-full relative">
                  <div className="h-48 overflow-hidden relative rounded-t-3xl">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
                    
                    <div className="relative group/desc flex-1 mb-6 cursor-help">
                      <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                      
                      {/* Premium Tooltip */}
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-[115%] bg-[#0a0f1c] border border-white/10 p-4 rounded-xl text-sm text-foreground/90 opacity-0 invisible group-hover/desc:opacity-100 group-hover/desc:visible transition-all duration-300 z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-none text-left backdrop-blur-xl">
                        {project.description}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white/10"></div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#0a0f1c] -mt-[1px]"></div>
                      </div>
                    </div>

                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="w-full block text-center py-3 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-medium">
                        Lihat Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
