"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface ShelbyShowcaseProps {
  categoryLabel: string
  categorySlug: string
  images: string[]
}

export default function ShelbyShowcase({ categoryLabel, categorySlug, images }: ShelbyShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Navigation */}
      <div className="mb-8 pt-4">
        <Link
          href={`/photography/${categorySlug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(0, 140, 180, 0.9)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          BACK TO {categoryLabel}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10">
        <span
          className="text-xs tracking-[0.2em] mb-3 block"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(0, 140, 180, 0.8)",
          }}
        >
          {categoryLabel}
        </span>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl tracking-[0.08em]"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            color: "rgba(220, 220, 220, 0.95)",
          }}
        >
          SHELBY
        </h1>
        <p
          className="mt-4 text-sm max-w-xl leading-relaxed"
          style={{
            fontFamily: "var(--font-figtree), sans-serif",
            color: "rgba(180, 180, 180, 0.7)",
          }}
        >
          American muscle at its finest. The Shelby GT500 represents the pinnacle of Ford performance engineering.
        </p>
      </div>

      {/* Main Display Area */}
      <div className="relative mb-6 rounded-lg overflow-hidden bg-black/20">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src={images[selectedIndex]}
            alt={`Shelby GT500 - Image ${selectedIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            priority
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-black/70 hover:scale-110"
            aria-label="Previous image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-black/70 hover:scale-110"
            aria-label="Next image"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Counter */}
          <div
            className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-xs tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              color: "rgba(0, 180, 220, 0.9)",
            }}
          >
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-32 h-20 md:w-40 md:h-24 rounded-md overflow-hidden transition-all duration-300 ${
                selectedIndex === index
                  ? "ring-2 ring-[rgba(0,180,220,0.8)] scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Shelby GT500 thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="160px"
              />
              {selectedIndex === index && (
                <div className="absolute inset-0 bg-[rgba(0,140,180,0.1)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-12 pt-8 border-t border-white/10">
        <div className="flex flex-wrap gap-8">
          <div>
            <span
              className="text-xs tracking-[0.15em] block mb-1"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                color: "rgba(0, 140, 180, 0.7)",
              }}
            >
              VEHICLE
            </span>
            <span
              className="text-sm"
              style={{
                fontFamily: "var(--font-figtree), sans-serif",
                color: "rgba(200, 200, 200, 0.9)",
              }}
            >
              Shelby GT500
            </span>
          </div>
          <div>
            <span
              className="text-xs tracking-[0.15em] block mb-1"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                color: "rgba(0, 140, 180, 0.7)",
              }}
            >
              IMAGES
            </span>
            <span
              className="text-sm"
              style={{
                fontFamily: "var(--font-figtree), sans-serif",
                color: "rgba(200, 200, 200, 0.9)",
              }}
            >
              {images.length} Photos
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
