"use client"

import Image from "next/image"
import BackButton from "@/components/back-button"
import type { ClothingBrand, ClothingSection } from "@/lib/clothing-data"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface ClothingBrandDetailProps {
  brand: ClothingBrand
}

function SectionCard({
  section,
  brandSlug,
  index,
  onSelect,
  isSelected,
  isOtherSelected,
}: {
  section: ClothingSection
  brandSlug: string
  index: number
  onSelect: (id: string) => void
  isSelected: boolean
  isOtherSelected: boolean
}) {
  const router = useRouter()
  const cardRef = useRef<HTMLButtonElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onSelect(section.id)
    setTimeout(() => {
      router.push(`/clothing/${brandSlug}/${section.id}`)
    }, 600)
  }

  const getTransform = () => {
    if (isSelected) {
      return "perspective(1000px) scale(1.08) translateY(-10px)"
    }
    if (isOtherSelected) {
      return "perspective(1000px) scale(0.95) translateY(10px)"
    }
    if (isHovered) {
      return `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg) scale(1.03)`
    }
    return "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)"
  }

  const getOpacity = () => {
    if (!isVisible) return 0
    if (isSelected) return 1
    if (isOtherSelected) return 0.3
    return 1
  }

  return (
    <button
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group block text-left w-full"
      style={{
        opacity: getOpacity(),
        transform: isVisible ? getTransform() : "translateY(80px) scale(0.92) rotateX(10deg)",
        transition: isSelected || isOtherSelected
          ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out"
          : isHovered
          ? "transform 0.12s ease-out, opacity 0.6s ease-out"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out",
        transformStyle: "preserve-3d",
        filter: isOtherSelected ? "blur(2px)" : "none",
      }}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4">
        <Image
          src={section.thumbnail}
          alt={section.label}
          fill
          className="object-cover transition-transform duration-500"
          style={{
            transform: isHovered
              ? `scale(1.08) translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
              : "scale(1)",
          }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, rgba(0,0,0,${isHovered ? 0.7 : 0.5}) 0%, rgba(0,0,0,${isHovered ? 0.2 : 0.1}) 50%, transparent 100%)`,
          }}
        />

        {/* Shine effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.15 : 0,
            background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />

        {/* Corner accents */}
        <div
          className="absolute top-3 left-3 pointer-events-none"
          style={{
            width: isHovered ? "28px" : "0px",
            height: "1px",
            background: "rgba(255, 255, 255, 0.5)",
            transition: "width 0.4s ease-out",
          }}
        />
        <div
          className="absolute top-3 left-3 pointer-events-none"
          style={{
            width: "1px",
            height: isHovered ? "28px" : "0px",
            background: "rgba(255, 255, 255, 0.5)",
            transition: "height 0.4s ease-out 0.1s",
          }}
        />
        <div
          className="absolute bottom-3 right-3 pointer-events-none"
          style={{
            width: isHovered ? "28px" : "0px",
            height: "1px",
            background: "rgba(255, 255, 255, 0.5)",
            transition: "width 0.4s ease-out",
          }}
        />
        <div
          className="absolute bottom-3 right-3 pointer-events-none"
          style={{
            width: "1px",
            height: isHovered ? "28px" : "0px",
            background: "rgba(255, 255, 255, 0.5)",
            transition: "height 0.4s ease-out 0.1s",
          }}
        />

        {/* Label Overlay */}
        <div className="absolute inset-0 flex items-end p-6">
          <h2
            className="transition-all duration-300"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              letterSpacing: isHovered ? "0.2em" : "0.15em",
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
        className="text-center transition-all duration-300"
        style={{
          fontFamily: "var(--font-figtree), sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          color: isHovered ? "rgba(200, 205, 215, 0.8)" : "rgba(200, 205, 215, 0.5)",
          letterSpacing: "0.08em",
        }}
      >
        {section.images.length} IMAGES
      </p>
    </button>
  )
}

export default function ClothingBrandDetail({ brand }: ClothingBrandDetailProps) {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100)
  }, [])

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24 relative">
      {/* Black overlay that fades in when a section is selected */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: "#000000",
          opacity: selectedId ? 1 : 0,
          transition: "opacity 0.5s ease-out",
        }}
      />

      <div className="relative z-10">
        <BackButton href="/clothing" label="Clothing" />

        {/* Brand Header */}
        <header
          className="mb-16"
          style={{
            opacity: selectedId ? 0 : headerVisible ? 1 : 0,
            transform: selectedId ? "translateY(-20px)" : headerVisible ? "translateY(0)" : "translateY(-30px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <h1
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
        </header>

        {/* Section Thumbnails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {brand.sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              brandSlug={brand.slug}
              index={index}
              onSelect={handleSelect}
              isSelected={selectedId === section.id}
              isOtherSelected={selectedId !== null && selectedId !== section.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
