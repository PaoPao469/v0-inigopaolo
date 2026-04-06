"use client"

import Image from "next/image"
import Link from "next/link"
import { getYearForProject } from "@/lib/architecture-data"

interface ImageSection {
  label: string
  images: string[]
  isHeroFirst?: boolean
}

interface Project {
  id: string
  category: string
  title: string
  titleAccent: string
  description: string
  thumbnail: string
  images: string[]
  imageSections?: ImageSection[]
}

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const yearInfo = getYearForProject(project.id)
  const backHref = yearInfo ? `/architecture/${yearInfo.slug}` : "/architecture"
  const backLabel = yearInfo ? `BACK TO ${yearInfo.label}` : "BACK TO COLLECTIONS"

  // Parse description into sections
  const descriptionSections = project.description.split('\n\n').reduce((acc: { title: string | null; content: string }[], part) => {
    const trimmed = part.trim()
    if (trimmed === 'Project Description' || trimmed === 'Thought Process') {
      acc.push({ title: trimmed, content: '' })
    } else if (acc.length > 0 && acc[acc.length - 1].content === '') {
      acc[acc.length - 1].content = trimmed
    } else {
      acc.push({ title: null, content: trimmed })
    }
    return acc
  }, [])

  return (
    <div className="max-w-[1600px] mx-auto">
      {/* Compact Header with Back Nav and Title */}
      <div className="mb-8 pt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] transition-opacity hover:opacity-70 w-fit"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              color: "rgba(180, 160, 120, 0.8)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            {backLabel}
          </Link>
          
          <div className="flex items-baseline gap-4">
            <h1
              className="text-2xl md:text-3xl lg:text-4xl"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.95)",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}
            >
              {project.title}{" "}
              <span style={{ fontWeight: 400, opacity: 0.7 }}>{project.titleAccent}</span>
            </h1>
            <span
              className="text-[9px] tracking-[0.2em] hidden md:inline"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                color: "rgba(180, 160, 120, 0.7)",
              }}
            >
              {project.category}
            </span>
          </div>
        </div>

        <span
          className="text-[10px] tracking-[0.15em]"
          style={{
            fontFamily: "var(--font-figtree), sans-serif",
            color: "rgba(180, 175, 165, 0.5)",
          }}
        >
          {project.imageSections 
            ? project.imageSections.reduce((total, section) => total + section.images.length, 0)
            : project.images.length} IMAGES
        </span>
      </div>

      {/* Full-Width Image Gallery - Primary Focus */}
      <div className="space-y-12">
        {project.imageSections && project.imageSections.length > 0 ? (
          project.imageSections.map((section, sectionIndex) => {
            const hasHeroFirst = section.isHeroFirst === true
            const isMinecraftRender = section.label.toLowerCase().includes('minecraft')
            const isSingleImage = section.images.length === 1
            
            return (
              <div key={sectionIndex} className="space-y-4">
                {/* Section Label - Subtle */}
                <h3
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: "var(--font-chillax), sans-serif",
                    color: "rgba(180, 160, 120, 0.6)",
                  }}
                >
                  {section.label}
                </h3>
                
                {/* Section Images - Large and Prominent */}
                {hasHeroFirst ? (
                  <div className="space-y-4">
                    {/* Hero image - Extra large */}
                    <div className="relative overflow-hidden rounded-sm">
                      <div className="relative aspect-[21/9] md:aspect-[2.5/1]">
                        <Image
                          src={section.images[0]}
                          alt={`${project.title} ${project.titleAccent} - ${section.label} 1`}
                          fill
                          className="object-cover"
                          priority={sectionIndex === 0}
                        />
                      </div>
                    </div>
                    {/* Remaining images in responsive grid */}
                    {section.images.length > 1 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {section.images.slice(1).map((image, imageIndex) => (
                          <div
                            key={imageIndex}
                            className="relative overflow-hidden rounded-sm"
                          >
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={image}
                                alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 2}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={
                    isMinecraftRender || isSingleImage 
                      ? "space-y-4" 
                      : section.images.length === 2 
                        ? "grid grid-cols-1 md:grid-cols-2 gap-3"
                        : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                  }>
                    {section.images.map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="relative overflow-hidden rounded-sm"
                      >
                        <div className={`relative ${
                          isMinecraftRender || isSingleImage 
                            ? 'aspect-[21/9] md:aspect-[2.5/1]' 
                            : section.images.length === 2
                              ? 'aspect-[4/3] md:aspect-[3/2]'
                              : 'aspect-[4/3]'
                        }`}>
                          <Image
                            src={image}
                            alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                            priority={sectionIndex === 0 && imageIndex === 0}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-sm ${index === 0 ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative ${index === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
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
        )}
      </div>

      {/* Compact Description Section - Below Images */}
      <div className="mt-16 pt-8 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {descriptionSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                {section.title && (
                  <h3
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{
                      fontFamily: "var(--font-chillax), sans-serif",
                      color: "rgba(180, 160, 120, 0.6)",
                    }}
                  >
                    {section.title}
                  </h3>
                )}
                <p
                  className="text-xs leading-relaxed"
                  style={{
                    fontFamily: "var(--font-figtree), sans-serif",
                    color: "rgba(180, 175, 165, 0.5)",
                    lineHeight: 1.8,
                  }}
                >
                  {section.content || section.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Minimal Bottom Navigation */}
      <div className="mt-12 mb-8 pt-6 border-t border-white/5 flex justify-center">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 160, 120, 0.5)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>
      </div>
    </div>
  )
}
