"use client"

import Image from "next/image"
import { Project, getProjectImages } from "@/lib/projects"

interface ProjectImageGalleryProps {
  project: Project
}

export default function ProjectImageGallery({ project }: ProjectImageGalleryProps) {
  const images = getProjectImages(project)

  return (
    <div className="flex flex-col gap-6">
      {images.map((src, index) => (
        <div
          key={index}
          className="relative w-full overflow-hidden bg-neutral-900"
        >
          <Image
            src={src}
            alt={`${project.title} - Page ${index + 1}`}
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
