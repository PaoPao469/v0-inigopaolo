"use client"

import { Project } from "@/lib/projects"
import ProjectCard from "@/components/project-card"

interface ProjectGalleryProps {
  projects: Project[]
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.12em",
            fontSize: "14px",
            color: "rgba(180, 175, 165, 0.5)",
            textTransform: "uppercase",
          }}
        >
          No projects yet
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
