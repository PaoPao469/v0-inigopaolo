"use client"

import { useEffect, useRef } from "react"

export default function HeroContent() {
  const svgRef = useRef<SVGSVGElement>(null)

  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      {/* SVG distortion filters */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          {/* Strong turbulence displacement for the main distort effect */}
          <filter id="distort-strong" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.022 0.008"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="38"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="1.2" result="blurred" />
            <feMerge>
              <feMergeNode in="displaced" />
              <feMergeNode in="blurred" />
            </feMerge>
          </filter>

          {/* Edge blur + glow — diffuse halo like the reference */}
          <filter id="distort-halo" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.006"
              numOctaves="4"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="28"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="6" result="halo" />
            <feColorMatrix
              in="halo"
              type="matrix"
              values="1 0 0 0 0.9
                      1 0 0 0 0.9
                      1 0 0 0 0.9
                      0 0 0 0.45 0"
              result="tintedHalo"
            />
            <feMerge>
              <feMergeNode in="tintedHalo" />
              <feMergeNode in="displaced" />
            </feMerge>
          </filter>

          {/* Grain noise on text */}
          <filter id="text-grain" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
            <feComposite in="blended" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <div className="relative flex flex-col items-center justify-center select-none">
        {/* Halo / diffuse layer — renders behind, blurred outward */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#distort-halo)", opacity: 0.6 }}
        >
          <span
            className="font-black uppercase tracking-[-0.03em] text-white leading-none"
            style={{
              fontSize: "clamp(4rem, 13vw, 11rem)",
              fontFamily: "var(--font-figtree), sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Inigo Paolo
          </span>
        </div>

        {/* Primary distorted text */}
        <h1
          className="relative font-black uppercase text-white leading-none"
          style={{
            fontSize: "clamp(4rem, 13vw, 11rem)",
            fontFamily: "var(--font-figtree), sans-serif",
            letterSpacing: "-0.02em",
            filter: "url(#distort-strong)",
          }}
        >
          Inigo Paolo
        </h1>

        {/* Grain overlay on text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: "url(#text-grain)", mixBlendMode: "overlay", opacity: 0.5 }}
        >
          <span
            className="font-black uppercase text-white leading-none"
            style={{
              fontSize: "clamp(4rem, 13vw, 11rem)",
              fontFamily: "var(--font-figtree), sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Inigo Paolo
          </span>
        </div>
      </div>
    </main>
  )
}
