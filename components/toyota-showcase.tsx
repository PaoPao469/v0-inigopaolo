"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"
import ImageLightbox from "@/components/image-lightbox"

interface ToyotaShowcaseProps {
  categoryLabel: string
  categorySlug: string
  images: string[]
}

export default function ToyotaShowcase({ categoryLabel, categorySlug, images }: ToyotaShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setLightboxOpen(true)
  }

  const handlePrevious = () => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1))
  }

  const handleNext = () => {
    if (selectedIndex === null) return
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : (prev ?? 0) + 1))
  }

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
            color: "rgba(120, 140, 160, 0.7)",
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
          Toyota
        </h1>
        <p
          className="mt-3 max-w-2xl"
          style={{
            fontFamily: "var(--font-figtree), sans-serif",
            fontWeight: 300,
            fontSize: "14px",
            lineHeight: 1.7,
            color: "rgba(180, 175, 165, 0.6)",
          }}
        >
          The legendary Toyota Supra MK4 - an iconic JDM sports car captured through cinematic automotive photography, showcasing its timeless design and aggressive stance.
        </p>
      </header>

      {/* Masonry Grid Gallery */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 mb-16">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(index)}
            className="relative w-full overflow-hidden rounded-lg cursor-zoom-in group block"
          >
            <Image
              src={image}
              alt={`Toyota Supra MK4 - Image ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <ImageLightbox
          isOpen={lightboxOpen}
          imageUrl={images[selectedIndex]}
          alt={`Toyota Supra MK4 - Image ${selectedIndex + 1}`}
          onClose={() => {
            setLightboxOpen(false)
            setSelectedIndex(null)
          }}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={images.length > 1}
          hasNext={images.length > 1}
        />
      )}

      {/* Bottom Navigation */}
      <div className="pt-8 border-t border-white/10 flex justify-between items-center">
        <Link
          href={`/photography/${categorySlug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(120, 140, 160, 0.8)",
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
