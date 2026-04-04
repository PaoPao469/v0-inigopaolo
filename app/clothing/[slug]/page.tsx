import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getProjectBySlug, getProjectImages, getAdjacentProjects, clothingProjects } from "@/lib/projects"
import SectionLayout from "@/components/section-layout"
import BackButton from "@/components/back-button"
import SlimeCursor from "@/components/slime-cursor"

export async function generateStaticParams() {
  return clothingProjects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug("clothing", slug)
  
  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: `${project.title} | Clothing | Inigo Paolo`,
    description: project.description,
  }
}

export default async function ClothingProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug("clothing", slug)

  if (!project) {
    notFound()
  }

  const images = getProjectImages(project)
  const { prev, next } = getAdjacentProjects("clothing", slug)

  const linkStyle = {
    fontFamily: "var(--font-chillax), sans-serif",
    fontWeight: 500,
    fontSize: "12px",
    letterSpacing: "0.1em",
    color: "rgba(180, 175, 165, 0.7)",
    textTransform: "uppercase" as const,
  }

  return (
    <>
      <SlimeCursor />
      <SectionLayout>
        <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
          <BackButton href="/clothing" label="Clothing" />

          {/* Project Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-baseline gap-4 mb-4">
              <h1
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  letterSpacing: "0.08em",
                  color: "rgba(180, 175, 165, 0.9)",
                  textTransform: "uppercase",
                }}
              >
                {project.title}
              </h1>
              <span
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "rgba(180, 175, 165, 0.5)",
                }}
              >
                {project.year}
              </span>
            </div>

            {project.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full"
                    style={{
                      fontFamily: "var(--font-chillax), sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.08em",
                      color: "rgba(180, 175, 165, 0.6)",
                      backgroundColor: "rgba(180, 175, 165, 0.08)",
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                color: "rgba(180, 175, 165, 0.65)",
                maxWidth: "700px",
                lineHeight: 1.7,
              }}
            >
              {project.description}
            </p>
          </header>

          {/* Project Images */}
          <div className="space-y-8 mb-16">
            {images.map((src, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden rounded-lg"
                style={{ backgroundColor: "rgba(20, 20, 20, 0.5)" }}
              >
                <Image
                  src={src}
                  alt={`${project.title} - Page ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-contain"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <nav className="flex justify-between items-center pt-8 border-t border-white/10">
            {prev ? (
              <Link
                href={`/clothing/${prev.slug}`}
                className="hover:text-white transition-colors"
                style={linkStyle}
              >
                &larr; {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/clothing/${next.slug}`}
                className="hover:text-white transition-colors"
                style={linkStyle}
              >
                {next.title} &rarr;
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </div>
      </SectionLayout>
    </>
  )
}
