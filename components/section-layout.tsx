"use client"

import type React from "react"
import Header from "@/components/header"
import SlimeCursor from "@/components/slime-cursor"

interface SectionLayoutProps {
  children: React.ReactNode
  plainBackground?: boolean
}

export default function SectionLayout({ children, plainBackground = false }: SectionLayoutProps) {
  return (
    <>
      <SlimeCursor />
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#000000", isolation: "isolate" }}>
        {/* Conditional background - plain black for project pages, styled gradient for collections */}
        {!plainBackground && (
          <>
            {/* Static gradient background - matches main menu without animation */}
            <div 
              className="fixed inset-0 w-full h-full" 
              style={{ filter: "contrast(1.4) brightness(1.05)" }}
            >
              {/* Primary silk ribbon layer — stark white highlights matching main menu */}
              <div 
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `
                    radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255,255,255,0.45) 0%, transparent 55%),
                    radial-gradient(ellipse 70% 50% at 85% 55%, rgba(255,255,255,0.4) 0%, transparent 50%),
                    radial-gradient(ellipse 90% 70% at 50% 85%, rgba(250,250,250,0.35) 0%, transparent 45%),
                    radial-gradient(ellipse 60% 45% at 75% 15%, rgba(255,255,255,0.38) 0%, transparent 40%),
                    radial-gradient(ellipse 50% 40% at 10% 70%, rgba(250,250,250,0.32) 0%, transparent 45%),
                    linear-gradient(135deg, #000000 0%, #050608 25%, #000000 50%, #030406 75%, #000000 100%)
                  `,
                  backgroundColor: "#000000",
                }}
              />
              {/* Secondary diagonal flow layer — high-contrast bent light beams */}
              <div 
                className="absolute inset-0 w-full h-full opacity-80"
                style={{
                  background: `
                    radial-gradient(ellipse 100% 80% at 30% 65%, rgba(245,245,245,0.35) 0%, transparent 50%),
                    radial-gradient(ellipse 80% 60% at 70% 25%, rgba(255,255,255,0.4) 0%, transparent 45%),
                    radial-gradient(ellipse 60% 50% at 45% 45%, rgba(232,229,220,0.28) 0%, transparent 55%)
                  `,
                }}
              />
              {/* Tertiary layer — dramatic angular sweeps */}
              <div 
                className="absolute inset-0 w-full h-full opacity-50"
                style={{
                  background: `
                    radial-gradient(ellipse 120% 90% at 60% 40%, rgba(255,255,255,0.3) 0%, transparent 50%),
                    radial-gradient(ellipse 70% 55% at 15% 50%, rgba(250,250,250,0.25) 0%, transparent 45%)
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
          </>
        )}

        <Header />
        
        <main className="relative z-10 pt-24 pb-16 px-6 md:px-12 lg:px-20">
          {children}
        </main>
      </div>
    </>
  )
}
