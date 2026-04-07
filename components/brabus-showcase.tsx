"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"
import ImageLightbox from "@/components/image-lightbox"

interface BrabusShowcaseProps {
  categoryLabel: string
  categorySlug: string
  images: string[]
}

export default function BrabusShowcase({ categoryLabel, categorySlug, images }: BrabusShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href={`/photography/${categorySlug}`} label={categoryLabel} />

      {/* Page Header */}
      <header className="mb-8">
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "rgba(0, 210, 180, 0.7)",
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
          Brabus
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
          The Brabus Rocket 900 - an extreme Mercedes-AMG GT 63 S with 900 horsepower, featuring aggressive aero kit, signature teal accents, and bespoke carbon fiber details.
        </p>
      </header>

      {/* Main Display Area */}
      <div className="mb-6">
        <button
          onClick={() => setLightboxOpen(true)}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black/20 cursor-zoom-in group"
        >
          <Image
            src={images[selectedIndex]}
            alt={`Brabus Rocket 900 - Image ${selectedIndex + 1}`}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
          />
          {/* Image counter */}
          <div 
            className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {selectedIndex + 1} / {images.length}
          </div>
        </button>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        isOpen={lightboxOpen}
        imageUrl={images[selectedIndex]}
        alt={`Brabus Rocket 900 - Image ${selectedIndex + 1}`}
        onClose={() => setLightboxOpen(false)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={images.length > 1}
        hasNext={images.length > 1}
      />

      {/* Horizontal Scrollable Thumbnail Gallery */}
      <div className="mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 pb-2" style={{ minWidth: "min-content" }}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-24 h-16 md:w-32 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                selectedIndex === index
                  ? "ring-2 ring-[rgba(0,210,180,0.8)] ring-offset-2 ring-offset-black"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="128px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Arrows for Main Image */}
      <div className="flex justify-center gap-4 mb-16">
        <button
          onClick={handlePrevious}
          className="px-6 py-3 rounded-full border border-white/20 hover:border-[rgba(0,210,180,0.5)] hover:bg-[rgba(0,210,180,0.05)] transition-all duration-300"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "rgba(180, 175, 165, 0.8)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 rounded-full border border-white/20 hover:border-[rgba(0,210,180,0.5)] hover:bg-[rgba(0,210,180,0.05)] transition-all duration-300"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "rgba(180, 175, 165, 0.8)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="pt-8 border-t border-white/10 flex justify-between items-center">
        <Link
          href={`/photography/${categorySlug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(0, 210, 180, 0.8)",
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
