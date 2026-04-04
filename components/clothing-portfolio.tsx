"use client"

import Image from "next/image"
import Link from "next/link"
import { getAllClothingBrands } from "@/lib/clothing-data"
import BackButton from "@/components/back-button"

export default function ClothingPortfolio() {
  const brands = getAllClothingBrands()

  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href="/" label="Home" />

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
          Clothing
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
          Original clothing brand concepts featuring unique designs, branding, and fashion pieces.
        </p>
      </header>

      {/* Single Brand Thumbnail - Centered */}
      <div className="flex justify-center">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/clothing/${brand.slug}`}
            className="group block max-w-lg w-full"
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <Image
                src={brand.thumbnail}
                alt={brand.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 512px"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Brand Label */}
            <h2
              className="text-center transition-colors duration-200"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                letterSpacing: "0.15em",
                color: "rgba(180, 175, 165, 0.85)",
              }}
            >
              {brand.label}
            </h2>

            {/* Description */}
            <p
              className="mt-2 text-center"
              style={{
                fontFamily: "var(--font-figtree), sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: "rgba(180, 175, 165, 0.5)",
                lineHeight: 1.6,
              }}
            >
              {brand.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
