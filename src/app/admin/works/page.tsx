import prisma from "@/lib/prisma"
import SkillsClient from "./SkillsClient"
import ProjectsClient from "./ProjectsClient"

export const dynamic = 'force-dynamic'

export default async function AdminWorks() {
  const skills = await prisma.skill.findMany()
  const projects = await prisma.project.findMany()
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gradient">Kelola Works & Skills</h1>
      
      <SkillsClient initialSkills={skills} />
      
      <hr className="border-white/10 my-12" />
      
      <ProjectsClient initialProjects={projects} />
    </div>
  )
}
