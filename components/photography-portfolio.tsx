"use client"

import Image from "next/image"
import Link from "next/link"
import { photographyData } from "@/lib/photography-data"
import BackButton from "@/components/back-button"

export default function PhotographyPortfolio() {
  const categories = Object.values(photographyData)

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
          Photography
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
          A collection of automotive and portrait photography, exploring light, composition, and creative direction.
        </p>
      </header>

      {/* Category Thumbnails Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/photography/${category.slug}`}
            className="group block"
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
              <Image
                src={category.thumbnail}
                alt={category.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            {/* Category Label */}
            <h2
              className="transition-colors duration-200"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                fontSize: "18px",
                letterSpacing: "0.15em",
                color: "rgba(180, 175, 165, 0.85)",
              }}
            >
              {category.label}
            </h2>

            {/* Description */}
            <p
              className="mt-2"
              style={{
                fontFamily: "var(--font-figtree), sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                color: "rgba(180, 175, 165, 0.5)",
                lineHeight: 1.6,
              }}
            >
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
