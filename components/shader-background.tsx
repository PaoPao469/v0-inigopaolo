"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

interface DistortionPoint {
  x: number
  y: number
  targetX: number
  targetY: number
  velocityX: number
  velocityY: number
}

export default function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gradientContainerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const distortionRef = useRef<DistortionPoint>({
    x: 0, y: 0, targetX: 0, targetY: 0, velocityX: 0, velocityY: 0
  })
  const animationRef = useRef<number | null>(null)

  // Spring physics constants
  const SPRING_STIFFNESS = 0.03
  const DAMPING = 0.85
  const PUSH_RADIUS = 250
  const PUSH_STRENGTH = 40

  const animate = useCallback(() => {
    const distortion = distortionRef.current
    const mouse = mouseRef.current
    const container = gradientContainerRef.current

    if (container) {
      // Calculate push force based on mouse proximity
      if (mouse.active) {
        const rect = container.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        
        // Distance from mouse to center
        const dx = mouse.x - centerX
        const dy = mouse.y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < PUSH_RADIUS && distance > 0) {
          // Push away from cursor - inverse direction
          const force = (1 - distance / PUSH_RADIUS) * PUSH_STRENGTH
          const angle = Math.atan2(dy, dx)
          distortion.targetX = -Math.cos(angle) * force
          distortion.targetY = -Math.sin(angle) * force
        } else {
          // Gradually return to center
          distortion.targetX = 0
          distortion.targetY = 0
        }
      } else {
        distortion.targetX = 0
        distortion.targetY = 0
      }

      // Spring physics - smooth motion toward target
      const forceX = (distortion.targetX - distortion.x) * SPRING_STIFFNESS
      const forceY = (distortion.targetY - distortion.y) * SPRING_STIFFNESS
      
      distortion.velocityX = (distortion.velocityX + forceX) * DAMPING
      distortion.velocityY = (distortion.velocityY + forceY) * DAMPING
      
      distortion.x += distortion.velocityX
      distortion.y += distortion.velocityY

      // Apply transform to gradient container
      container.style.transform = `translate(${distortion.x}px, ${distortion.y}px) scale(${1 + Math.abs(distortion.x + distortion.y) * 0.001})`
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsActive(true)
      mouseRef.current.active = true
    }
    const handleMouseLeave = () => {
      setIsActive(false)
      mouseRef.current.active = false
    }
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        mouseRef.current.x = e.clientX - rect.left
        mouseRef.current.y = e.clientY - rect.top
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
      container.addEventListener("mousemove", handleMouseMove)
    }

    // Start animation loop
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
        container.removeEventListener("mousemove", handleMouseMove)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
      {/* High-contrast draped fabric gradient mesh — stark white ribbons against true black */}
      <div 
        ref={gradientContainerRef}
        className="absolute inset-0 w-full h-full will-change-transform" 
        style={{ filter: "contrast(1.4) brightness(1.05)", transform: "translate(0px, 0px)" }}
      >
        {/* Primary silk ribbon layer — stark white highlights against deep black */}
        <MeshGradient
          className="absolute inset-0 w-full h-full"
          colors={["#000000", "#FFFFFF", "#000000", "#050608", "#FAFAFA"]}
          speed={0.15}
          backgroundColor="#000000"
        />
        {/* Secondary diagonal flow layer — high-contrast bent light beams */}
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-80"
          colors={["#000000", "#F5F5F5", "#000000", "#FFFFFF", "#000000"]}
          speed={0.1}
          backgroundColor="transparent"
        />
        {/* Tertiary layer — dramatic angular sweeps with deep shadows */}
        <MeshGradient
          className="absolute inset-0 w-full h-full opacity-50"
          colors={["#000000", "#FFFFFF", "#030406", "#000000", "#E8E5DC"]}
          speed={0.08}
          backgroundColor="transparent"
        />
      </div>

      {/* Blue-gray shadow tint overlay — subtle depth in dark zones */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 70%, rgba(10,14,18,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(10,14,18,0.3) 0%, transparent 50%)",
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
        }}
      />

      {children}
    </div>
  )
}
