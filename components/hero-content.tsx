"use client"

import { useEffect, useRef } from "react"

export default function HeroContent() {
  const turbulenceStrongRef = useRef<SVGFETurbulenceElement>(null)
  const turbulenceHaloRef = useRef<SVGFETurbulenceElement>(null)
  const rafRef = useRef<number | null>(null)
  const tRef = useRef(0)

  useEffect(() => {
    const tick = () => {
      tRef.current += 0.0004

      const t = tRef.current
      // Two slowly drifting sine waves create the organic flowing warp
      const bfx = 0.018 + Math.sin(t * 1.1) * 0.004
      const bfy = 0.006 + Math.cos(t * 0.8) * 0.002

      const hbfx = 0.014 + Math.sin(t * 0.7 + 1.2) * 0.003
      const hbfy = 0.005 + Math.cos(t * 0.9 + 0.5) * 0.0015

      turbulenceStrongRef.current?.setAttribute("baseFrequency", `${bfx.toFixed(5)} ${bfy.toFixed(5)}`)
      turbulenceHaloRef.current?.setAttribute("baseFrequency", `${hbfx.toFixed(5)} ${hbfy.toFixed(5)}`)

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      {/* SVG distortion filters */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          {/* Primary warp — animated turbulence displacement */}
          <filter id="distort-strong" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbulenceStrongRef}
              type="fractalNoise"
              baseFrequency="0.018 0.006"
              numOctaves="4"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="0.8" result="softened" />
            <feMerge>
              <feMergeNode in="displaced" />
              <feMergeNode in="softened" />
            </feMerge>
          </filter>

          {/* Halo — wider, slower warp + diffuse glow */}
          <filter id="distort-halo" x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbulenceHaloRef}
              type="fractalNoise"
              baseFrequency="0.014 0.005"
              numOctaves="3"
              seed="9"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="8" result="halo" />
            <feColorMatrix
              in="halo"
              type="matrix"
              values="1 0 0 0 0.91
                      1 0 0 0 0.91
                      1 0 0 0 0.87
                      0 0 0 0.32 0"
              result="tintedHalo"
            />
            <feMerge>
              <feMergeNode in="tintedHalo" />
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>

          {/* Grain bound tightly to text shape */}
          <filter id="text-grain" x="-4%" y="-4%" width="108%" height="108%">
            <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className="relative flex flex-col items-center justify-center select-none">
        {/* Diffuse halo layer — sits behind, blurs outward */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#distort-halo)", opacity: 0.55 }}
        >
          <span
            className="italic text-white leading-none"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 7rem)",
              fontFamily: "var(--font-instrument-serif), serif",
              letterSpacing: "0.01em",
              fontWeight: 400,
            }}
          >
            Inigo Paolo
          </span>
        </div>

        {/* Primary distorted text — Instrument Serif italic for organic texture */}
        <h1
          className="relative italic text-white leading-none"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 7rem)",
            fontFamily: "var(--font-instrument-serif), serif",
            letterSpacing: "0.01em",
            fontWeight: 400,
            filter: "url(#distort-strong)",
          }}
        >
          Inigo Paolo
        </h1>

        {/* Grain layer — adds film-like speckle on the letterforms */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#text-grain)", mixBlendMode: "overlay", opacity: 0.45 }}
        >
          <span
            className="italic text-white leading-none"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 7rem)",
              fontFamily: "var(--font-instrument-serif), serif",
              letterSpacing: "0.01em",
              fontWeight: 400,
            }}
          >
            Inigo Paolo
          </span>
        </div>
      </div>
    </main>
  )
}
