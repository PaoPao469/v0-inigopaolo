"use client"

import { useState } from "react"
import Image from "next/image"
import { Project, getProjectImages, ProjectImage } from "@/lib/projects"

interface ProjectImageGalleryProps {
  project: Project
}

export default function ProjectImageGallery({ project }: ProjectImageGalleryProps) {
  const images = getProjectImages(project)
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-neutral-900/50 rounded-lg p-8 text-center border border-white/5">
        <p style={{ fontFamily: "var(--font-chillax), sans-serif", color: "rgba(180, 175, 165, 0.5)", fontSize: "13px" }}>
          No images available for this project yet.
        </p>
      </div>
    )
  }

  const currentImage = images[selectedIndex]

  return (
    <div className="flex flex-col gap-8">
      {/* Main image display */}
      <div className="relative w-full aspect-[4/3] bg-neutral-900 rounded-lg overflow-hidden border border-white/5">
        <Image
          src={currentImage.url}
          alt={currentImage.caption || `${project.title} - Slide ${selectedIndex + 1}`}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>

      {/* Image caption and description */}
      {(currentImage.caption || currentImage.description) && (
        <div className="space-y-2">
          {currentImage.caption && (
            <h3
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 500,
                letterSpacing: "0.06em",
                fontSize: "14px",
                color: "rgba(180, 175, 165, 0.85)",
              }}
            >
              {currentImage.caption}
            </h3>
          )}
          {currentImage.description && (
            <p
              style={{
                fontFamily: "var(--font-chillax), sans-serif",
                fontWeight: 400,
                letterSpacing: "0.02em",
                fontSize: "12px",
                color: "rgba(180, 175, 165, 0.55)",
                lineHeight: 1.7,
              }}
            >
              {currentImage.description}
            </p>
          )}
        </div>
      )}

      {/* Image counter and navigation */}
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.08em",
            color: "rgba(180, 175, 165, 0.4)",
          }}
        >
          {selectedIndex + 1} / {images.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
            disabled={selectedIndex === 0}
            className="px-4 py-2 rounded border border-white/10 disabled:opacity-30 hover:bg-white/5 transition-colors"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: "rgba(180, 175, 165, 0.7)",
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setSelectedIndex(Math.min(images.length - 1, selectedIndex + 1))}
            disabled={selectedIndex === images.length - 1}
            className="px-4 py-2 rounded border border-white/10 disabled:opacity-30 hover:bg-white/5 transition-colors"
            style={{
              fontFamily: "var(--font-chillax), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.06em",
              color: "rgba(180, 175, 165, 0.7)",
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 mt-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? "border-white/40 scale-105"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              <Image
                src={image.url}
                alt={image.caption || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
