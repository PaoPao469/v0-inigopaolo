"use client"

import Image from "next/image"
import Link from "next/link"

// Project data organized by year
const portfolioData = {
  year1: {
    label: "YEAR 1",
    projects: [
      {
        id: "project-1a",
        category: "RESIDENTIAL",
        title: "URBAN",
        titleAccent: "DWELLING",
        description: "An exploration of compact urban living spaces that maximize functionality while maintaining aesthetic harmony. This project investigates the relationship between private and communal areas within a constrained urban footprint.",
        slug: "project-1",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
        ],
      },
      {
        id: "project-1b",
        category: "CONCEPTUAL",
        title: "FORM",
        titleAccent: "STUDIES",
        description: "A series of explorations into geometric forms and their spatial implications. These studies examine how basic shapes can be manipulated to create dynamic architectural spaces that respond to light and movement.",
        slug: "project-1",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
        ],
      },
      {
        id: "project-1c",
        category: "MATERIAL",
        title: "TEXTURE",
        titleAccent: "DIALOGUE",
        description: "An investigation into the tactile qualities of architectural surfaces. This project explores how different materials interact with each other and with their environment to create rich sensory experiences.",
        slug: "project-1",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
        ],
      },
    ],
  },
  year2: {
    label: "YEAR 2",
    projects: [
      {
        id: "project-2a",
        category: "COMMERCIAL",
        title: "VERTICAL",
        titleAccent: "LANDSCAPES",
        description: "A multi-story commercial development that reimagines the traditional office building. The design incorporates green spaces at multiple levels, creating a vertical ecosystem that promotes well-being and sustainability.",
        slug: "project-2",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
        ],
      },
      {
        id: "project-2b",
        category: "PUBLIC",
        title: "COMMUNITY",
        titleAccent: "HUB",
        description: "A civic building designed to serve as a gathering point for the local community. The architecture emphasizes transparency, accessibility, and flexibility to accommodate diverse activities and events.",
        slug: "project-2",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
        ],
      },
    ],
  },
  rhino: {
    label: "RHINO PROJECT",
    projects: [
      {
        id: "rhino-1",
        category: "DIGITAL",
        title: "PARAMETRIC",
        titleAccent: "FORMS",
        description: "Digital modeling explorations using Rhino 3D and Grasshopper. These experiments investigate parametric design principles, creating complex geometries that respond to various environmental and programmatic inputs.",
        slug: "rhino-project",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        ],
      },
    ],
  },
}

interface ProjectSectionProps {
  category: string
  title: string
  titleAccent: string
  description: string
  images: string[]
  slug: string
  reverse?: boolean
}

function ProjectSection({ category, title, titleAccent, description, images, slug, reverse = false }: ProjectSectionProps) {
  const textContent = (
    <div className="flex flex-col justify-center">
      <span
        className="text-xs tracking-[0.2em] mb-3"
        style={{
          fontFamily: "var(--font-chillax), sans-serif",
          color: "rgba(180, 160, 120, 0.9)",
        }}
      >
        {category}
      </span>
      <h3
        className="text-2xl md:text-3xl mb-4"
        style={{
          fontFamily: "var(--font-chillax), sans-serif",
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.95)",
          letterSpacing: "0.02em",
        }}
      >
        {title} <span style={{ fontWeight: 400 }}>{titleAccent}</span>
      </h3>
      <p
        className="text-sm leading-relaxed mb-6 max-w-md"
        style={{
          fontFamily: "var(--font-figtree), sans-serif",
          color: "rgba(180, 175, 165, 0.7)",
          lineHeight: 1.8,
        }}
      >
        {description}
      </p>
      <Link
        href={`/architecture/${slug}`}
        className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-colors hover:opacity-80"
        style={{
          fontFamily: "var(--font-chillax), sans-serif",
          color: "rgba(180, 160, 120, 0.9)",
        }}
      >
        VIEW WORK
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )

  const imageContent = (
    <div className="grid grid-cols-2 gap-3">
      {/* Main large image */}
      <div className="col-span-2 relative aspect-[16/10] overflow-hidden rounded-sm">
        <Image
          src={images[0]}
          alt={`${title} ${titleAccent}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      {/* Smaller images in grid */}
      <div className="relative aspect-square overflow-hidden rounded-sm">
        <Image
          src={images[0]}
          alt={`${title} detail 1`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="relative aspect-square overflow-hidden rounded-sm">
        <Image
          src={images[0]}
          alt={`${title} detail 2`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  )

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-24 ${reverse ? "lg:[direction:rtl]" : ""}`}>
      <div className={reverse ? "lg:[direction:ltr]" : ""}>
        {reverse ? imageContent : textContent}
      </div>
      <div className={reverse ? "lg:[direction:ltr]" : ""}>
        {reverse ? textContent : imageContent}
      </div>
    </div>
  )
}

interface YearSectionProps {
  label: string
  projects: typeof portfolioData.year1.projects
  startReverse?: boolean
}

function YearSection({ label, projects, startReverse = false }: YearSectionProps) {
  return (
    <section className="mb-16 md:mb-24">
      {/* Year Label */}
      <div className="border-b border-white/10 pb-4 mb-8">
        <h2
          className="text-lg tracking-[0.25em]"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            color: "rgba(180, 175, 165, 0.6)",
          }}
        >
          {label}
        </h2>
      </div>
      
      {/* Projects */}
      <div className="divide-y divide-white/5">
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            category={project.category}
            title={project.title}
            titleAccent={project.titleAccent}
            description={project.description}
            images={project.images}
            slug={project.slug}
            reverse={startReverse ? index % 2 === 0 : index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  )
}

export default function ArchitecturePortfolio() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16 md:mb-24 pt-8">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl mb-4"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "rgba(255, 255, 255, 0.95)",
          }}
        >
          ARCHITECTURE
        </h1>
        <p
          className="text-sm tracking-[0.2em]"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 175, 165, 0.5)",
          }}
        >
          PROJECTS THAT TELL STORIES
        </p>
      </div>

      {/* Year 1 Section */}
      <YearSection 
        label={portfolioData.year1.label} 
        projects={portfolioData.year1.projects} 
        startReverse={false}
      />

      {/* Year 2 Section */}
      <YearSection 
        label={portfolioData.year2.label} 
        projects={portfolioData.year2.projects} 
        startReverse={true}
      />

      {/* Rhino Project Section */}
      <YearSection 
        label={portfolioData.rhino.label} 
        projects={portfolioData.rhino.projects} 
        startReverse={false}
      />
    </div>
  )
}
