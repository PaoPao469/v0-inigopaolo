"use client"

import Image from "next/image"
import Link from "next/link"
import BackButton from "@/components/back-button"
import type { ClothingBrand, ClothingSection } from "@/lib/clothing-data"
import { useEffect, useRef, useState, useCallback } from "react"

interface ClothingSectionGalleryProps {
  brand: ClothingBrand
  section: ClothingSection
}

// Animated Image Card for Main Gallery
function AnimatedImageCard({
  image,
  index,
  alt,
}: {
  image: string
  index: number
  alt: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
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

  return (
    <div
      ref={cardRef}
      className="relative w-full overflow-hidden mb-6 break-inside-avoid group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isHovered
            ? `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg) scale(1.02)`
            : "perspective(1000px) scale(1)"
          : "translateY(60px) scale(0.95)",
        transition: isHovered
          ? "transform 0.15s ease-out, opacity 0.6s ease-out"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      <Image
        src={image}
        alt={alt}
        width={1200}
        height={1600}
        className="w-full h-auto object-contain transition-transform duration-500"
        style={{
          transform: isHovered
            ? `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)`
            : "translate(0, 0)",
        }}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Shine effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.1 : 0,
          background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
        }}
      />

      {/* Corner accents */}
      <div
        className="absolute top-4 left-4 pointer-events-none"
        style={{
          width: isHovered ? "24px" : "0px",
          height: "1px",
          background: "rgba(255, 255, 255, 0.4)",
          transition: "width 0.3s ease-out",
        }}
      />
      <div
        className="absolute top-4 left-4 pointer-events-none"
        style={{
          width: "1px",
          height: isHovered ? "24px" : "0px",
          background: "rgba(255, 255, 255, 0.4)",
          transition: "height 0.3s ease-out 0.1s",
        }}
      />
      <div
        className="absolute bottom-4 right-4 pointer-events-none"
        style={{
          width: isHovered ? "24px" : "0px",
          height: "1px",
          background: "rgba(255, 255, 255, 0.4)",
          transition: "width 0.3s ease-out",
        }}
      />
      <div
        className="absolute bottom-4 right-4 pointer-events-none"
        style={{
          width: "1px",
          height: isHovered ? "24px" : "0px",
          background: "rgba(255, 255, 255, 0.4)",
          transition: "height 0.3s ease-out 0.1s",
        }}
      />

      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
    </div>
  )
}

// Tech Pack Carousel with Next/Previous navigation
function TechPackCarousel({
  images,
  sectionLabel,
}: {
  images: string[]
  sectionLabel: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"next" | "prev" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200)
  }, [])

  const goToNext = useCallback(() => {
    if (isAnimating) return
    setDirection("next")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
      setIsAnimating(false)
    }, 400)
  }, [isAnimating, images.length])

  const goToPrev = useCallback(() => {
    if (isAnimating) return
    setDirection("prev")
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
      setIsAnimating(false)
    }, 400)
  }, [isAnimating, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "ArrowLeft") goToPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  const getSlideStyle = (index: number) => {
    const isActive = index === currentIndex
    const isPrev = index === (currentIndex - 1 + images.length) % images.length
    const isNext = index === (currentIndex + 1) % images.length

    if (isActive) {
      return {
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating
          ? direction === "next"
            ? "translateX(-100%) scale(0.9)"
            : "translateX(100%) scale(0.9)"
          : "translateX(0) scale(1)",
        zIndex: 10,
      }
    }

    if (isPrev) {
      return {
        opacity: isAnimating && direction === "prev" ? 1 : 0,
        transform: isAnimating && direction === "prev" ? "translateX(0) scale(1)" : "translateX(-100%) scale(0.9)",
        zIndex: isAnimating && direction === "prev" ? 10 : 5,
      }
    }

    if (isNext) {
      return {
        opacity: isAnimating && direction === "next" ? 1 : 0,
        transform: isAnimating && direction === "next" ? "translateX(0) scale(1)" : "translateX(100%) scale(0.9)",
        zIndex: isAnimating && direction === "next" ? 10 : 5,
      }
    }

    return {
      opacity: 0,
      transform: "translateX(100%) scale(0.9)",
      zIndex: 0,
    }
  }

  return (
    <div
      className="w-full"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
    >
      {/* Main Image Container */}
      <div className="relative w-full aspect-video bg-black/20 rounded-lg overflow-hidden mb-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 flex items-center justify-center"
            style={{
              ...getSlideStyle(index),
              transition: "opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src={image}
              alt={`${sectionLabel} - ${index + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              priority={index === currentIndex}
            />
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 z-20"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-50 z-20"
          style={{
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-8">
        {/* Previous Button */}
        <button
          onClick={goToPrev}
          disabled={isAnimating}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(200, 205, 215, 0.8)" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: "rgba(200, 205, 215, 0.8)",
            }}
          >
            PREVIOUS
          </span>
        </button>

        {/* Page Indicator */}
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div
            className="w-16 h-[1px]"
            style={{ background: "rgba(255, 255, 255, 0.2)" }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / images.length) * 100}%`,
                background: "rgba(255, 255, 255, 0.8)",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.05em",
              color: "rgba(200, 205, 215, 0.5)",
            }}
          >
            {String(images.length).padStart(2, "0")}
          </span>
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={isAnimating}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontSize: "12px",
              letterSpacing: "0.1em",
              color: "rgba(200, 205, 215, 0.8)",
            }}
          >
            NEXT
          </span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(200, 205, 215, 0.8)" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return
              setDirection(index > currentIndex ? "next" : "prev")
              setIsAnimating(true)
              setTimeout(() => {
                setCurrentIndex(index)
                setIsAnimating(false)
              }, 400)
            }}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background:
                index === currentIndex
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(255, 255, 255, 0.2)",
              transform: index === currentIndex ? "scale(1.3)" : "scale(1)",
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <p
        className="text-center mt-6"
        style={{
          fontFamily: "var(--font-figtree), sans-serif",
          fontSize: "11px",
          color: "rgba(200, 205, 215, 0.4)",
          letterSpacing: "0.05em",
        }}
      >
        Use arrow keys to navigate
      </p>
    </div>
  )
}

export default function ClothingSectionGallery({ brand, section }: ClothingSectionGalleryProps) {
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setHeaderVisible(true), 100)
  }, [])

  const isTechPack = section.isTechPack === true

  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href={`/clothing/${brand.slug}`} label={brand.label} />

      {/* Section Header */}
      <header
        className="mb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <p
          className="mb-2"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            letterSpacing: "0.15em",
            color: "rgba(200, 205, 215, 0.7)",
            textTransform: "uppercase",
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.2s",
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
            color: "rgba(255, 255, 255, 0.9)",
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
            color: "rgba(200, 205, 215, 0.5)",
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.3s",
          }}
        >
          {section.images.length} images
        </p>
      </header>

      {/* Conditional Layout based on section type */}
      {isTechPack ? (
        <TechPackCarousel images={section.images} sectionLabel={section.label} />
      ) : (
        <div className="columns-1 lg:columns-2 gap-6">
          {section.images.map((image, index) => (
            <AnimatedImageCard
              key={index}
              image={image}
              index={index}
              alt={`${section.label} - Image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="mt-20 pt-8 border-t border-white/10">
        <Link
          href={`/clothing/${brand.slug}`}
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(200, 205, 215, 0.8)",
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
