"use client"

export default function PulsingCircle() {
  return (
    <div className="absolute bottom-8 right-8 z-30">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Simple CSS pulsing border circle - replaces heavy WebGL shader */}
        <div 
          className="absolute w-[60px] h-[60px] rounded-full animate-pulse-border"
          style={{
            background: "conic-gradient(from 0deg, #BEECFF, #E77EDC, #FF4C3E, #00FF88, #FFD700, #FF6B35, #8A2BE2, #BEECFF)",
            padding: "3px",
          }}
        >
          <div className="w-full h-full rounded-full bg-black" />
        </div>

        {/* Rotating Text Around the Pulsing Border - using CSS animation for GPU performance */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin-slow"
          viewBox="0 0 100 100"
          style={{ 
            transform: "scale(1.6)",
          }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-sm fill-white/80 instrument">
            <textPath href="#circle" startOffset="0%">
              v0 is amazing • v0 is amazing • v0 is amazing • v0 is amazing •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  )
}
