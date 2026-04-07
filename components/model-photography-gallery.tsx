"use client"

import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"

interface ModelPhotographyCategory {
  label: string
  slug: string
  thumbnail: string
  description: string
  images: string[]
}

interface ModelPhotographyGalleryProps {
  category: ModelPhotographyCategory
}

export default function ModelPhotographyGallery({ category }: ModelPhotographyGalleryProps) {
  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href="/photography" label="Photography" />

      {/* Page Header */}
      <header className="mb-12">
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
          {category.label}
        </h1>
      </header>

      {/* Large Image Gallery Grid */}
      <div className="columns-1 lg:columns-2 gap-6">
        {category.images.map((image, index) => {
          return (
            <div
              key={index}
              className="relative w-full overflow-hidden mb-6 break-inside-avoid group"
            >
              <Image
                src={image}
                alt={`${category.label} - Image ${index + 1}`}
                width={1200}
                height={1600}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
            </div>
          )
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-16 pt-8 border-t border-white/10">
        <Link
          href="/photography"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(200, 205, 215, 0.8)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          BACK TO PHOTOGRAPHY
        </Link>
      </div>
    </div>
  )
}
