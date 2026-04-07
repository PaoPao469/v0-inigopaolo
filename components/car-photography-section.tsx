"use client"

import Image from "next/image"
import BackButton from "@/components/back-button"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

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

function CarGalleryCard({ 
  subsection, 
  categorySlug, 
  index,
  onSelect,
  isSelected,
  isOtherSelected
}: { 
  subsection: Subsection
  categorySlug: string
  index: number
  onSelect: (id: string) => void
  isSelected: boolean
  isOtherSelected: boolean
}) {
  const router = useRouter()
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Staggered delay based on index for cascade effect
          setTimeout(() => {
            setIsVisible(true)
          }, index * 120)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  // Parallax tilt effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  // Handle card selection with animation before navigation
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onSelect(subsection.id)
    
    // Navigate after animation completes
    setTimeout(() => {
      router.push(`/photography/${categorySlug}/${subsection.id}`)
    }, 600)
  }

  // Calculate transform based on mouse position and selection state
  const getTransform = () => {
    if (isSelected) {
      return "perspective(1000px) scale(1.08) translateY(-10px)"
    }
    if (isOtherSelected) {
      return "perspective(1000px) scale(0.95) translateY(10px)"
    }
    if (isHovered) {
      return `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg) scale(1.03)`
    }
    return "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)"
  }

  // Calculate opacity based on selection state
  const getOpacity = () => {
    if (!isVisible) return 0
    if (isSelected) return 1
    if (isOtherSelected) return 0.3
    return 1
  }

  return (
    <button
      ref={cardRef as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
      className="group block text-left w-full"
      onMouseMove={handleMouseMove as unknown as React.MouseEventHandler<HTMLButtonElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: getOpacity(),
        transform: isVisible
          ? getTransform()
          : "translateY(80px) scale(0.92) rotateX(10deg)",
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
      <div 
        className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4"
        style={{
          boxShadow: isHovered 
            ? "0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(180, 175, 165, 0.1)"
            : "0 15px 35px -10px rgba(0, 0, 0, 0.35)",
          transition: "box-shadow 0.4s ease-out",
        }}
      >
        {/* Main Image with parallax effect */}
        <div
          className="absolute inset-0"
          style={{
            transform: isHovered
              ? `scale(1.15) translate(${-mousePosition.x * 12}px, ${-mousePosition.y * 12}px)`
              : "scale(1) translate(0px, 0px)",
            transition: isHovered
              ? "transform 0.12s ease-out"
              : "transform 0.5s ease-out",
          }}
        >
          <Image
            src={subsection.images[0]}
            alt={subsection.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Gradient overlay that intensifies on hover */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 40%, rgba(0,0,0,0.05) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 50%)",
            transition: "background 0.4s ease-out",
          }}
        />

        {/* Shine/spotlight effect following cursor */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(255,255,255,0.2) 0%, transparent 45%)`
              : "none",
            transition: "opacity 0.3s ease-out",
          }}
        />

        {/* Corner accent lines that animate on hover */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: isHovered ? "70px" : "0px",
            height: "2px",
            background: "linear-gradient(90deg, rgba(180, 175, 165, 0.8), transparent)",
            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isHovered ? "0.1s" : "0s",
          }}
        />
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: "2px",
            height: isHovered ? "70px" : "0px",
            background: "linear-gradient(180deg, rgba(180, 175, 165, 0.8), transparent)",
            transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isHovered ? "0.1s" : "0s",
          }}
        />

        {/* Bottom right corner accent */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: isHovered ? "70px" : "0px",
            height: "2px",
            background: "linear-gradient(270deg, rgba(180, 175, 165, 0.8), transparent)",
            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isHovered ? "0.15s" : "0s",
          }}
        />
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: "2px",
            height: isHovered ? "70px" : "0px",
            background: "linear-gradient(0deg, rgba(180, 175, 165, 0.8), transparent)",
            transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: isHovered ? "0.15s" : "0s",
          }}
        />

        {/* Image count badge */}
        <div
          className="absolute top-3 right-3"
          style={{
            opacity: isHovered ? 1 : 0.7,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          <span
            className="px-2.5 py-1 backdrop-blur-md rounded-full text-[10px] tracking-[0.1em]"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              color: "rgba(255, 255, 255, 0.9)",
              background: "rgba(0, 0, 0, 0.4)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {subsection.images.length}
          </span>
        </div>
      </div>

      {/* Subsection Label with animated underline */}
      <div className="relative inline-block overflow-hidden">
        <h2
          className="transition-colors duration-200"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            letterSpacing: isHovered ? "0.2em" : "0.15em",
            color: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(180, 175, 165, 0.85)",
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
            transition: "letter-spacing 0.4s ease-out, color 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          {subsection.title}
        </h2>
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            left: 0,
            width: isHovered ? "100%" : "0%",
            height: "1px",
            background: "rgba(180, 175, 165, 0.5)",
            transition: "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Image count text */}
      <p
        className="mt-1"
        style={{
          fontFamily: "var(--font-figtree), sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          color: isHovered ? "rgba(180, 175, 165, 0.7)" : "rgba(180, 175, 165, 0.5)",
          transform: isHovered ? "translateX(4px)" : "translateX(0)",
          transition: "color 0.3s ease-out, transform 0.3s ease-out",
        }}
      >
        {subsection.images.length} images
      </p>
    </button>
  )
}

export default function CarPhotographySection({ category }: CarPhotographySectionProps) {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    // Trigger header animation on mount
    setTimeout(() => setHeaderVisible(true), 100)
  }, [])

  const handleSelect = (id: string) => {
    setSelectedId(id)
  }

  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24 relative">
      {/* Black overlay that fades in when a project is selected */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundColor: "#000000",
          opacity: selectedId ? 1 : 0,
          transition: "opacity 0.5s ease-out",
        }}
      />

      <div className="relative z-10">
        <BackButton href="/photography" label="Photography" />

        {/* Page Header with fade-in animation */}
        <header 
          className="mb-16"
          style={{
            opacity: selectedId ? 0 : headerVisible ? 1 : 0,
            transform: selectedId ? "translateY(-20px)" : headerVisible ? "translateY(0)" : "translateY(-30px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
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
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 0.8s ease-out 0.3s",
            }}
          >
            {category.description}
          </p>
        </header>

        {/* Clickable Thumbnails Grid - 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {category.subsections.map((subsection, index) => (
            <CarGalleryCard
              key={subsection.id}
              subsection={subsection}
              categorySlug={category.slug}
              index={index}
              onSelect={handleSelect}
              isSelected={selectedId === subsection.id}
              isOtherSelected={selectedId !== null && selectedId !== subsection.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
