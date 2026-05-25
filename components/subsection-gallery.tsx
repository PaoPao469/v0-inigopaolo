"use client"

import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"
import { memo, useMemo } from "react"

interface Subsection {
  id: string
  title: string
  images: string[]
}

interface SubsectionGalleryProps {
  categoryLabel: string
  categorySlug: string
  subsection: Subsection
}

// Memoized gallery image for better performance
const GalleryImage = memo(function GalleryImage({
  image,
  title,
  index,
  aspectClass,
}: {
  image: string
  title: string
  index: number
  aspectClass: string
}) {
  return (
    <div
      className={`relative ${aspectClass} overflow-hidden rounded-lg mb-4 break-inside-avoid group`}
    >
      <Image
        src={image}
        alt={`${title} - Image ${index + 1}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={index === 0}
        loading={index < 6 ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
    </div>
  )
})

export default function SubsectionGallery({ categoryLabel, categorySlug, subsection }: SubsectionGalleryProps) {
  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href={`/photography/${categorySlug}`} label={categoryLabel} />

      {/* Page Header */}
      <header className="mb-12">
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "rgba(200, 205, 215, 0.7)",
            textTransform: "uppercase",
          }}
        >
          {categoryLabel}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "0.12em",
            color: "rgba(255, 255, 255, 0.9)",
            textTransform: "uppercase",
          }}
        >
          {subsection.title}
        </h1>
      </header>

      {/* Masonry-style Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {subsection.images.map((image, index) => {
          // Create varying aspect ratios for masonry effect
          const aspectClass = index % 3 === 0 
            ? "aspect-[3/4]" 
            : index % 3 === 1 
              ? "aspect-[4/3]" 
              : "aspect-square"
          
          return (
            <GalleryImage
              key={index}
              image={image}
              title={subsection.title}
              index={index}
              aspectClass={aspectClass}
            />
          )
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
        <Link
          href={`/photography/${categorySlug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(200, 205, 215, 0.8)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          BACK TO {categoryLabel}
        </Link>

        <Link
          href="/photography"
          className="text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(200, 205, 215, 0.6)",
          }}
        >
          ALL PHOTOGRAPHY
        </Link>
      </div>
    </div>
  )
}
