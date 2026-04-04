import { notFound } from "next/navigation"
import SectionLayout from "@/components/section-layout"
import ProjectDetail from "@/components/project-detail"
import { getAllProjects, getProjectById } from "@/components/architecture-portfolio"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const project = getProjectById(id)
  
  if (!project) {
    return {
      title: "Project Not Found | Inigo Paolo",
    }
  }

  return {
    title: `${project.title} ${project.titleAccent} | Architecture | Inigo Paolo`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  return (
    <SectionLayout>
      <ProjectDetail project={project} />
    </SectionLayout>
  )
}
