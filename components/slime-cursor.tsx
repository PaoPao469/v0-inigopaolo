"use client"

import { useEffect, useRef, useState } from "react"

export default function SlimeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const scaleRef = useRef({ x: 1, y: 1 })
  const rafRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Spring physics constants for smooth slime-like motion
    const SPRING = 0.12
    const DAMPING = 0.72
    const TRAIL_SPRING = 0.06
    const TRAIL_DAMPING = 0.68
    const SQUISH_FACTOR = 0.012
    const SQUISH_RECOVERY = 0.15

    const trailPosition = { x: 0, y: 0 }
    const trailVelocity = { x: 0, y: 0 }
    const trailScale = { x: 1, y: 1 }

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const animate = () => {
      const pos = positionRef.current
      const target = targetRef.current
      const vel = velocityRef.current
      const scale = scaleRef.current

      // Spring physics for main cursor position
      const dx = target.x - pos.x
      const dy = target.y - pos.y
      vel.x += dx * SPRING
      vel.y += dy * SPRING
      vel.x *= DAMPING
      vel.y *= DAMPING
      pos.x += vel.x
      pos.y += vel.y

      // Squishy deformation based on velocity (no rotation)
      // Horizontal velocity stretches X, compresses Y
      // Vertical velocity stretches Y, compresses X
      const absVelX = Math.abs(vel.x)
      const absVelY = Math.abs(vel.y)
      
      const targetScaleX = 1 + absVelX * SQUISH_FACTOR - absVelY * SQUISH_FACTOR * 0.5
      const targetScaleY = 1 + absVelY * SQUISH_FACTOR - absVelX * SQUISH_FACTOR * 0.5
      
      // Clamp scales to reasonable bounds
      const clampedTargetX = Math.max(0.7, Math.min(1.5, targetScaleX))
      const clampedTargetY = Math.max(0.7, Math.min(1.5, targetScaleY))
      
      // Smooth recovery toward target scale
      scale.x += (clampedTargetX - scale.x) * SQUISH_RECOVERY
      scale.y += (clampedTargetY - scale.y) * SQUISH_RECOVERY

      // Spring physics for trail (follows main cursor with more lag)
      const tdx = pos.x - trailPosition.x
      const tdy = pos.y - trailPosition.y
      trailVelocity.x += tdx * TRAIL_SPRING
      trailVelocity.y += tdy * TRAIL_SPRING
      trailVelocity.x *= TRAIL_DAMPING
      trailVelocity.y *= TRAIL_DAMPING
      trailPosition.x += trailVelocity.x
      trailPosition.y += trailVelocity.y

      // Trail squish
      const trailAbsVelX = Math.abs(trailVelocity.x)
      const trailAbsVelY = Math.abs(trailVelocity.y)
      const trailTargetX = 1 + trailAbsVelX * SQUISH_FACTOR * 1.2 - trailAbsVelY * SQUISH_FACTOR * 0.6
      const trailTargetY = 1 + trailAbsVelY * SQUISH_FACTOR * 1.2 - trailAbsVelX * SQUISH_FACTOR * 0.6
      trailScale.x += (Math.max(0.6, Math.min(1.7, trailTargetX)) - trailScale.x) * SQUISH_RECOVERY * 0.8
      trailScale.y += (Math.max(0.6, Math.min(1.7, trailTargetY)) - trailScale.y) * SQUISH_RECOVERY * 0.8

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scaleX(${scale.x}) scaleY(${scale.y})`
      }

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPosition.x}px, ${trailPosition.y}px) scaleX(${trailScale.x}) scaleY(${trailScale.y})`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible])

  return (
    <>
      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail blob - larger, more transparent, follows behind */}
      <div
        ref={trailRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: "28px",
          height: "28px",
          marginLeft: "-14px",
          marginTop: "-14px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180, 175, 165, 0.25) 0%, rgba(180, 175, 165, 0.08) 60%, transparent 100%)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />

      {/* Main slime ball cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: "14px",
          height: "14px",
          marginLeft: "-7px",
          marginTop: "-7px",
          borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, rgba(220, 215, 205, 0.95) 0%, rgba(180, 175, 165, 0.8) 50%, rgba(140, 135, 125, 0.7) 100%)",
          boxShadow: "0 0 8px rgba(180, 175, 165, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.2)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s ease",
          willChange: "transform",
        }}
      />
    </>
  )
}
