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
    <div ref={containerRef} className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#0a0e12" }}>
      {/* Draped fabric gradient mesh — elongated diagonal light ribbons */}
      <div className="absolute inset-0 w-full h-full">
        {/* Primary silk ribbon layer — warm off-white highlights against blue-gray dark */}
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#0a0e12", "#E8E5DC", "#0a0e12", "#1a1e24", "#E8E5DC"]}
          speed={0.15}
          backgroundColor="#0a0e12"
        />
        {/* Secondary diagonal flow layer — creates elongated bent light beams */}
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-70"
          colors={["#0a0e12", "#D8D5CC", "#0a0e12", "#E8E5DC", "#0a0e12"]}
          speed={0.1}
          backgroundColor="transparent"
        />
        {/* Tertiary layer — adds depth and angular sweeps */}
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-40"
          colors={["#0a0e12", "#F0EDE4", "#0a0e12", "#0a0e12", "#C8C5BC"]}
          speed={0.08}
          backgroundColor="transparent"
        />
      </div>

      {/* Heavy fractal noise grain — high opacity for vintage texture */}
      <div
        aria-hidden="true"
        className="grain-overlay absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          opacity: 0.65,
          mixBlendMode: "overlay",
        }}
      />

      {/* Secondary grain layer — finer texture for flow areas */}
      <div
        aria-hidden="true"
        className="grain-overlay-secondary absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 0.45,
          mixBlendMode: "soft-light",
        }}
      />

      {/* Speckle grain — particle texture emphasizing light ribbons */}
      <div
        aria-hidden="true"
        className="grain-speckle absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ns'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='4' stitchTiles='stitch'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='discrete' tableValues='0 1'/%3E%3CfeFuncG type='discrete' tableValues='0 1'/%3E%3CfeFuncB type='discrete' tableValues='0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ns)' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.18,
          mixBlendMode: "color-dodge",
        }}
      />

      {children}
    </div>
  )
}
