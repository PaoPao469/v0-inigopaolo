"use client"

import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"

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

export default function SubsectionGallery({ categoryLabel, categorySlug, subsection }: SubsectionGalleryProps) {
  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href={`/photography/${categorySlug}`} label={categoryLabel} />

      {/* Page Header */}
      <header className="mb-16">
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "rgba(180, 160, 120, 0.7)",
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
            color: "rgba(180, 175, 165, 0.82)",
            textTransform: "uppercase",
          }}
        >
          {subsection.title}
        </h1>
      </header>

      {/* Full Gallery */}
      <div className="space-y-6">
        {subsection.images.map((image, index) => (
          <div
            key={index}
            className="relative w-full aspect-[16/10] overflow-hidden rounded-lg"
          >
            <Image
              src={image}
              alt={`${subsection.title} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
        <Link
          href={`/photography/${categorySlug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 160, 120, 0.8)",
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
            color: "rgba(180, 175, 165, 0.6)",
          }}
        >
          ALL PHOTOGRAPHY
        </Link>
      </div>
    </div>
  )
}
