"use client"

import { useState } from "react"
import Image from "next/image"
import { Project, getProjectImages } from "@/lib/projects"

interface ProjectImageGalleryProps {
  project: Project
}

export default function ProjectImageGallery({ project }: ProjectImageGalleryProps) {
  const images = getProjectImages(project)
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-background/50 rounded-lg p-8 text-center">
        <p className="text-foreground/60">No images available for this project yet.</p>
      </div>
    )
  }

  const currentImage = images[selectedIndex]

  return (
    <div className="flex flex-col gap-6">
      {/* Main image display */}
      <div className="relative w-full aspect-video bg-background rounded-lg overflow-hidden border border-foreground/10">
        <Image
          src={currentImage}
          alt={`${project.title} - Page ${selectedIndex + 1}`}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>

      {/* Image counter and navigation */}
      <div className="flex items-center justify-between">
        <span className="text-foreground/60 text-sm">
          {selectedIndex + 1} / {images.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
            disabled={selectedIndex === 0}
            className="px-3 py-1 rounded border border-foreground/20 text-foreground/80 disabled:opacity-50 hover:bg-foreground/10 transition"
          >
            ← Previous
          </button>
          <button
            onClick={() => setSelectedIndex(Math.min(images.length - 1, selectedIndex + 1))}
            disabled={selectedIndex === images.length - 1}
            className="px-3 py-1 rounded border border-foreground/20 text-foreground/80 disabled:opacity-50 hover:bg-foreground/10 transition"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded border-2 transition ${
                index === selectedIndex
                  ? "border-foreground"
                  : "border-foreground/20 hover:border-foreground/50"
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover rounded"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
