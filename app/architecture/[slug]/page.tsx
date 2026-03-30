import { notFound } from "next/navigation"
import Link from "next/link"
import SectionLayout from "@/components/section-layout"
import BackButton from "@/components/back-button"
import ProjectImageGallery from "@/components/project-image-gallery"
import { architectureProjects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return architectureProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug("architecture", slug)
  
  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Architecture | Inigo Paolo`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProjectBySlug("architecture", slug)

  if (!project) {
    notFound()
  }

  const { prev, next } = getAdjacentProjects("architecture", slug)

  return (
    <SectionLayout>
      {/* Back navigation */}
      <div className="mb-8">
        <BackButton href="/architecture" label="Architecture" />
      </div>

      {/* Project header */}
      <div className="mb-12 max-w-3xl">
        <h1
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.18em",
            fontSize: "28px",
            color: "rgba(180, 175, 165, 0.9)",
            textTransform: "uppercase",
          }}
        >
          {project.title}
        </h1>
        
        <div className="flex items-center gap-4 mt-4">
          <span
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 500,
              letterSpacing: "0.08em",
              fontSize: "12px",
              color: "rgba(180, 175, 165, 0.5)",
            }}
          >
            {project.year}
          </span>
          {project.location && (
            <>
              <span style={{ color: "rgba(180, 175, 165, 0.3)" }}>—</span>
              <span
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  fontSize: "12px",
                  color: "rgba(180, 175, 165, 0.5)",
                }}
              >
                {project.location}
              </span>
            </>
          )}
        </div>

        <p
          className="mt-6"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.02em",
            fontSize: "14px",
            color: "rgba(180, 175, 165, 0.65)",
            lineHeight: 1.8,
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Project images from Blob storage */}
      <ProjectGalleryServer project={project} />

      {/* Previous/Next navigation */}
      <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/10">
        {prev ? (
          <Link
            href={`/architecture/${prev.slug}`}
            className="group flex flex-col"
          >
            <span
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.1em",
                fontSize: "10px",
                color: "rgba(180, 175, 165, 0.4)",
                textTransform: "uppercase",
              }}
            >
              Previous
            </span>
            <span
              className="group-hover:text-white transition-colors"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.08em",
                fontSize: "13px",
                color: "rgba(180, 175, 165, 0.7)",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={`/architecture/${next.slug}`}
            className="group flex flex-col items-end"
          >
            <span
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.1em",
                fontSize: "10px",
                color: "rgba(180, 175, 165, 0.4)",
                textTransform: "uppercase",
              }}
            >
              Next
            </span>
            <span
              className="group-hover:text-white transition-colors"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.08em",
                fontSize: "13px",
                color: "rgba(180, 175, 165, 0.7)",
                textTransform: "uppercase",
                marginTop: "4px",
              }}
            >
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </SectionLayout>
  )
}
