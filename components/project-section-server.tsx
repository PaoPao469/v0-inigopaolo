import Link from "next/link"
import Image from "next/image"
import { Project } from "@/lib/projects"
import { getProjectImagesFromBlob, BlobImage } from "@/lib/blob-images"

interface ProjectSectionServerProps {
  project: Project
  index: number
  categoryLabel?: string
}

export default async function ProjectSectionServer({ project, index, categoryLabel }: ProjectSectionServerProps) {
  // Fetch images from Blob storage
  const images = await getProjectImagesFromBlob(project.slug)
  
  // Use the first image as thumbnail, or fallback
  const thumbnail = images.length > 0 ? images[0].url : null
  
  if (!thumbnail) {
    return (
      <section className="py-16 border-b border-white/5 last:border-b-0">
        <div className="flex items-center gap-4 mb-6">
          <span
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontSize: "11px",
              color: "rgba(180, 175, 165, 0.35)",
            }}
          >
            0{index + 1}
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <div className="p-8 bg-neutral-900/50 rounded border border-white/5 text-center">
          <p style={{ fontFamily: "var(--font-chillax), sans-serif", color: "rgba(180, 175, 165, 0.5)", fontSize: "13px" }}>
            {project.title} - Images loading from Blob storage...
          </p>
        </div>
      </section>
    )
  }

  const isEven = index % 2 === 0
  const label = categoryLabel || project.section.charAt(0).toUpperCase() + project.section.slice(1)

  return (
    <section className="py-16 border-b border-white/5 last:border-b-0">
      {/* Project number and category */}
      <div className="flex items-center gap-4 mb-6">
        <span
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 600,
            letterSpacing: "0.02em",
            fontSize: "11px",
            color: "rgba(180, 175, 165, 0.35)",
          }}
        >
          0{index + 1}
        </span>
        <div className="h-px flex-1 bg-white/5" />
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
          {project.year}
        </span>
      </div>

      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16`}>
        {/* Image */}
        <Link 
          href={`/${project.section}/${project.slug}`}
          className="group relative lg:w-3/5 aspect-[16/10] overflow-hidden bg-neutral-900"
        >
          <Image
            src={thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
          
          {/* View project indicator */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div 
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.1em",
                fontSize: "10px",
                color: "rgba(255, 255, 255, 0.9)",
                textTransform: "uppercase",
              }}
            >
              View Project
            </div>
          </div>

          {/* Slide count from Blob */}
          {images.length > 0 && (
            <div 
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded bg-black/50 backdrop-blur-sm"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontSize: "10px",
                letterSpacing: "0.08em",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              {images.length} slides
            </div>
          )}

          {/* Vertical label */}
          <div 
            className="absolute left-4 bottom-4"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 600,
              letterSpacing: "0.15em",
              fontSize: "9px",
              color: "rgba(255, 255, 255, 0.4)",
              textTransform: "uppercase",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
            }}
          >
            {label}
          </div>
        </Link>

        {/* Content */}
        <div className="lg:w-2/5 flex flex-col justify-center">
          <Link href={`/${project.section}/${project.slug}`}>
            <h2
              className="hover:text-white transition-colors duration-300"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.04em",
                fontSize: "22px",
                color: "rgba(180, 175, 165, 0.9)",
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h2>
          </Link>

          <p
            className="mt-5"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 400,
              letterSpacing: "0.02em",
              fontSize: "13px",
              color: "rgba(180, 175, 165, 0.55)",
              lineHeight: 1.8,
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10"
                  style={{
                    fontFamily: "var(--font-chillax), sans-serif",
                    fontSize: "9px",
                    letterSpacing: "0.08em",
                    color: "rgba(180, 175, 165, 0.5)",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* View link */}
          <Link
            href={`/${project.section}/${project.slug}`}
            className="inline-flex items-center gap-2 mt-8 group/link"
          >
            <span
              className="group-hover/link:text-white transition-colors duration-300"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.1em",
                fontSize: "11px",
                color: "rgba(180, 175, 165, 0.7)",
                textTransform: "uppercase",
              }}
            >
              View Full Project
            </span>
            <svg 
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: "rgba(180, 175, 165, 0.5)" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
