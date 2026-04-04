"use client"

import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"

interface Subsection {
  id: string
  title: string
  images: string[]
}

interface CarPhotographyCategory {
  label: string
  slug: string
  thumbnail: string
  description: string
  subsections: Subsection[]
}

interface CarPhotographySectionProps {
  category: CarPhotographyCategory
}

export default function CarPhotographySection({ category }: CarPhotographySectionProps) {
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

      {/* Clickable Thumbnails Grid - 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {category.subsections.map((subsection) => (
          <Link
            key={subsection.id}
            href={`/photography/${category.slug}/${subsection.id}`}
            className="group block"
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
              <Image
                src={subsection.images[0]}
                alt={subsection.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Subsection Label */}
            <h2
              className="transition-colors duration-200 group-hover:text-white"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                letterSpacing: "0.15em",
                color: "rgba(180, 175, 165, 0.85)",
              }}
            >
              {subsection.title}
            </h2>

            {/* Image count */}
            <p
              className="mt-1"
              style={{
                fontFamily: "var(--font-figtree), sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "rgba(180, 175, 165, 0.5)",
              }}
            >
              {subsection.images.length} images
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
