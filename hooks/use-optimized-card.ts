"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface UseOptimizedCardOptions {
  index: number
  staggerDelay?: number
}

interface MousePosition {
  x: number
  y: number
}

export function useOptimizedCard({ index, staggerDelay = 100 }: UseOptimizedCardOptions) {
  const cardRef = useRef<HTMLButtonElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const mousePositionRef = useRef<MousePosition>({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  // Intersection Observer for scroll-triggered animations - single shared observer per component
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Staggered delay based on index for cascade effect
          const timer = setTimeout(() => {
            setIsVisible(true)
          }, index * staggerDelay)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index, staggerDelay])

  // Throttled mouse move handler using RAF
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    
    mousePositionRef.current = { x, y }
    
    // Only schedule RAF if one isn't already pending
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        setMousePosition(mousePositionRef.current)
        rafRef.current = null
      })
    }
  }, [])

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return {
    cardRef,
    isVisible,
    isHovered,
    mousePosition,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  }
}
