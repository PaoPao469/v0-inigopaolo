export default function HeroContent() {
  return (
    <main className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      {/* SVG filter for subtle text grain effect */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <defs>
          {/* Subtle grain noise clipped to text */}
          <filter id="text-grain-subtle" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="textured" />
            <feComposite in="textured" in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      </svg>

      <h1
        style={{
          fontFamily: "var(--font-chillax), sans-serif",
          fontWeight: 500,
          fontSize: "34px",
          letterSpacing: "0.28em",
          color: "rgba(180, 175, 165, 0.68)",
          lineHeight: 1,
          margin: 0,
          filter: "url(#text-grain-subtle)",
        }}
      >
        INIGO PAOLO
      </h1>
    </main>
  )
}
