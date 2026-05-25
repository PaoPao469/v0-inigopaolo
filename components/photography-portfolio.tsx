"use client"

import Image from "next/image"
import { photographyData } from "@/lib/photography-data"
import BackButton from "@/components/back-button"
import { useEffect, useState, memo } from "react"
import { useRouter } from "next/navigation"
import { useOptimizedCard } from "@/hooks/use-optimized-card"

interface Category {
  slug: string
  label: string
  description: string
  thumbnail: string
}

const CategoryCard = memo(function CategoryCard({ 
  category, 
  index,
  onSelect,
  isSelected,
  isOtherSelected
}: { 
  category: Category
  index: number
  onSelect: (id: string) => void
  isSelected: boolean
  isOtherSelected: boolean
}) {
  const router = useRouter()
  const {
    cardRef,
    isVisible,
    isHovered,
    mousePosition,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useOptimizedCard({ index, staggerDelay: 150 })

  // Handle card selection with animation before navigation
  const handleClick = () => {
    onSelect(category.slug)
    
    // Navigate after animation completes
    setTimeout(() => {
      router.push(`/photography/${category.slug}`)
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
      return `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg) scale(1.02)`
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
      ref={cardRef}
      onClick={handleClick}
      className="group block text-left w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: getOpacity(),
        transform: isVisible
          ? getTransform()
          : "translateY(60px) scale(0.95)",
        transition: isSelected || isOtherSelected
          ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease-out"
          : isHovered
          ? "transform 0.15s ease-out, opacity 0.6s ease-out"
          : "transform 0.5s ease-out, opacity 0.6s ease-out",
        transformStyle: "preserve-3d",
        filter: isOtherSelected ? "blur(2px)" : "none",
      }}
    >
      {/* Thumbnail Container */}
      <div 
        className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4"
        style={{
          boxShadow: isSelected
            ? "0 35px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(180, 175, 165, 0.3)"
            : isHovered 
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
            : "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
          transition: "box-shadow 0.4s ease-out",
        }}
      >
        {/* Main Image with parallax effect */}
        <div
          className="absolute inset-0"
          style={{
            transform: isHovered
              ? `scale(1.1) translate(${-mousePosition.x * 10}px, ${-mousePosition.y * 10}px)`
              : "scale(1) translate(0px, 0px)",
            transition: isHovered
              ? "transform 0.15s ease-out"
              : "transform 0.5s ease-out",
          }}
        >
          <Image
            src={category.thumbnail}
            alt={category.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Gradient overlay that intensifies on hover/select */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isSelected
              ? "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%, rgba(0,0,0,0.2) 100%)"
              : isHovered
              ? "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%)",
            transition: "background 0.4s ease-out",
          }}
        />

        {/* Shine effect on hover */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
              : "none",
            transition: "opacity 0.3s ease-out",
          }}
        />

        {/* Corner accent lines */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: isHovered || isSelected ? "60px" : "0px",
            height: "2px",
            background: "rgba(180, 175, 165, 0.6)",
            transition: "width 0.4s ease-out",
            transitionDelay: isHovered ? "0.1s" : "0s",
          }}
        />
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: "2px",
            height: isHovered || isSelected ? "60px" : "0px",
            background: "rgba(180, 175, 165, 0.6)",
            transition: "height 0.4s ease-out",
            transitionDelay: isHovered ? "0.1s" : "0s",
          }}
        />

        {/* Bottom right corner accent */}
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: isHovered || isSelected ? "60px" : "0px",
            height: "2px",
            background: "rgba(180, 175, 165, 0.6)",
            transition: "width 0.4s ease-out",
            transitionDelay: isHovered ? "0.15s" : "0s",
          }}
        />
        <div
          className="absolute bottom-0 right-0 pointer-events-none"
          style={{
            width: "2px",
            height: isHovered || isSelected ? "60px" : "0px",
            background: "rgba(180, 175, 165, 0.6)",
            transition: "height 0.4s ease-out",
            transitionDelay: isHovered ? "0.15s" : "0s",
          }}
        />
      </div>

      {/* Category Label with animated underline */}
      <div className="relative inline-block mb-2 overflow-hidden">
        <h2
          className="transition-colors duration-200"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            fontSize: "18px",
            letterSpacing: isHovered ? "0.2em" : "0.15em",
            color: isHovered ? "rgba(180, 175, 165, 1)" : "rgba(180, 175, 165, 0.85)",
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
            transition: "letter-spacing 0.4s ease-out, color 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          {category.label}
        </h2>
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            left: 0,
            width: isHovered ? "100%" : "0%",
            height: "1px",
            background: "rgba(180, 175, 165, 0.4)",
            transition: "width 0.3s ease-out",
          }}
        />
      </div>
    </button>
  )
})

export default function PhotographyPortfolio() {
  const categories = Object.values(photographyData)
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
        <BackButton href="/" label="Home" />

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
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 0.8s ease-out 0.3s",
            }}
          >
            A collection of automotive and portrait photography, exploring light, composition, and creative direction.
          </p>
        </header>

        {/* Category Thumbnails Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.slug} 
              category={category} 
              index={index}
              onSelect={handleSelect}
              isSelected={selectedId === category.slug}
              isOtherSelected={selectedId !== null && selectedId !== category.slug}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
