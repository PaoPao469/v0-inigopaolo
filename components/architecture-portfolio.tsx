"use client"

import Image from "next/image"
import Link from "next/link"
import { getAllProjects } from "@/lib/architecture-data"
import { useEffect, useRef, useState } from "react"

interface Project {
  id: string
  category: string
  title: string
  titleAccent: string
  description: string
  thumbnail: string
  images: string[]
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
          }, index * 100)
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
      href={`/architecture/${project.id}`}
      className="group block"
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
      {/* Image Container with overflow effects */}
      <div 
        className="relative aspect-[4/3] overflow-hidden mb-4 rounded-sm"
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
            src={project.thumbnail}
            alt={`${project.title} ${project.titleAccent}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient overlay that intensifies on hover */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isHovered
              ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
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

        {/* View indicator that slides up on hover */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-4"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
          }}
        >
          <span
            className="px-4 py-1.5 backdrop-blur-md rounded-full text-[10px] tracking-[0.15em]"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              color: "rgba(255, 255, 255, 0.9)",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            VIEW PROJECT
          </span>
        </div>

        {/* Corner accent line */}
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: isHovered ? "60px" : "0px",
            height: "2px",
            background: "rgba(255, 255, 255, 0.6)",
            transition: "width 0.4s ease-out",
            transitionDelay: isHovered ? "0.1s" : "0s",
          }}
        />
        <div
          className="absolute top-0 left-0 pointer-events-none"
          style={{
            width: "2px",
            height: isHovered ? "60px" : "0px",
            background: "rgba(255, 255, 255, 0.6)",
            transition: "height 0.4s ease-out",
            transitionDelay: isHovered ? "0.1s" : "0s",
          }}
        />
      </div>
      
      {/* Category with animated underline */}
      <div className="relative inline-block mb-2 overflow-hidden">
        <span
          className="text-[10px] tracking-[0.2em] block"
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            color: "rgba(200, 205, 215, 0.8)",
            transform: isHovered ? "translateX(8px)" : "translateX(0)",
            transition: "transform 0.3s ease-out, color 0.3s ease-out",
          }}
        >
          {project.category}
        </span>
        <div
          style={{
            position: "absolute",
            bottom: "-2px",
            left: 0,
            width: isHovered ? "100%" : "0%",
            height: "1px",
            background: "rgba(200, 205, 215, 0.4)",
            transition: "width 0.3s ease-out",
          }}
        />
      </div>
      
      {/* Title with letter spacing animation */}
      <h3
        style={{
          fontFamily: "var(--font-chillax), sans-serif",
          fontWeight: 500,
          color: isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.85)",
          letterSpacing: isHovered ? "0.06em" : "0.03em",
          transition: "color 0.3s ease-out, letter-spacing 0.4s ease-out, transform 0.3s ease-out",
          transform: isHovered ? "translateX(4px)" : "translateX(0)",
        }}
        className="text-lg md:text-xl"
      >
        {project.title}{" "}
        <span 
          style={{ 
            fontWeight: 400, 
            opacity: isHovered ? 0.8 : 0.6,
            transition: "opacity 0.3s ease-out",
          }}
        >
          {project.titleAccent}
        </span>
      </h3>
    </Link>
  )
}

export default function ArchitecturePortfolio() {
  const allProjects = getAllProjects()
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    // Trigger header animation on mount
    setTimeout(() => setHeaderVisible(true), 100)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header with fade-in animation */}
      <div 
        className="text-center mb-16 md:mb-24 pt-8"
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(-30px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
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
            color: "rgba(200, 205, 215, 0.45)",
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.8s ease-out 0.3s",
          }}
        >
          {allProjects.length} PROJECTS
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {allProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}
