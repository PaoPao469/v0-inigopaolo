"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { getProjectColorTheme } from "@/lib/architecture-data"
import ImageLightbox from "./image-lightbox"

interface ImageSection {
  label: string
  images: string[]
  isHeroFirst?: boolean
  gridLayout?: "hero-3x3"
  preserveHeroAspect?: boolean
  isMosaic?: boolean
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
  const backHref = "/architecture"
  const backLabel = "BACK TO PROJECTS"

  // Get project-specific color theme
  const colorTheme = getProjectColorTheme(project.id)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
  const goToPrevious = () => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev))
  const goToNext = () => setCurrentImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : prev))

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

  // Desktop-first sections mapping for specific projects
  const desktopFirstSectionMap: Record<string, string> = {
    'seaside-house': 'Minecraft Render',
    'the-exhibit': 'Rhino Renders',
    'marina-vista-raceway': 'Drawings',
  }
  
  const desktopFirstSection = desktopFirstSectionMap[project.id]
  
  const getDesktopSections = () => {
    if (!project.imageSections || !desktopFirstSection) return project.imageSections || []
    const priorityIndex = project.imageSections.findIndex(s => s.label === desktopFirstSection)
    if (priorityIndex === -1) return project.imageSections
    const reordered = [...project.imageSections]
    const [prioritySection] = reordered.splice(priorityIndex, 1)
    return [prioritySection, ...reordered]
  }
  
  const mobileSections = project.imageSections || []
  const desktopSections = getDesktopSections()

  const renderSection = (section: ImageSection, sectionIndex: number) => {
    const hasHeroFirst = section.isHeroFirst === true
    const hasHeroGrid = section.gridLayout === "hero-3x3"
    const isSingleImage = section.images.length === 1
    const isFirstSection = sectionIndex === 0
    const preserveAspect = section.preserveHeroAspect === true
    const isTwoImages = section.images.length === 2
    const isChosenImageSection = section.label.toLowerCase().includes('chosen')
    const isMosaic = section.isMosaic === true
    
    // Determine hero aspect ratio and object fit based on preserveHeroAspect flag
    const heroAspectClass = preserveAspect ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[21/9] lg:aspect-[2.5/1]"
    const heroObjectFit = preserveAspect ? "object-contain" : "object-cover"
    
    return (
      <div key={`${section.label}-${sectionIndex}`} className="space-y-8">
        {/* Section Label - Minimal, elegant */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 max-w-[40px]" style={{ backgroundColor: colorTheme.accent }} />
          <h3 className="text-[10px] tracking-[0.25em] uppercase" style={{ fontFamily: "var(--font-chillax), sans-serif", color: colorTheme.accent, fontWeight: 500 }}>
            {section.label}
          </h3>
        </div>
        
        {hasHeroGrid ? (
          <div className="space-y-3">
            {/* Hero highlight - prominent with visual distinction */}
            <button 
              onClick={() => openLightbox(section.images[0])} 
              className="group relative w-full overflow-hidden cursor-zoom-in focus:outline-none"
            >
              <div className={`relative ${heroAspectClass}`}>
                <Image 
                  src={section.images[0]} 
                  alt={`${project.title} ${project.titleAccent} - ${section.label} 1`} 
                  fill 
                  className={`${heroObjectFit} transition-all duration-700 group-hover:scale-[1.02]`} 
                  priority={isFirstSection} 
                  sizes="(max-width: 768px) 100vw, 1600px" 
                />
              </div>
              {/* Subtle frame indicator for hero */}
              <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-sm" style={{ color: colorTheme.primary, fontFamily: "var(--font-chillax), sans-serif" }}>View Full</span>
              </div>
            </button>
            
            {/* Thumbnail grid - clean organized layout */}
            {section.images.length > 1 && (
              <div className={`grid gap-3 ${
                section.images.length - 1 <= 3 
                  ? "grid-cols-3" 
                  : section.images.length - 1 <= 4 
                    ? "grid-cols-2 md:grid-cols-4" 
                    : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              }`}>
                {section.images.slice(1).map((image, imageIndex) => (
                  <button 
                    key={imageIndex} 
                    onClick={() => openLightbox(image)} 
                    className="group relative overflow-hidden cursor-zoom-in focus:outline-none opacity-80 hover:opacity-100 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image 
                        src={image} 
                        alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 2}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        sizes="(max-width: 768px) 33vw, 25vw" 
                      />
                    </div>
                    <div className="absolute inset-0 border border-white/[0.02] pointer-events-none" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : hasHeroFirst ? (
          <div className="space-y-3">
            {/* Hero highlight - cinematic wide format or preserved aspect */}
            <button 
              onClick={() => openLightbox(section.images[0])} 
              className="group relative w-full overflow-hidden cursor-zoom-in focus:outline-none"
            >
              <div className={`relative ${heroAspectClass}`}>
                <Image 
                  src={section.images[0]} 
                  alt={`${project.title} ${project.titleAccent} - ${section.label} 1`} 
                  fill 
                  className={`${heroObjectFit} transition-all duration-700 group-hover:scale-[1.02]`} 
                  priority={isFirstSection} 
                  sizes="(max-width: 1800px) 100vw, 1800px" 
                />
              </div>
              <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-sm" style={{ color: colorTheme.primary, fontFamily: "var(--font-chillax), sans-serif" }}>View Full</span>
              </div>
            </button>
            
            {/* Thumbnail strip - clean organized grid */}
            {section.images.length > 1 && (
              <div className={`grid gap-3 ${
                section.images.length - 1 <= 3 
                  ? "grid-cols-3" 
                  : section.images.length - 1 <= 4 
                    ? "grid-cols-2 md:grid-cols-4" 
                    : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              }`}>
                {section.images.slice(1).map((image, imageIndex) => (
                  <button 
                    key={imageIndex} 
                    onClick={() => openLightbox(image)} 
                    className="group relative overflow-hidden cursor-zoom-in focus:outline-none opacity-80 hover:opacity-100 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image 
                        src={image} 
                        alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 2}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        sizes="(max-width: 768px) 33vw, 25vw" 
                      />
                    </div>
                    <div className="absolute inset-0 border border-white/[0.02] pointer-events-none" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : isSingleImage ? (
          /* Single image - full prominence, full width when preserveAspect is true */
          <button 
            onClick={() => openLightbox(section.images[0])} 
            className={`group relative w-full overflow-hidden cursor-zoom-in focus:outline-none ${preserveAspect ? "" : "max-w-4xl mx-auto"}`}
          >
            <div className={`relative ${preserveAspect ? "aspect-[4/3] lg:aspect-[16/10]" : "aspect-[16/9]"}`}>
              <Image 
                src={section.images[0]} 
                alt={`${project.title} ${project.titleAccent} - ${section.label} 1`} 
                fill 
                className={`${preserveAspect ? "object-contain" : "object-cover"} transition-all duration-700 group-hover:scale-[1.02]`} 
                priority={isFirstSection} 
                sizes="(max-width: 1800px) 100vw, 1800px" 
              />
            </div>
            <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-sm" style={{ color: colorTheme.primary, fontFamily: "var(--font-chillax), sans-serif" }}>View Full</span>
            </div>
          </button>
        ) : isTwoImages && isChosenImageSection ? (
          /* Two images side by side - elegant paired layout for "Chosen Image" sections */
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Primary chosen image - larger, preserved aspect */}
            <button 
              onClick={() => openLightbox(section.images[0])} 
              className="group relative flex-1 lg:flex-[2] overflow-hidden cursor-zoom-in focus:outline-none"
            >
              <div className="relative aspect-[4/3]">
                <Image 
                  src={section.images[0]} 
                  alt={`${project.title} ${project.titleAccent} - ${section.label} 1`} 
                  fill 
                  className="object-contain transition-all duration-700 group-hover:scale-[1.02]" 
                  priority={isFirstSection} 
                  sizes="(max-width: 768px) 100vw, 66vw" 
                />
              </div>
              <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-sm" style={{ color: colorTheme.primary, fontFamily: "var(--font-chillax), sans-serif" }}>View Full</span>
              </div>
            </button>
            {/* Secondary image - smaller, complementary */}
            <button 
              onClick={() => openLightbox(section.images[1])} 
              className="group relative flex-1 overflow-hidden cursor-zoom-in focus:outline-none opacity-85 hover:opacity-100 transition-opacity duration-300"
            >
              <div className="relative aspect-[4/3]">
                <Image 
                  src={section.images[1]} 
                  alt={`${project.title} ${project.titleAccent} - ${section.label} 2`} 
                  fill 
                  className="object-contain transition-all duration-700 group-hover:scale-[1.02]" 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                />
              </div>
              <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
            </button>
          </div>
        ) : isMosaic ? (
          /* Mosaic grid layout with varied sizes */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {section.images.map((image, imageIndex) => {
              // Create varied sizes for mosaic effect
              const mosaicPatterns = [
                "col-span-2 row-span-2", // large
                "col-span-1 row-span-1", // small
                "col-span-1 row-span-1", // small
                "col-span-1 row-span-2", // tall
                "col-span-2 row-span-1", // wide
                "col-span-1 row-span-1", // small
                "col-span-1 row-span-1", // small
                "col-span-2 row-span-1", // wide
                "col-span-1 row-span-2", // tall
                "col-span-1 row-span-1", // small
              ]
              const pattern = mosaicPatterns[imageIndex % mosaicPatterns.length]
              
              return (
                <button 
                  key={imageIndex}
                  onClick={() => openLightbox(image)} 
                  className={`group relative overflow-hidden cursor-zoom-in focus:outline-none ${pattern}`}
                >
                  <div className="relative w-full h-full min-h-[180px] md:min-h-[220px]">
                    <Image 
                      src={image} 
                      alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 1}`} 
                      fill 
                      className="object-cover transition-all duration-700 group-hover:scale-[1.02]" 
                      priority={isFirstSection && imageIndex === 0} 
                      sizes="(max-width: 768px) 50vw, 33vw" 
                    />
                  </div>
                  <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[9px] tracking-[0.2em] uppercase px-2 py-1 bg-black/60 backdrop-blur-sm" style={{ color: colorTheme.primary, fontFamily: "var(--font-chillax), sans-serif" }}>View</span>
                  </div>
                </button>
              )
            })}
          </div>
        ) : isTwoImages ? (
          /* Two images - balanced side by side */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.images.map((image, imageIndex) => (
              <button 
                key={imageIndex}
                onClick={() => openLightbox(image)} 
                className="group relative overflow-hidden cursor-zoom-in focus:outline-none"
              >
                <div className={`relative ${preserveAspect ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
                  <Image 
                    src={image} 
                    alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 1}`} 
                    fill 
                    className={`${preserveAspect ? "object-contain" : "object-cover"} transition-all duration-700 group-hover:scale-[1.02]`} 
                    priority={isFirstSection && imageIndex === 0} 
                    sizes="(max-width: 768px) 100vw, 50vw" 
                  />
                </div>
                <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-sm" style={{ color: colorTheme.primary, fontFamily: "var(--font-chillax), sans-serif" }}>View Full</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Multi-image grid with first image as hero */
          <div className="space-y-3">
            {/* First image as hero */}
            <button 
              onClick={() => openLightbox(section.images[0])} 
              className="group relative w-full overflow-hidden cursor-zoom-in focus:outline-none"
            >
              <div className={`relative ${heroAspectClass}`}>
                <Image 
                  src={section.images[0]} 
                  alt={`${project.title} ${project.titleAccent} - ${section.label} 1`} 
                  fill 
                  className={`${heroObjectFit} transition-all duration-700 group-hover:scale-[1.02]`} 
                  priority={isFirstSection} 
                  sizes="(max-width: 1800px) 100vw, 1800px" 
                />
              </div>
              <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-sm" style={{ color: colorTheme.primary, fontFamily: "var(--font-chillax), sans-serif" }}>View Full</span>
              </div>
            </button>
            
            {/* Remaining as thumbnails - clean grid layout */}
            {section.images.length > 1 && (
              <div className={`grid gap-3 ${
                section.images.length - 1 <= 3 
                  ? "grid-cols-3" 
                  : section.images.length - 1 <= 4 
                    ? "grid-cols-2 md:grid-cols-4" 
                    : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              }`}>
                {section.images.slice(1).map((image, imageIndex) => (
                  <button 
                    key={imageIndex} 
                    onClick={() => openLightbox(image)} 
                    className="group relative overflow-hidden cursor-zoom-in focus:outline-none opacity-80 hover:opacity-100 transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image 
                        src={image} 
                        alt={`${project.title} ${project.titleAccent} - ${section.label} ${imageIndex + 2}`} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        sizes="(max-width: 768px) 33vw, 25vw" 
                      />
                    </div>
                    <div className="absolute inset-0 border border-white/[0.02] pointer-events-none" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-[1800px] mx-auto">
      <div className="mb-6 pt-4">
        <Link href={backHref} className="inline-flex items-center gap-2 text-[11px] tracking-[0.15em] transition-opacity hover:opacity-70 w-fit" style={{ fontFamily: "var(--font-chillax), sans-serif", color: colorTheme.secondary }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          {backLabel}
        </Link>
      </div>

      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="flex items-baseline gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-chillax), sans-serif", fontWeight: 600, color: "rgba(255, 255, 255, 0.95)", letterSpacing: "0.02em", lineHeight: 1.1 }}>
              {project.title} <span style={{ fontWeight: 400, opacity: 0.7 }}>{project.titleAccent}</span>
            </h1>
          </div>
          <span className="text-[10px] tracking-[0.2em]" style={{ fontFamily: "var(--font-chillax), sans-serif", color: colorTheme.accent }}>{project.category}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {descriptionSections.map((section, idx) => (
            <div key={idx} className="space-y-3">
              {section.title && <h3 className="text-sm tracking-[0.12em] uppercase" style={{ fontFamily: "var(--font-chillax), sans-serif", color: colorTheme.primary, fontWeight: 500 }}>{section.title}</h3>}
              <p className="text-sm md:text-base leading-relaxed" style={{ fontFamily: "var(--font-figtree), sans-serif", color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.9 }}>{section.content || section.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-16 lg:max-w-[85%] lg:mx-auto xl:max-w-[80%]">
        {project.imageSections && project.imageSections.length > 0 ? (
          <>
            <div className="lg:hidden space-y-16">
              {mobileSections.map((section, idx) => renderSection(section, idx))}
            </div>
            <div className="hidden lg:block space-y-16">
              {desktopSections.map((section, idx) => renderSection(section, idx))}
            </div>
          </>
        ) : (
          <div className="space-y-3">
            {/* Hero image - first image prominently displayed */}
            {project.images[0] && (
              <button 
                onClick={() => openLightbox(project.images[0])} 
                className="group relative w-full overflow-hidden cursor-zoom-in focus:outline-none"
              >
                <div className="relative aspect-[21/9] lg:aspect-[2.5/1]">
                  <Image 
                    src={project.images[0]} 
                    alt={`${project.title} ${project.titleAccent} - Image 1`} 
                    fill 
                    className="object-cover transition-all duration-700 group-hover:scale-[1.02]" 
                    priority 
                    sizes="(max-width: 1800px) 100vw, 1800px" 
                  />
                </div>
                <div className="absolute inset-0 border border-white/[0.03] pointer-events-none" />
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 bg-black/60 backdrop-blur-sm" style={{ color: colorTheme.primary, fontFamily: "var(--font-chillax), sans-serif" }}>View Full</span>
                </div>
              </button>
            )}
            
            {/* Thumbnails - smaller, clearly secondary */}
            {project.images.length > 1 && (
              <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
                {project.images.slice(1).map((image, index) => (
                  <button 
                    key={index} 
                    onClick={() => openLightbox(image)} 
                    className="group relative overflow-hidden cursor-zoom-in focus:outline-none opacity-70 hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="relative aspect-square">
                      <Image 
                        src={image} 
                        alt={`${project.title} ${project.titleAccent} - Image ${index + 2}`} 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 768px) 25vw, 16vw" 
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-20 mb-12 pt-8 border-t border-white/5 flex justify-center">
        <Link href={backHref} className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70" style={{ fontFamily: "var(--font-chillax), sans-serif", color: colorTheme.accent }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          {backLabel}
        </Link>
      </div>

      {allImages.length > 0 && (
        <ImageLightbox isOpen={lightboxOpen} imageUrl={allImages[currentImageIndex]?.url || ""} alt={allImages[currentImageIndex]?.alt || ""} onClose={closeLightbox} onPrevious={goToPrevious} onNext={goToNext} hasPrevious={currentImageIndex > 0} hasNext={currentImageIndex < allImages.length - 1} />
      )}
    </div>
  )
}
