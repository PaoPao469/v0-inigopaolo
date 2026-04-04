"use client"

import Image from "next/image"
import Link from "next/link"
import { getYearForProject } from "@/lib/architecture-data"

interface Project {
  id: string
  category: string
  title: string
  titleAccent: string
  description: string
  thumbnail: string
  images: string[]
}

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const yearInfo = getYearForProject(project.id)
  const backHref = yearInfo ? `/architecture/${yearInfo.slug}` : "/architecture"
  const backLabel = yearInfo ? `BACK TO ${yearInfo.label}` : "BACK TO COLLECTIONS"

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-12 pt-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 160, 120, 0.8)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>
      </div>

      {/* Main Content - Side by Side Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Side - Project Info (Sticky on Desktop) */}
        <div className="lg:sticky lg:top-32">
          <span
            className="text-[10px] tracking-[0.25em] block mb-3"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              color: "rgba(180, 160, 120, 0.9)",
            }}
          >
            {project.category}
          </span>
          
          <h1
            className="text-3xl md:text-4xl lg:text-5xl mb-6"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.95)",
              letterSpacing: "0.02em",
              lineHeight: 1.1,
            }}
          >
            {project.title}
            <br />
            <span style={{ fontWeight: 400, opacity: 0.7 }}>{project.titleAccent}</span>
          </h1>
          
          <p
            className="text-sm md:text-base leading-relaxed mb-8 max-w-lg"
            style={{
              fontFamily: "var(--font-figtree), sans-serif",
              color: "rgba(180, 175, 165, 0.7)",
              lineHeight: 1.9,
            }}
          >
            {project.description}
          </p>

          {/* Project Details */}
          <div className="space-y-4 border-t border-white/10 pt-8">
            <div className="flex justify-between items-center">
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  color: "rgba(180, 175, 165, 0.4)",
                }}
              >
                PROJECT TYPE
              </span>
              <span
                className="text-xs"
                style={{
                  fontFamily: "var(--font-figtree), sans-serif",
                  color: "rgba(180, 175, 165, 0.7)",
                }}
              >
                {project.category}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span
                className="text-[10px] tracking-[0.2em]"
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  color: "rgba(180, 175, 165, 0.4)",
                }}
              >
                IMAGES
              </span>
              <span
                className="text-xs"
                style={{
                  fontFamily: "var(--font-figtree), sans-serif",
                  color: "rgba(180, 175, 165, 0.7)",
                }}
              >
                {project.images.length} Photos
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Image Gallery */}
        <div className="space-y-6">
          {project.images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image}
                  alt={`${project.title} ${project.titleAccent} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-20 mb-8 pt-8 border-t border-white/10">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 160, 120, 0.8)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>
      </div>
    </div>
  )
}
