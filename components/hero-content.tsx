"use client"

import { useEffect, useRef } from "react"

const TEXT = "INIGO PAOLO"
const FONT_STYLE = {
  fontFamily: "var(--font-chillax), sans-serif",
  fontWeight: 500,
  fontSize: "34px",
  letterSpacing: "0.28em",
  lineHeight: 1,
  margin: 0,
}

export default function HeroContent() {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null)
  const rafRef = useRef<number | null>(null)
  const tRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      tRef.current += 0.025

      const t = tRef.current
      
      // Flickering turbulence frequency for radioactive noise
      const baseFreqX = 0.015 + Math.sin(t * 2.3) * 0.008 + Math.random() * 0.004
      const baseFreqY = 0.025 + Math.cos(t * 1.7) * 0.01 + Math.random() * 0.005
      
      // Flickering displacement scale for glitch bursts
      const baseScale = 4 + Math.sin(t * 4.5) * 2 + (Math.random() > 0.92 ? Math.random() * 8 : 0)

      turbulenceRef.current?.setAttribute("baseFrequency", `${baseFreqX.toFixed(4)} ${baseFreqY.toFixed(4)}`)
      displacementRef.current?.setAttribute("scale", baseScale.toFixed(2))

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      {/* SVG filters for radioactive distortion */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          {/* Animated turbulence displacement for decay effect */}
          <filter id="radioactive-distort" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.015 0.025"
              numOctaves="3"
              seed="1"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>

          {/* Grain/noise overlay for radiation texture */}
          <filter id="radiation-grain" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.2"
              numOctaves="4"
              stitchTiles="stitch"
              result="grain"
            />
            <feColorMatrix type="saturate" values="0" in="grain" result="grayGrain" />
            <feBlend in="SourceGraphic" in2="grayGrain" mode="overlay" result="textured" />
            <feComposite in="textured" in2="SourceGraphic" operator="in" />
          </filter>

          {/* Glow/emission effect */}
          <filter id="radiation-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="relative flex items-center justify-center select-none">
        {/* Layer 1: Outer radioactive glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center animate-pulse"
          style={{ filter: "url(#radiation-glow)", opacity: 0.25 }}
        >
          <span style={{ ...FONT_STYLE, color: "rgba(180, 175, 165, 0.6)" }}>
            {TEXT}
          </span>
        </div>

        {/* Layer 2: Distorted flickering text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#radioactive-distort)", opacity: 0.7 }}
        >
          <span style={{ ...FONT_STYLE, color: "rgba(180, 175, 165, 0.5)" }}>
            {TEXT}
          </span>
        </div>

        {/* Layer 3: Grain texture layer */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#radiation-grain)", mixBlendMode: "overlay", opacity: 0.4 }}
        >
          <span style={{ ...FONT_STYLE, color: "rgba(200, 195, 185, 0.9)" }}>
            {TEXT}
          </span>
        </div>

        {/* Layer 4: Primary text with subtle distortion */}
        <h1
          className="relative"
          style={{
            ...FONT_STYLE,
            color: "rgba(180, 175, 165, 0.82)",
            filter: "url(#radioactive-distort)",
          }}
        >
          {TEXT}
        </h1>
      </div>
    </main>
  )
}
