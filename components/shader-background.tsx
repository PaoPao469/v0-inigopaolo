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
        }}
      />

      {children}
    </div>
  )
}
