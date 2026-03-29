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
      <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
        {/* Grain overlay for consistent texture */}
        <div
          aria-hidden="true"
          className="grain-overlay fixed inset-0 w-full h-full pointer-events-none z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "512px 512px",
            opacity: 0.35,
            mixBlendMode: "overlay",
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
