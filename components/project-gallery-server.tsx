import Image from "next/image"
import { Project } from "@/lib/projects"
import { getProjectImagesFromBlob, BlobImage } from "@/lib/blob-images"

interface ProjectGalleryServerProps {
  project: Project
}

export default async function ProjectGalleryServer({ project }: ProjectGalleryServerProps) {
  // Fetch images from Blob storage
  const images = await getProjectImagesFromBlob(project.slug)
  
  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-neutral-900/50 rounded-lg p-8 text-center border border-white/5">
        <p style={{ fontFamily: "var(--font-chillax), sans-serif", color: "rgba(180, 175, 165, 0.5)", fontSize: "13px" }}>
          No images found for this project in Blob storage.
        </p>
        <p style={{ fontFamily: "var(--font-chillax), sans-serif", color: "rgba(180, 175, 165, 0.35)", fontSize: "11px", marginTop: "8px" }}>
          Looking for folder: {project.slug}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Gallery header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <span
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 500,
            letterSpacing: "0.1em",
            fontSize: "11px",
            color: "rgba(180, 175, 165, 0.5)",
            textTransform: "uppercase",
          }}
        >
          Project Slides
        </span>
        <span
          style={{
            fontFamily: "var(--font-chillax), sans-serif",
            fontWeight: 400,
            fontSize: "11px",
            color: "rgba(180, 175, 165, 0.4)",
          }}
        >
          {images.length} images
        </span>
      </div>

      {/* Image grid - each slide with its description */}
      <div className="space-y-16">
        {images.map((image, index) => (
          <div key={image.pathname} className="group">
            {/* Slide number */}
            <div className="flex items-center gap-4 mb-4">
              <span
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  fontSize: "11px",
                  color: "rgba(180, 175, 165, 0.3)",
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            {/* Image */}
            <div className="relative w-full aspect-[16/9] bg-neutral-900 overflow-hidden rounded">
              <Image
                src={image.url}
                alt={`${project.title} - Slide ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                priority={index < 2}
              />
            </div>

            {/* Image info */}
            <div className="flex justify-between items-center mt-3">
              <span
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  fontWeight: 400,
                  fontSize: "11px",
                  color: "rgba(180, 175, 165, 0.4)",
                }}
              >
                {image.filename}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-chillax), sans-serif",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "rgba(180, 175, 165, 0.3)",
                }}
              >
                {(image.size / 1024).toFixed(0)} KB
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
