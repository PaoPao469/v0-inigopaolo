"use client"

import Image from "next/image"
import Link from "next/link"
import { getAllProjects } from "@/lib/architecture-data"

interface Project {
  id: string
  category: string
  title: string
  titleAccent: string
  description: string
  thumbnail: string
  images: string[]
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/architecture/${project.id}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <Image
          src={project.thumbnail}
          alt={`${project.title} ${project.titleAccent}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
      </div>
      
      <span
        className="text-[10px] tracking-[0.2em] block mb-2"
        style={{
          fontFamily: "var(--font-chillax), sans-serif",
          color: "rgba(200, 205, 215, 0.8)",
        }}
      >
        {project.category}
      </span>
      
      <h3
        className="text-lg md:text-xl transition-colors group-hover:text-white"
        style={{
          fontFamily: "var(--font-chillax), sans-serif",
          fontWeight: 500,
          color: "rgba(255, 255, 255, 0.85)",
          letterSpacing: "0.03em",
        }}
      >
        {project.title}{" "}
        <span style={{ fontWeight: 400, opacity: 0.6 }}>{project.titleAccent}</span>
      </h3>
    </Link>
  )
}

export default function ArchitecturePortfolio() {
  const allProjects = getAllProjects()

  return (
    <div className="max-w-6xl mx-auto">
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
          className="text-xs tracking-[0.25em]"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(200, 205, 215, 0.45)",
          }}
        >
          {allProjects.length} PROJECTS
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {allProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
