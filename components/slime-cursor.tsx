"use client"

import { useEffect, useRef, useState } from "react"

export default function SlimeCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number | null>(null)
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Use RAF for smooth cursor updates without layout thrashing
    const updateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`
      }
      rafRef.current = null
    }

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current.x = e.clientX
      positionRef.current.y = e.clientY
      
      // Only schedule RAF if one isn't already pending
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateCursor)
      }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
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

      {/* Static cursor */}
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
          backgroundColor: "rgba(200, 195, 185, 0.9)",
          opacity: isVisible ? 1 : 0,
          willChange: "transform",
        }}
      />
    </>
  )
}
