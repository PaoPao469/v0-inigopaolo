"use client"

import Image from "next/image"
import Link from "next/link"

// Project data organized by year
export const portfolioData = {
  year1: {
    label: "YEAR 1",
    projects: [
      {
        id: "urban-dwelling",
        category: "RESIDENTIAL",
        title: "URBAN",
        titleAccent: "DWELLING",
        description: "An exploration of compact urban living spaces that maximize functionality while maintaining aesthetic harmony. This project investigates the relationship between private and communal areas within a constrained urban footprint, emphasizing natural light penetration and spatial fluidity.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        ],
      },
      {
        id: "form-studies",
        category: "CONCEPTUAL",
        title: "FORM",
        titleAccent: "STUDIES",
        description: "A series of explorations into geometric forms and their spatial implications. These studies examine how basic shapes can be manipulated to create dynamic architectural spaces that respond to light and movement, pushing the boundaries of conventional design.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        ],
      },
      {
        id: "texture-dialogue",
        category: "MATERIAL",
        title: "TEXTURE",
        titleAccent: "DIALOGUE",
        description: "An investigation into the tactile qualities of architectural surfaces. This project explores how different materials interact with each other and with their environment to create rich sensory experiences that engage inhabitants on multiple levels.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
        ],
      },
    ],
  },
  year2: {
    label: "YEAR 2",
    projects: [
      {
        id: "vertical-landscapes",
        category: "COMMERCIAL",
        title: "VERTICAL",
        titleAccent: "LANDSCAPES",
        description: "A multi-story commercial development that reimagines the traditional office building. The design incorporates green spaces at multiple levels, creating a vertical ecosystem that promotes well-being and sustainability while redefining workplace environments.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        ],
      },
      {
        id: "community-hub",
        category: "PUBLIC",
        title: "COMMUNITY",
        titleAccent: "HUB",
        description: "A civic building designed to serve as a gathering point for the local community. The architecture emphasizes transparency, accessibility, and flexibility to accommodate diverse activities and events, fostering social connections and community engagement.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        ],
      },
    ],
  },
  rhino: {
    label: "RHINO PROJECT",
    projects: [
      {
        id: "parametric-forms",
        category: "DIGITAL",
        title: "PARAMETRIC",
        titleAccent: "FORMS",
        description: "Digital modeling explorations using Rhino 3D and Grasshopper. These experiments investigate parametric design principles, creating complex geometries that respond to various environmental and programmatic inputs, blending computational precision with artistic expression.",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
        ],
      },
    ],
  },
}

// Helper to get all projects as flat array
export function getAllProjects() {
  return [
    ...portfolioData.year1.projects,
    ...portfolioData.year2.projects,
    ...portfolioData.rhino.projects,
  ]
}

// Helper to find project by ID
export function getProjectById(id: string) {
  return getAllProjects().find((p) => p.id === id)
}

interface ProjectCardProps {
  id: string
  category: string
  title: string
  titleAccent: string
  thumbnail: string
}

function ProjectCard({ id, category, title, titleAccent, thumbnail }: ProjectCardProps) {
  return (
    <Link
      href={`/architecture/${id}`}
      className="group block relative overflow-hidden rounded-sm"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnail}
          alt={`${title} ${titleAccent}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
      </div>
      
      {/* Project info */}
      <div className="mt-4">
        <span
          className="text-[10px] tracking-[0.2em] block mb-1"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 160, 120, 0.8)",
          }}
        >
          {category}
        </span>
        <h3
          className="text-base md:text-lg transition-colors group-hover:text-white/90"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.85)",
            letterSpacing: "0.05em",
          }}
        >
          {title} <span style={{ fontWeight: 400, opacity: 0.7 }}>{titleAccent}</span>
        </h3>
      </div>
    </Link>
  )
}

interface YearSectionProps {
  label: string
  projects: typeof portfolioData.year1.projects
}

function YearSection({ label, projects }: YearSectionProps) {
  return (
    <section className="mb-20 md:mb-28">
      {/* Year Label */}
      <div className="border-b border-white/10 pb-4 mb-10">
        <h2
          className="text-sm tracking-[0.3em]"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            color: "rgba(180, 175, 165, 0.5)",
          }}
        >
          {label}
        </h2>
      </div>
      
      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            category={project.category}
            title={project.title}
            titleAccent={project.titleAccent}
            thumbnail={project.thumbnail}
          />
        ))}
      </div>
    </section>
  )
}

export default function ArchitecturePortfolio() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-20 md:mb-28 pt-8">
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
          className="text-xs tracking-[0.25em]"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 175, 165, 0.45)",
          }}
        >
          PROJECTS THAT TELL STORIES
        </p>
      </div>

      {/* Year 1 Section */}
      <YearSection 
        label={portfolioData.year1.label} 
        projects={portfolioData.year1.projects} 
      />

      {/* Year 2 Section */}
      <YearSection 
        label={portfolioData.year2.label} 
        projects={portfolioData.year2.projects} 
      />

      {/* Rhino Project Section */}
      <YearSection 
        label={portfolioData.rhino.label} 
        projects={portfolioData.rhino.projects} 
      />
    </div>
  )
}
