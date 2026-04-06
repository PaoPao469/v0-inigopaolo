"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { getYearForProject } from "@/lib/architecture-data"
import ImageLightbox from "./image-lightbox"

interface ImageSection {
  label: string
  images: string[]
  isHeroFirst?: boolean
  gridLayout?: "hero-3x3"
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

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Collect all images into a flat array for lightbox navigation
  const allImages = useMemo(() => {
    const images: { url: string; alt: string }[] = []
    
    if (project.imageSections && project.imageSections.length > 0) {
      project.imageSections.forEach((section) => {
        section.images.forEach((img, idx) => {
          images.push({
            url: img,
            alt: `${project.title} ${project.titleAccent} - ${section.label} ${idx + 1}`,
          })
        })
      })
    } else {
      project.images.forEach((img, idx) => {
        images.push({
          url: img,
          alt: `${project.title} ${project.titleAccent} - Image ${idx + 1}`,
        })
      })
    }
    
    return images
  }, [project])

  const openLightbox = (imageUrl: string) => {
    const index = allImages.findIndex((img) => img.url === imageUrl)
    setCurrentImageIndex(index >= 0 ? index : 0)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)
  
  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }
  
  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : prev))
  }

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
    <div className="max-w-[1800px] mx-auto">
      {/* Header with Back Navigation */}
      <div className="mb-6 pt-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] transition-opacity hover:opacity-70 w-fit"
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
      </div>

      {/* Project Title and Description Section - At Beginning, Prominent */}
      <div className="mb-12">
        {/* Title Row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="flex items-baseline gap-4">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl"
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
          </div>
          <span
            className="text-[10px] tracking-[0.2em]"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              color: "rgba(180, 160, 120, 0.7)",
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Description Section - Larger and More Prominent */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {descriptionSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              {section.title && (
                <h3
                  className="text-sm tracking-[0.12em] uppercase"
                  style={{
                    fontFamily: "var(--font-chillax), sans-serif",
                    color: "rgba(180, 160, 120, 0.9)",
                    fontWeight: 500,
                  }}
                >
                  {section.title}
                </h3>
              )}
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{
                  fontFamily: "var(--font-figtree), sans-serif",
                  color: "rgba(200, 195, 185, 0.75)",
                  lineHeight: 1.9,
                }}
              >
                {section.content || section.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Width Image Gallery - Primary Visual Focus */}
      <div className="space-y-16">
        {project.imageSections && project.imageSections.length > 0 ? (
          project.imageSections.map((section, sectionIndex) => {
            const hasHeroFirst = section.isHeroFirst === true
            const hasHeroGrid = section.gridLayout === "hero-3x3"
            const isMinecraftRender = section.label.toLowerCase().includes('minecraft')
            const isSingleImage = section.images.length === 1
            
            return (
              <div key={sectionIndex} className="space-y-6">
                {/* Section Label */}
                <h3
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: "var(--font-chillax), sans-serif",
                    color: "rgba(180, 160, 120, 0.7)",
                  }}
                >
                  {section.label}
                </h3>
                
                {/* Hero 3x3 Grid Layout - First image large, rest in balanced grid */}
                {hasHeroGrid ? (
                  <div className="grid grid-cols-3 gap-4">
                    {/* Hero image spanning 2x2 */}
                    <button
                      onClick={() => openLightbox(section.images[0])}
                      className="col-span-2 row-span-2 relative overflow-hidden rounded-sm cursor-zoom-in transition-transform hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={section.images[0]}
                          alt={`${project.title} ${project.titleAccent} - ${section.label} 1`}
                          fill
                          className="object-cover"
                          priority={sectionIndex === 0}
                          sizes="(max-width: 768px) 66vw, 1200px"
                        />
                      </div>
                    </button>
                    {/* Right column - 2 images stacked */}
                    {section.images.slice(1, 3).map((image, imageIndex) => (
                      <button
                        key={imageIndex}
                        onClick={() => openLightbox(image)}
                        className="relative overflow-hidden rounded-sm cursor-zoom-in transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={image}
                            alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 2}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 33vw, 600px"
                          />
                        </div>
                      </button>
                    ))}
                    {/* Bottom row - remaining images */}
                    {section.images.slice(3, 8).map((image, imageIndex) => (
                      <button
                        key={imageIndex + 3}
                        onClick={() => openLightbox(image)}
                        className="relative overflow-hidden rounded-sm cursor-zoom-in transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                      >
                        <div className="relative aspect-square">
                          <Image
                            src={image}
                            alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 4}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 33vw, 600px"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : hasHeroFirst ? (
                  <div className="space-y-6">
                    {/* Hero image - Extra large, maintains aspect ratio */}
                    <button
                      onClick={() => openLightbox(section.images[0])}
                      className="relative overflow-hidden rounded-sm w-full cursor-zoom-in transition-transform hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                    >
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={section.images[0]}
                          alt={`${project.title} ${project.titleAccent} - ${section.label} 1`}
                          fill
                          className="object-cover"
                          priority={sectionIndex === 0}
                          sizes="(max-width: 1800px) 100vw, 1800px"
                        />
                      </div>
                    </button>
                    {/* Remaining images in responsive grid */}
                    {section.images.length > 1 && (
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {section.images.slice(1).map((image, imageIndex) => (
                          <button
                            key={imageIndex}
                            onClick={() => openLightbox(image)}
                            className="relative overflow-hidden rounded-sm cursor-zoom-in transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-600/30"
                          >
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={image}
                                alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 2}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 33vw"
                              />
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={
                    isSingleImage 
                      ? "w-full flex justify-center" 
                      : section.images.length === 2 
                        ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                        : "grid grid-cols-2 lg:grid-cols-3 gap-4"
                  }>
                    {section.images.map((image, imageIndex) => (
                      <button
                        key={imageIndex}
                        onClick={() => openLightbox(image)}
                        className={`relative overflow-hidden rounded-sm cursor-zoom-in transition-transform hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-amber-600/30 ${
                          isSingleImage ? 'w-full' : ''
                        }`}
                      >
                        <div className={`relative ${
                          isSingleImage
                            ? 'aspect-[16/9]' 
                            : 'aspect-[4/3]'
                        }`}>
                          <Image
                            src={image}
                            alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                            priority={sectionIndex === 0 && imageIndex === 0}
                            sizes={isSingleImage ? "(max-width: 1800px) 100vw, 1800px" : "(max-width: 768px) 50vw, 33vw"}
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(image)}
                className={`relative overflow-hidden rounded-sm cursor-zoom-in transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-amber-600/30 ${index === 0 ? 'md:col-span-2' : ''}`}
              >
                <div className={`relative ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={image}
                    alt={`${project.title} ${project.titleAccent} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes={index === 0 ? "(max-width: 1800px) 100vw, 1800px" : "(max-width: 768px) 100vw, 50vw"}
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-20 mb-12 pt-8 border-t border-white/5 flex justify-center">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 160, 120, 0.6)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {backLabel}
        </Link>
      </div>

      {/* Image Lightbox */}
      {allImages.length > 0 && (
        <ImageLightbox
          isOpen={lightboxOpen}
          imageUrl={allImages[currentImageIndex]?.url || ""}
          alt={allImages[currentImageIndex]?.alt || ""}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
          hasPrevious={currentImageIndex > 0}
          hasNext={currentImageIndex < allImages.length - 1}
        />
      )}
    </div>
  )
}
