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
          
          <div className="mb-8 max-w-lg space-y-6">
            {project.description.split('\n\n').reduce((acc: { title: string | null; content: string }[], part, index, arr) => {
              const trimmed = part.trim()
              // Check if this part is a section title (Project Description or Thought Process)
              if (trimmed === 'Project Description' || trimmed === 'Thought Process') {
                acc.push({ title: trimmed, content: '' })
              } else if (acc.length > 0 && acc[acc.length - 1].content === '') {
                // This is the content for the previous title
                acc[acc.length - 1].content = trimmed
              } else {
                // Regular paragraph without title
                acc.push({ title: null, content: trimmed })
              }
              return acc
            }, []).map((section, idx) => (
              <div key={idx}>
                {section.title && (
                  <h3
                    className="text-base md:text-lg mb-2"
                    style={{
                      fontFamily: "var(--font-chillax), sans-serif",
                      fontWeight: 500,
                      color: "rgba(255, 255, 255, 0.85)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {section.title}
                  </h3>
                )}
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--font-figtree), sans-serif",
                    color: "rgba(180, 175, 165, 0.7)",
                    lineHeight: 1.9,
                  }}
                >
                  {section.content || section.title}
                </p>
              </div>
            ))}
          </div>

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
                {project.imageSections 
                  ? project.imageSections.reduce((total, section) => total + section.images.length, 0)
                  : project.images.length} Photos
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Scrollable Image Gallery */}
        <div className="space-y-8">
          {/* Render labeled image sections if available */}
          {project.imageSections && project.imageSections.length > 0 ? (
            project.imageSections.map((section, sectionIndex) => {
              // Check if this section has a hero (large first image)
              const hasHeroFirst = section.isHeroFirst === true
              // Check if this is the "Minecraft Render" section for larger display
              const isMinecraftRender = section.label.toLowerCase().includes('minecraft')
              // Single image sections display full width
              const isSingleImage = section.images.length === 1
              
              return (
                <div key={sectionIndex} className="space-y-4">
                  {/* Section Label */}
                  <h3
                    className="text-sm tracking-[0.15em] uppercase"
                    style={{
                      fontFamily: "var(--font-chillax), sans-serif",
                      color: "rgba(180, 160, 120, 0.9)",
                    }}
                  >
                    {section.label}
                  </h3>
                  {/* Section Images */}
                  {hasHeroFirst ? (
                    // Hero layout: first image large, rest in grid
                    <div className="space-y-4">
                      {/* Hero image - large and prominent */}
                      <div className="relative overflow-hidden rounded-sm">
                        <div className="relative aspect-[16/9]">
                          <Image
                            src={section.images[0]}
                            alt={`${project.title} ${project.titleAccent} - ${section.label} 1`}
                            fill
                            className="object-cover"
                            priority={sectionIndex === 0}
                          />
                        </div>
                      </div>
                      {/* Remaining images in grid */}
                      {section.images.length > 1 && (
                        <div className="grid grid-cols-2 gap-4">
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
                    // Standard layout
                    <div className={isMinecraftRender || isSingleImage ? "space-y-6" : "grid grid-cols-2 gap-4"}>
                      {section.images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          className="relative overflow-hidden rounded-sm"
                        >
                          <div className={`relative ${isMinecraftRender || isSingleImage ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
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
            /* Fallback to regular images array */
            project.images.map((image, index) => (
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
            ))
          )}
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
