"use client"

import { useEffect, useRef } from "react"

const FONT_SIZE = "clamp(3rem, 9vw, 8rem)"
const FONT_FAMILY = "var(--font-barlow-condensed), sans-serif"
const FONT_WEIGHT = 700
const LETTER_SPACING = "0.12em"
const TEXT = "INIGO PAOLO"

export default function HeroContent() {
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
  const turbulenceStreakRef = useRef<SVGFETurbulenceElement>(null)
  const rafRef = useRef<number | null>(null)
  const tRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      tRef.current += 0.00035
      const t = tRef.current

      // Primary warp — slow horizontal undulation
      const bfx = 0.012 + Math.sin(t * 0.9) * 0.003
      const bfy = 0.004 + Math.cos(t * 0.6) * 0.0015
      turbulenceRef.current?.setAttribute("baseFrequency", `${bfx.toFixed(5)} ${bfy.toFixed(5)}`)

      // Streak turbulence — very low Y frequency to keep streaks vertical
      const sbfx = 0.025 + Math.sin(t * 0.5 + 1.5) * 0.005
      const sbfy = 0.002 + Math.cos(t * 0.4 + 0.8) * 0.0008
      turbulenceStreakRef.current?.setAttribute("baseFrequency", `${sbfx.toFixed(5)} ${sbfy.toFixed(5)}`)

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          {/*
            Vertical streak filter — mimics the ink-bleed / motion-blur
            streaking upward and downward from each letterform.
            stdDeviation="0 40" blurs only on the Y axis.
          */}
          <filter id="streak" x="-10%" y="-120%" width="120%" height="340%" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbulenceStreakRef}
              type="fractalNoise"
              baseFrequency="0.025 0.002"
              numOctaves="2"
              seed="5"
              result="noise"
            />
            {/* Displace slightly on X to roughen the streak edges */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            {/* Heavy Y-axis blur creates the vertical streak column */}
            <feGaussianBlur in="displaced" stdDeviation="0 48" result="streaked" />
            {/* Attenuate so streaks don't overpower the solid letter */}
            <feComponentTransfer in="streaked" result="fadedStreak">
              <feFuncA type="linear" slope="0.55" />
            </feComponentTransfer>
            {/* Merge streak behind sharp letter */}
            <feMerge>
              <feMergeNode in="fadedStreak" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Primary organic warp — slow flowing displacement */}
          <filter id="warp" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.004"
              numOctaves="4"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="16"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Glow halo — diffuse outer glow around letters */}
          <filter id="glow" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blurred" />
            <feColorMatrix
              in="blurred"
              type="matrix"
              values="1 0 0 0 0.93
                      1 0 0 0 0.93
                      1 0 0 0 0.9
                      0 0 0 0.28 0"
              result="tinted"
            />
            <feMerge>
              <feMergeNode in="tinted" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Heavy grain clipped to letterforms */}
          <filter id="text-grain" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="5"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
            <feBlend in="SourceGraphic" in2="gray" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className="relative flex items-center justify-center select-none">

        {/* Layer 1 — outer glow (behind everything) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#glow)", opacity: 0.38 }}
        >
          <span style={{ fontSize: FONT_SIZE, fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT, letterSpacing: LETTER_SPACING, color: "#fff", lineHeight: 1 }}>
            {TEXT}
          </span>
        </div>

        {/* Layer 2 — vertical streak columns with organic warp */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#streak)", opacity: 0.65 }}
        >
          <span style={{ fontSize: FONT_SIZE, fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT, letterSpacing: LETTER_SPACING, color: "#fff", lineHeight: 1 }}>
            {TEXT}
          </span>
        </div>

        {/* Layer 3 — primary warped text */}
        <h1
          className="relative"
          style={{
            fontSize: FONT_SIZE,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHT,
            letterSpacing: LETTER_SPACING,
            color: "#E8E5DC",
            opacity: 0.72,
            lineHeight: 1,
            filter: "url(#warp)",
            margin: 0,
          }}
        >
          {TEXT}
        </h1>

        {/* Layer 4 — grain texture clipped to letterforms */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#text-grain)", mixBlendMode: "overlay", opacity: 0.38 }}
        >
          <span style={{ fontSize: FONT_SIZE, fontFamily: FONT_FAMILY, fontWeight: FONT_WEIGHT, letterSpacing: LETTER_SPACING, color: "#fff", lineHeight: 1 }}>
            {TEXT}
          </span>
        </div>

      </div>
    </main>
  )
}
