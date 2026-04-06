"use client"

import { useCallback, useEffect } from "react"
import Image from "next/image"

interface ImageLightboxProps {
  isOpen: boolean
  imageUrl: string
  alt: string
  onClose: () => void
  onPrevious?: () => void
  onNext?: () => void
  hasPrevious?: boolean
  hasNext?: boolean
}

export default function ImageLightbox({
  isOpen,
  imageUrl,
  alt,
  onClose,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}: ImageLightboxProps) {
  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          if (hasPrevious && onPrevious) onPrevious()
          break
        case "ArrowRight":
          if (hasNext && onNext) onNext()
          break
      }
    },
    [isOpen, onClose, onPrevious, onNext, hasPrevious, hasNext]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(10, 10, 10, 0.95)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-2 transition-opacity hover:opacity-70"
        style={{ color: "rgba(180, 160, 120, 0.8)" }}
        aria-label="Close lightbox"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {hasPrevious && onPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrevious()
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 transition-opacity hover:opacity-70"
          style={{ color: "rgba(180, 160, 120, 0.8)" }}
          aria-label="Previous image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 transition-opacity hover:opacity-70"
          style={{ color: "rgba(180, 160, 120, 0.8)" }}
          aria-label="Next image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image container */}
      <div
        className="relative w-full h-full max-w-[90vw] max-h-[85vh] m-auto flex items-center justify-center p-4 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </div>
      </div>

      {/* Image caption */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"
        style={{
          fontFamily: "var(--font-figtree), sans-serif",
          color: "rgba(180, 175, 165, 0.5)",
          fontSize: "11px",
          letterSpacing: "0.1em",
        }}
      >
        {alt}
      </div>

      {/* Keyboard hints */}
      <div
        className="absolute bottom-6 right-6 hidden md:flex items-center gap-4"
        style={{
          fontFamily: "var(--font-figtree), sans-serif",
          color: "rgba(180, 175, 165, 0.3)",
          fontSize: "10px",
          letterSpacing: "0.05em",
        }}
      >
        <span>ESC to close</span>
        {(hasPrevious || hasNext) && <span>Arrow keys to navigate</span>}
      </div>
    </div>
  )
}
