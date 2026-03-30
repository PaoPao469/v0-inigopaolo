"use client"

import Link from "next/link"
import Image from "next/image"
import { Project, getProjectThumbnail } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const thumbnail = getProjectThumbnail(project)

  return (
    <Link
      href={`/${project.section}/${project.slug}`}
      className="group block relative overflow-hidden"
    >
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
        <Image
          src={thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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
          {project.year}{project.location ? ` — ${project.location}` : ""}
        </p>
      </div>
    </Link>
  )
}
