"use client"

import type React from "react"
import { memo } from "react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

// Static CSS gradient background - replaces WebGL MeshGradient for better performance
const ShaderLayers = memo(function ShaderLayers() {
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none animate-gradient-shift" 
      style={{ 
        backgroundColor: "#000000",
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255,255,255,0.15) 0%, transparent 50%),
          radial-gradient(ellipse 60% 80% at 80% 20%, rgba(250,250,250,0.12) 0%, transparent 50%),
          radial-gradient(ellipse 70% 60% at 60% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
          radial-gradient(ellipse 50% 40% at 30% 70%, rgba(245,245,245,0.08) 0%, transparent 40%),
          linear-gradient(135deg, #000000 0%, #050608 25%, #000000 50%, #0a0a0a 75%, #000000 100%)
        `,
        backgroundSize: "200% 200%",
      }}
    />
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
