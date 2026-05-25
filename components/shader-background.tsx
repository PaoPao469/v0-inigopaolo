"use client"

import type React from "react"
import { memo } from "react"

import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

// Memoize the shader layer to prevent unnecessary re-renders
const ShaderLayers = memo(function ShaderLayers() {
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ 
        backgroundColor: "#000000",
        contain: "strict",
      }}
    >
      {/* Single optimized silk ribbon layer — reduced speed and pixel ratio for better performance */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#000000", "#FFFFFF", "#000000", "#FAFAFA", "#050608"]}
        speed={0.02}
        pixelDensity={0.5}
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
