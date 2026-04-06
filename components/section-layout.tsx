"use client"

import type React from "react"
import Header from "@/components/header"
import SlimeCursor from "@/components/slime-cursor"

interface SectionLayoutProps {
  children: React.ReactNode
}

export default function SectionLayout({ children }: SectionLayoutProps) {
  return (
    <>
      <SlimeCursor />
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#000000", isolation: "isolate" }}>
        {/* Static gradient background - matches main menu without animation */}
        <div 
          className="fixed inset-0 w-full h-full" 
          style={{ filter: "contrast(1.4) brightness(1.05)" }}
        >
          {/* Static gradient layers simulating the draped fabric effect */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: `
                radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 60%, rgba(255,255,255,0.12) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 80%, rgba(250,250,250,0.08) 0%, transparent 40%),
                radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.1) 0%, transparent 35%),
                linear-gradient(135deg, #000000 0%, #050608 25%, #000000 50%, #030406 75%, #000000 100%)
              `,
              backgroundColor: "#000000",
            }}
          />
          {/* Secondary diagonal flow layer */}
          <div 
            className="absolute inset-0 w-full h-full opacity-60"
            style={{
              background: `
                radial-gradient(ellipse at 30% 70%, rgba(245,245,245,0.08) 0%, transparent 40%),
                radial-gradient(ellipse at 75% 25%, rgba(255,255,255,0.1) 0%, transparent 35%),
                radial-gradient(ellipse at 45% 45%, rgba(232,229,220,0.06) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        {/* Blue-gray shadow tint overlay — subtle depth in dark zones */}
        <div
          aria-hidden="true"
          className="fixed inset-0 w-full h-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 30% 70%, rgba(10,14,18,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(10,14,18,0.3) 0%, transparent 50%)",
          }}
        />

        {/* Heavy fractal noise grain — matches main menu */}
        <div
          aria-hidden="true"
          className="grain-overlay fixed inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "512px 512px",
            opacity: 0.7,
            mixBlendMode: "overlay",
          }}
        />

        {/* Secondary grain layer — finer texture */}
        <div
          aria-hidden="true"
          className="grain-overlay-secondary fixed inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
            opacity: 0.5,
            mixBlendMode: "soft-light",
          }}
        />

        {/* Speckle grain — particle highlights */}
        <div
          aria-hidden="true"
          className="grain-speckle fixed inset-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ns'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.0' numOctaves='4' stitchTiles='stitch'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='discrete' tableValues='0 1'/%3E%3CfeFuncG type='discrete' tableValues='0 1'/%3E%3CfeFuncB type='discrete' tableValues='0 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ns)' opacity='0.6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
            opacity: 0.22,
            mixBlendMode: "color-dodge",
          }}
        />

        <Header />
        
        <main className="relative z-10 pt-24 pb-16 px-6 md:px-12 lg:px-20">
          {children}
        </main>
      </div>
    </>
  )
}
