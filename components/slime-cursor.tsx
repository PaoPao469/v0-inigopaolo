"use client"

import { useEffect, useRef, useState } from "react"

export default function SlimeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Spring physics constants for smooth slime-like motion
    const SPRING = 0.08
    const DAMPING = 0.75
    const TRAIL_SPRING = 0.045
    const TRAIL_DAMPING = 0.7

    const trailPosition = { x: 0, y: 0 }
    const trailVelocity = { x: 0, y: 0 }

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

      // Spring physics for main cursor
      const dx = target.x - pos.x
      const dy = target.y - pos.y
      vel.x += dx * SPRING
      vel.y += dy * SPRING
      vel.x *= DAMPING
      vel.y *= DAMPING
      pos.x += vel.x
      pos.y += vel.y

      // Spring physics for trail (follows main cursor with more lag)
      const tdx = pos.x - trailPosition.x
      const tdy = pos.y - trailPosition.y
      trailVelocity.x += tdx * TRAIL_SPRING
      trailVelocity.y += tdy * TRAIL_SPRING
      trailVelocity.x *= TRAIL_DAMPING
      trailVelocity.y *= TRAIL_DAMPING
      trailPosition.x += trailVelocity.x
      trailPosition.y += trailVelocity.y

      // Calculate stretch based on velocity for slime effect
      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y)
      const stretch = Math.min(1 + speed * 0.015, 1.6)
      const angle = Math.atan2(vel.y, vel.x) * (180 / Math.PI)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) rotate(${angle}deg) scaleX(${stretch}) scaleY(${2 - stretch})`
      }

      if (trailRef.current) {
        const trailSpeed = Math.sqrt(trailVelocity.x * trailVelocity.x + trailVelocity.y * trailVelocity.y)
        const trailStretch = Math.min(1 + trailSpeed * 0.02, 1.8)
        const trailAngle = Math.atan2(trailVelocity.y, trailVelocity.x) * (180 / Math.PI)
        trailRef.current.style.transform = `translate(${trailPosition.x}px, ${trailPosition.y}px) rotate(${trailAngle}deg) scaleX(${trailStretch}) scaleY(${2 - trailStretch})`
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
