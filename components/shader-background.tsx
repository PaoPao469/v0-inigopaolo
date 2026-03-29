"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* SVG Filters */}
      <svg className="absolute inset-0 w-0 h-0" aria-hidden="true">
        <defs>
          {/* Desaturate everything to pure grayscale */}
          <filter id="desaturate">
            <feColorMatrix type="saturate" values="0" />
          </filter>
          {/* Film grain overlay filter */}
          <filter id="grain-filter" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
            <feComponentTransfer in="blended">
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Background Shaders — all purple replaced with grayscale tones */}
      <div style={{ filter: "url(#desaturate)" }} className="absolute inset-0 w-full h-full">
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#888888", "#ffffff", "#1a1a1a", "#555555"]}
          speed={0.3}
          backgroundColor="#000000"
        />
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-60"
          colors={["#000000", "#ffffff", "#aaaaaa", "#000000"]}
          speed={0.2}
          wireframe="true"
          backgroundColor="transparent"
        />
      </div>

      {/* Film grain + noise overlay */}
      <div
        aria-hidden="true"
        className="grain-overlay absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.13,
          mixBlendMode: "overlay",
        }}
      />

      {/* Animated scanline shimmer for vintage feel */}
      <div
        aria-hidden="true"
        className="scanlines absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
          opacity: 0.6,
        }}
      />

      {children}
    </div>
  )
}
