import { notFound } from "next/navigation"
import SectionLayout from "@/components/section-layout"
import ProjectDetail from "@/components/project-detail"
import { getAllProjects, getProjectById } from "@/lib/architecture-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  
  const project = getProjectById(slug)
  if (project) {
    return {
      title: `${project.title} ${project.titleAccent} | Architecture | Inigo Paolo`,
      description: project.description,
    }
  }

  return {
    title: "Not Found | Inigo Paolo",
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  
  const project = getProjectById(slug)
  if (!project) {
    notFound()
  }

  return (
    <SectionLayout plainBackground>
      <ProjectDetail project={project} />
    </SectionLayout>
  )
}
