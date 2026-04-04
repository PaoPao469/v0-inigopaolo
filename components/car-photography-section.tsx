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

      {/* Subsections */}
      <div className="space-y-24">
        {category.subsections.map((subsection) => (
          <section key={subsection.id} id={subsection.id}>
            {/* Subsection Title */}
            <Link
              href={`/photography/${category.slug}/${subsection.id}`}
              className="inline-block mb-8 group"
            >
              <h2
                className="flex items-center gap-3 transition-colors duration-200 group-hover:text-white"
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  fontWeight: 500,
                  fontSize: "24px",
                  letterSpacing: "0.15em",
                  color: "rgba(180, 160, 120, 0.85)",
                }}
              >
                {subsection.title}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </h2>
            </Link>

            {/* Horizontal Scrollable Gallery */}
            <div className="relative -mx-6 md:-mx-12 lg:-mx-24">
              <div
                className="flex gap-4 overflow-x-auto px-6 md:px-12 lg:px-24 pb-4 scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {subsection.images.map((image, index) => (
                  <Link
                    key={index}
                    href={`/photography/${category.slug}/${subsection.id}`}
                    className="flex-shrink-0 group"
                  >
                    <div className="relative w-72 md:w-80 lg:w-96 aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${subsection.title} - Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
