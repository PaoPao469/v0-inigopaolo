"use client"

import Image from "next/image"
import Link from "next/link"
import { getAllClothingBrands } from "@/lib/clothing-data"
import BackButton from "@/components/back-button"
import { useEffect, useRef, useState } from "react"

interface Brand {
  slug: string
  label: string
  description: string
  thumbnail: string
}

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
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
          }, index * 150)
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

  // Calculate transform based on mouse position
  const transform = isHovered
    ? `perspective(1000px) rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg) scale(1.02)`
    : "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)"

  return (
    <Link
      ref={cardRef}
      key={brand.slug}
      href={`/clothing/${brand.slug}`}
      className="group block max-w-lg w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? transform
          : "translateY(60px) scale(0.95)",
        transition: isHovered
          ? "transform 0.15s ease-out, opacity 0.6s ease-out"
          : "transform 0.5s ease-out, opacity 0.6s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Thumbnail Container */}
      <div 
        className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4"
        style={{
          boxShadow: isHovered 
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
            src={brand.thumbnail}
            alt={brand.label}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 512px"
          />
        </div>

        {/* Gradient overlay that intensifies on hover */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
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
            width: isHovered ? "60px" : "0px",
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
            height: isHovered ? "60px" : "0px",
            background: "rgba(180, 175, 165, 0.6)",
            transition: "height 0.4s ease-out",
            transitionDelay: isHovered ? "0.1s" : "0s",
          }}
        />
      </div>

      {/* Brand Label with animated underline */}
      <div className="relative inline-block mb-2 overflow-hidden w-full">
        <h2
          className="text-center transition-colors duration-200"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            fontSize: "18px",
            letterSpacing: isHovered ? "0.2em" : "0.15em",
            color: isHovered ? "rgba(180, 175, 165, 1)" : "rgba(180, 175, 165, 0.85)",
            transition: "letter-spacing 0.4s ease-out, color 0.3s ease-out",
          }}
        >
          {brand.label}
        </h2>
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            left: "50%",
            width: isHovered ? "60%" : "0%",
            height: "1px",
            background: "rgba(180, 175, 165, 0.4)",
            transition: "width 0.3s ease-out",
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Description */}
      <p
        className="mt-2 text-center"
        style={{
          fontFamily: "var(--font-figtree), sans-serif",
          fontWeight: 400,
          fontSize: "13px",
          color: isHovered ? "rgba(180, 175, 165, 0.7)" : "rgba(180, 175, 165, 0.5)",
          lineHeight: 1.6,
          transition: "color 0.3s ease-out",
        }}
      >
        {brand.description}
      </p>
    </Link>
  )
}

export default function ClothingPortfolio() {
  const brands = getAllClothingBrands()
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    // Trigger header animation on mount
    setTimeout(() => setHeaderVisible(true), 100)
  }, [])

  return (
    <div className="min-h-screen px-6 py-24 md:px-12 lg:px-24">
      <BackButton href="/" label="Home" />

      {/* Page Header with fade-in animation */}
      <header 
        className="mb-16"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-30px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
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
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.8s ease-out 0.3s",
          }}
        >
          Original clothing brand concepts featuring unique designs, branding, and fashion pieces.
        </p>
      </header>

      {/* Single Brand Thumbnail - Centered */}
      <div className="flex justify-center">
        {brands.map((brand, index) => (
          <BrandCard key={brand.slug} brand={brand} index={index} />
        ))}
      </div>
    </div>
  )
}
