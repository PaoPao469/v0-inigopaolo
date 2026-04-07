"use client"

import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"
import type { ClothingBrand } from "@/lib/clothing-data"

interface ClothingBrandDetailProps {
  brand: ClothingBrand
}

export default function ClothingBrandDetail({ brand }: ClothingBrandDetailProps) {
  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href="/clothing" label="Clothing" />

      {/* Brand Header */}
      <header className="mb-16">
        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "0.12em",
            color: "rgba(255, 255, 255, 0.9)",
            textTransform: "uppercase",
          }}
        >
          {brand.label}
        </h1>
        <p
          style={{
            fontFamily: "var(--font-figtree), sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            color: "rgba(200, 205, 215, 0.6)",
            maxWidth: "500px",
            lineHeight: 1.7,
          }}
        >
          {brand.description}
        </p>
      </header>

      {/* Section Thumbnails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {brand.sections.map((section) => (
          <Link
            key={section.id}
            href={`/clothing/${brand.slug}/${section.id}`}
            className="group block"
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
              <Image
                src={section.thumbnail}
                alt={section.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              
              {/* Label Overlay */}
              <div className="absolute inset-0 flex items-end p-6">
                <h2
                  className="transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-chillax), sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    letterSpacing: "0.15em",
                    color: "rgba(255, 255, 255, 0.95)",
                    textTransform: "uppercase",
                    textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                >
                  {section.label}
                </h2>
              </div>
            </div>

            {/* Image Count */}
            <p
              className="text-center"
              style={{
                fontFamily: "var(--font-figtree), sans-serif",
                fontWeight: 400,
                fontSize: "12px",
                color: "rgba(200, 205, 215, 0.5)",
                letterSpacing: "0.08em",
              }}
            >
              {section.images.length} IMAGES
            </p>
          </Link>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-20 pt-8 border-t border-white/10">
        <Link
          href="/clothing"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(200, 205, 215, 0.8)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          BACK TO CLOTHING
        </Link>
      </div>
    </div>
  )
}
