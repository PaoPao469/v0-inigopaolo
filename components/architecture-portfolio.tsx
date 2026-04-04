"use client"

import Image from "next/image"
import Link from "next/link"
import { portfolioData } from "@/lib/architecture-data"

// Year thumbnail card for main architecture page
interface YearCardProps {
  slug: string
  label: string
  thumbnail: string
  projectCount: number
}

function YearCard({ slug, label, thumbnail, projectCount }: YearCardProps) {
  return (
    <Link
      href={`/architecture/${slug}`}
      className="group block relative overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={thumbnail}
          alt={label}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl mb-3 transition-transform duration-300 group-hover:scale-105"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "rgba(255, 255, 255, 0.95)",
            }}
          >
            {label}
          </h2>
          <p
            className="text-xs tracking-[0.2em]"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              color: "rgba(180, 160, 120, 0.9)",
            }}
          >
            {projectCount} {projectCount === 1 ? "PROJECT" : "PROJECTS"}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default function ArchitecturePortfolio() {
  const years = Object.values(portfolioData)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-16 md:mb-24 pt-8">
        <h1
          className="text-3xl md:text-4xl lg:text-5xl mb-4"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 600,
            letterSpacing: "0.15em",
            color: "rgba(255, 255, 255, 0.95)",
          }}
        >
          ARCHITECTURE
        </h1>
        <p
          className="text-xs tracking-[0.25em]"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(180, 175, 165, 0.45)",
          }}
        >
          SELECT A COLLECTION
        </p>
      </div>

      {/* Year Thumbnails Grid - Only 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {years.map((year) => (
          <YearCard
            key={year.slug}
            slug={year.slug}
            label={year.label}
            thumbnail={year.thumbnail}
            projectCount={year.projects.length}
          />
        ))}
      </div>
    </div>
  )
}
