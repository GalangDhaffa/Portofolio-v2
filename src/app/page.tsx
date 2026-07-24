import prisma from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"
import { HiArrowDown } from "react-icons/hi"
import * as HiIcons from "react-icons/hi"
import ContactForm from "@/components/ContactForm"
import Reveal from "@/components/Reveal"
import NextButton from "@/components/NextButton"
import TiltCard from "@/components/TiltCard"
import InfiniteMarquee from "@/components/InfiniteMarquee"
import ParallaxElement from "@/components/ParallaxElement"

import BlackHoleBackground from "@/components/BlackHoleBackground"

export default async function Home() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } })
  const skills = await prisma.skill.findMany({ orderBy: { createdAt: 'desc' } })
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  const services = await prisma.serviceCard.findMany({ orderBy: { order: 'desc' } })

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section id="home" className="min-h-screen w-full flex items-center justify-center pt-20 relative overflow-hidden bg-background transition-colors duration-1000">
        {/* Dynamic Black Hole Background with Slide Animation */}
        <BlackHoleBackground />

        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-background/40 transition-colors duration-1000"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left: Heading, Subheading, CTAs */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <Reveal>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight drop-shadow-sm">
                  Halo, Saya <br className="hidden lg:block" />
                  <span className="text-theme-shine pr-1 inline-block">
                    Dhaffa Galang <br />
                    Fahriza
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="text-xl md:text-2xl text-foreground/80 mb-10 font-light max-w-xl">
                  Selamat datang di portofolio saya
                </h2>
              </Reveal>
              <Reveal delay={0.4}>
                <NextButton cvUrl={profile?.cvUrl} />
              </Reveal>
            </div>

            {/* Right: Visual / Product Mockup Style */}
            <div className="flex-1 flex justify-center lg:justify-end w-full">
              <Reveal delay={0.3} overflow="visible">
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] group perspective-1000">
                  {/* Glowing backdrop - optimized for performance */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary to-cyan-400 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>

                  {/* Image container with floating animation */}
                  <div className="relative z-10 w-full h-full transform transition-transform duration-700 hover:rotate-y-12 hover:rotate-x-12 hover:scale-105" style={{ animation: "float 6s ease-in-out infinite" }}>
                    {profile?.homeImage ? (
                      <img
                        src={profile.homeImage !== 'default.jpg' ? profile.homeImage : '/assets/img/logo.png'}
                        alt="Profile"
                        className="object-cover rounded-3xl shadow-2xl w-full h-full border border-white/20 bg-card/50 backdrop-blur-sm"
                      />
                    ) : (
                      <div className="w-full h-full rounded-3xl bg-card/50 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
                        <span className="text-foreground/50">No Image</span>
                      </div>
                    )}

                    {/* Floating decorative elements */}
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/30 rounded-full blur-2xl"></div>
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-400/30 rounded-full blur-2xl"></div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="aboutme" className="min-h-screen w-full py-24 flex items-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <ParallaxElement offset={30}>
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">About Me</h2>
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light">
                  {profile?.aboutText || "Belum ada informasi about me."}
                </p>
              </div>
            </Reveal>
          </ParallaxElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((svc, index) => {
              const IconComp = (HiIcons as any)[svc.iconName] || HiIcons.HiGlobeAlt
              const isFirst = index % 3 === 0
              const isSecond = index % 3 === 1
              
              const colorTheme = isFirst 
                ? { bg: 'bg-red-500/20', text: 'text-red-500', border: 'hover:border-red-500/30', shadow: 'hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]' }
                : isSecond
                ? { bg: 'bg-blue-500/20', text: 'text-blue-500', border: 'hover:border-blue-500/30', shadow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]' }
                : { bg: 'bg-purple-500/20', text: 'text-purple-500', border: 'hover:border-purple-500/30', shadow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]' }
              
              return (
                <Reveal key={svc.id} delay={0.1 * ((index % 3) + 1)}>
                  <TiltCard className="h-full">
                    <a href={svc.link || '#'} target={svc.link ? "_blank" : "_self"} rel="noreferrer" className="group block h-full">
                      <div className={`glass p-8 rounded-3xl h-full flex flex-col justify-between transition-all duration-500 ${colorTheme.shadow} ${colorTheme.border}`}>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{svc.title}</h3>
                          <p className="text-foreground/60 mb-8">{svc.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorTheme.text} ${colorTheme.bg}`}>
                            <IconComp size={24} />
                          </div>
                          {svc.link && (
                            <span className="text-sm font-medium text-foreground/50 group-hover:text-primary transition-colors">Buka Link</span>
                          )}
                        </div>
                      </div>
                    </a>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
          <Reveal delay={0.4}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/about" className="px-8 py-4 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 font-medium">
                Selengkapnya Tentang Saya
              </Link>
              <Link href="/content" className="px-8 py-4 rounded-full bg-transparent text-foreground border border-foreground/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 font-medium">
                Lihat Konten Terbaru
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="service" className="w-full py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ParallaxElement offset={40}>
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">Skills</h2>
            </Reveal>
          </ParallaxElement>
          {skills.length === 0 ? (
            <p className="text-center text-foreground/60">Belum ada skill yang ditambahkan.</p>
          ) : (
            <div className="w-full relative py-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-background after:to-transparent">
              <InfiniteMarquee speed={35} pauseOnHover={true}>
                {skills.map((skill) => (
                  <div key={skill.id} className="w-48 mx-3">
                    <TiltCard className="h-full">
                      <div className="glass p-6 rounded-3xl text-center h-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:border-primary/50">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white/5 rounded-2xl flex items-center justify-center p-4">
                          <img src={skill.image} alt={skill.name} className="max-w-full max-h-full object-contain drop-shadow-md" />
                        </div>
                        <h4 className="font-bold text-lg mb-2">{skill.name}</h4>
                        {skill.description && (
                          <p className="text-sm text-foreground/70 line-clamp-2">{skill.description}</p>
                        )}
                      </div>
                    </TiltCard>
                  </div>
                ))}
              </InfiniteMarquee>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="project" className="min-h-screen w-full py-24 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ParallaxElement offset={30}>
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">Projects</h2>
            </Reveal>
          </ParallaxElement>
          {projects.length === 0 ? (
            <p className="text-center text-foreground/60">Belum ada project yang ditambahkan.</p>
          ) : (
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {projects.slice(0, 3).map((project, i) => (
                  <Reveal key={project.id} delay={0.1 * (i % 3)}>
                  <TiltCard className="h-full">
                    <div className="glass rounded-3xl flex flex-col group transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:border-primary/50 h-full relative">
                      <div className="h-48 overflow-hidden relative rounded-t-3xl">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
                        
                        <p className="text-foreground/70 mb-6 flex-1 text-sm leading-relaxed line-clamp-3">{project.description}</p>

                        {project.link && (
                          <a href={project.link} target="_blank" rel="noreferrer" className="w-full block text-center py-3 rounded-full border border-primary/50 text-primary hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] font-medium">
                            Lihat Live
                          </a>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                  </Reveal>
                ))}
              </div>
              {projects.length > 3 && (
                <Reveal delay={0.3}>
                  <Link href="/projects" className="mt-12 inline-flex px-8 py-4 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300 font-medium">
                    Lihat Semua Project
                  </Link>
                </Reveal>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-24 mb-20 relative">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 w-full">
          <Reveal>
            <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:border-primary/30">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Contact Me</h2>
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
