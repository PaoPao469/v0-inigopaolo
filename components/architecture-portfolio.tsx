"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getAllProjects } from "@/lib/architecture-data"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  id: string
  category: string
  title: string
  titleAccent: string
  description: string
  thumbnail: string
  images: string[]
}

function ProjectCard({ project, isFeatured = false }: { project: Project; isFeatured?: boolean }) {
  return (
    <Link
      href={`/architecture/${project.id}`}
      className={`group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] ${
        isFeatured ? "row-span-2" : ""
      }`}
      style={{
        height: isFeatured ? "100%" : "auto",
      }}
    >
      <div className={`relative w-full overflow-hidden ${isFeatured ? "h-full min-h-[400px]" : "aspect-[3/4]"}`}>
        <Image
          src={project.thumbnail}
          alt={`${project.title} ${project.titleAccent}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1.5 rounded-full text-[10px] tracking-[0.15em] uppercase backdrop-blur-md"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              background: "rgba(255, 255, 255, 0.15)",
              color: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            {project.category}
          </span>
        </div>
        
        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className={`transition-colors ${isFeatured ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.95)",
              letterSpacing: "0.02em",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {project.title}{" "}
            <span style={{ fontWeight: 400, opacity: 0.7 }}>{project.titleAccent}</span>
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default function ArchitecturePortfolio() {
  const allProjects = getAllProjects()
  const [currentPage, setCurrentPage] = useState(0)
  const projectsPerPage = 5
  const totalPages = Math.ceil(allProjects.length / projectsPerPage)
  
  const startIndex = currentPage * projectsPerPage
  const visibleProjects = allProjects.slice(startIndex, startIndex + projectsPerPage)
  
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }
  
  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-12 md:pb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl mb-3"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "rgba(255, 255, 255, 0.95)",
              }}
            >
              View our
              <br />
              <span style={{ fontWeight: 600 }}>latest works</span>
            </h1>
          </div>
          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              color: "rgba(200, 205, 215, 0.6)",
            }}
          >
            A curated collection of architectural projects exploring form, space, and the relationship between built environments and their contexts.
          </p>
        </div>
      </div>

      {/* Dark Container with Projects */}
      <div 
        className="mx-4 md:mx-8 lg:mx-12 rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(15, 15, 18, 0.98) 0%, rgba(10, 10, 12, 0.99) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="p-6 md:p-10 lg:p-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-10 md:mb-14">
            <p
              className="text-xs leading-relaxed max-w-[180px]"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                color: "rgba(180, 160, 140, 0.8)",
                fontStyle: "italic",
              }}
            >
              Each project represents a unique exploration of architectural principles and creative problem-solving
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.95)",
                letterSpacing: "-0.02em",
              }}
            >
              OUR WORKs
            </h2>
          </div>

          {/* Projects Grid - Dynamic Layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[220px]">
            {visibleProjects.map((project, index) => {
              // Create varied layout: center card is featured (larger)
              const isFeatured = index === 2
              return (
                <div 
                  key={project.id} 
                  className={`${
                    isFeatured 
                      ? "col-span-2 md:col-span-1 row-span-2" 
                      : index === 0 || index === 1
                        ? "col-span-1"
                        : "col-span-1"
                  }`}
                >
                  <ProjectCard project={project} isFeatured={isFeatured} />
                </div>
              )
            })}
          </div>

          {/* Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10 md:mt-14">
              <button
                onClick={prevPage}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                aria-label="Previous projects"
              >
                <ChevronLeft className="w-5 h-5" style={{ color: "rgba(255, 255, 255, 0.7)" }} />
              </button>
              <button
                onClick={nextPage}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
                aria-label="Next projects"
              >
                <ChevronRight className="w-5 h-5" style={{ color: "rgba(255, 255, 255, 0.7)" }} />
              </button>
            </div>
          )}

          {/* Page indicator */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentPage ? "w-6 bg-white/60" : "bg-white/20 hover:bg-white/30"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16 md:h-24" />
    </div>
  )
}
