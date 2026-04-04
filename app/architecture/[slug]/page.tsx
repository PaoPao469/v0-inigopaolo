import { notFound } from "next/navigation"
import SectionLayout from "@/components/section-layout"
import ProjectDetail from "@/components/project-detail"
import YearCollection from "@/components/year-collection"
import { getAllProjects, getProjectById, getYearBySlug, getAllYearSlugs } from "@/lib/architecture-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const yearSlugs = getAllYearSlugs().map((slug) => ({ slug }))
  const projectIds = getAllProjects().map((project) => ({ slug: project.id }))
  
  return [...yearSlugs, ...projectIds]
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  
  const yearData = getYearBySlug(slug)
  if (yearData) {
    return {
      title: `${yearData.label} | Architecture | Inigo Paolo`,
      description: `Architecture projects from ${yearData.label}`,
    }
  }
  
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

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  
  // Check if it's a year collection page
  const yearData = getYearBySlug(slug)
  if (yearData) {
    return (
      <SectionLayout>
        <YearCollection yearData={yearData} />
      </SectionLayout>
    )
  }
  
  // Check if it's a project detail page
  const project = getProjectById(slug)
  if (project) {
    return (
      <SectionLayout>
        <ProjectDetail project={project} />
      </SectionLayout>
    )
  }

  notFound()
}
