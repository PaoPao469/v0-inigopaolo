"use client"

import Image from "next/image"
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
      <header className="mb-16">
        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "0.12em",
            color: "rgba(180, 175, 165, 0.82)",
            textTransform: "uppercase",
          }}
        >
          {category.label}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-figtree), sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "rgba(180, 175, 165, 0.6)",
            maxWidth: "500px",
            lineHeight: 1.7,
          }}
        >
          {category.description}
        </p>
      </header>

      {/* Scrollable Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {category.images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-[4/5] overflow-hidden rounded-lg group"
          >
            <Image
              src={image}
              alt={`${category.label} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-16 pt-8 border-t border-white/10">
        <BackButton href="/photography" label="Back to Photography" />
      </div>
    </div>
  )
}
