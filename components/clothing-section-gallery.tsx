"use client"

import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"
import type { ClothingBrand, ClothingSection } from "@/lib/clothing-data"

interface ClothingSectionGalleryProps {
  brand: ClothingBrand
  section: ClothingSection
}

export default function ClothingSectionGallery({ brand, section }: ClothingSectionGalleryProps) {
  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href={`/clothing/${brand.slug}`} label={brand.label} />

      {/* Section Header */}
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
          {brand.label}
        </p>
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
          {section.label}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-figtree), sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "rgba(180, 175, 165, 0.5)",
          }}
        >
          {section.images.length} images
        </p>
      </header>

      {/* Masonry-style Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {section.images.map((image, index) => {
          // Create varying aspect ratios for masonry effect
          const aspectClass = index % 3 === 0 
            ? "aspect-[3/4]" 
            : index % 3 === 1 
              ? "aspect-[4/3]" 
              : "aspect-square"
          
          return (
            <div
              key={index}
              className={`relative ${aspectClass} overflow-hidden rounded-lg mb-4 break-inside-avoid group`}
            >
              <Image
                src={image}
                alt={`${section.label} - Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
            </div>
          )
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-20 pt-8 border-t border-white/10">
        <Link
          href={`/clothing/${brand.slug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 160, 120, 0.8)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          BACK TO {brand.label}
        </Link>
      </div>
    </div>
  )
}
