"use client"

import type React from "react"
import { memo } from "react"

import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

// Memoize the shader layers to prevent unnecessary re-renders
const ShaderLayers = memo(function ShaderLayers() {
  return (
    <div 
      className="absolute inset-0 w-full h-full" 
      style={{ 
        filter: "contrast(1.4) brightness(1.05)",
        willChange: "transform",
        contain: "strict",
      }}
    >
      {/* Primary silk ribbon layer — stark white highlights against deep black */}
      <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: "#000000" }}>
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#FFFFFF", "#000000", "#050608", "#FAFAFA"]}
          speed={0.15}
        />
      </div>
      {/* Secondary diagonal flow layer — high-contrast bent light beams */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-80"
        colors={["#000000", "#F5F5F5", "#000000", "#FFFFFF", "#000000"]}
        speed={0.1}
      />
      {/* Tertiary layer — dramatic angular sweeps with deep shadows */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-50"
        colors={["#000000", "#FFFFFF", "#030406", "#000000", "#E8E5DC"]}
        speed={0.08}
      />
    </div>
  )
})

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#000000", isolation: "isolate" }}>
      {/* High-contrast draped fabric gradient mesh — stark white ribbons against true black */}
      <ShaderLayers />

      {/* Blue-gray shadow tint overlay — subtle depth in dark zones */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 70%, rgba(10,14,18,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(10,14,18,0.3) 0%, transparent 50%)",
          contain: "strict",
        }}
      />

      {/* Heavy fractal noise grain — high opacity for dramatic vintage texture */}
      <div
        aria-hidden="true"
        className="grain-overlay absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "512px 512px",
          opacity: 0.7,
          mixBlendMode: "overlay",
          contain: "strict",
        }}
      />

      {/* Secondary grain layer — finer texture emphasizing contrast */}
      <div
        aria-hidden="true"
        className="grain-overlay-secondary absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 0.5,
          mixBlendMode: "soft-light",
          contain: "strict",
        }}
      />

      {/* Speckle grain — particle highlights on stark white ribbons */}
      <div
        aria-hidden="true"
        className="grain-speckle absolute inset-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ns'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='4' stitchTiles='stitch'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='discrete' tableValues='0 1'/%3E%3CfeFuncG type='discrete' tableValues='0 1'/%3E%3CfeFuncB type='discrete' tableValues='0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ns)' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.22,
          mixBlendMode: "color-dodge",
          contain: "strict",
        }}
      />

      {children}
    </div>
  )
}
