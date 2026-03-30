"use client"

import Link from "next/link"
import Image from "next/image"
import { Project, getProjectThumbnail } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const thumbnail = getProjectThumbnail(project)
  
  // Don't render if no valid thumbnail
  if (!thumbnail) {
    return null
  }

  return (
    <Link
      href={`/${project.section}/${project.slug}`}
      className="group block relative overflow-hidden"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 rounded border border-white/5">
        <Image
          src={thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Hover overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Page count badge */}
        {project.pageCount > 0 && (
          <div 
            className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur-sm"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontSize: "10px",
              letterSpacing: "0.08em",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            {project.pageCount} slides
          </div>
        )}
      </div>

      {/* Project info */}
      <div className="mt-4">
        <h3
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.08em",
            fontSize: "14px",
            color: "rgba(180, 175, 165, 0.9)",
            textTransform: "uppercase",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.06em",
            fontSize: "11px",
            color: "rgba(180, 175, 165, 0.5)",
            marginTop: "4px",
          }}
        >
          {project.year}
        </p>
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-white/5 border border-white/10"
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.06em",
                  color: "rgba(180, 175, 165, 0.5)",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
