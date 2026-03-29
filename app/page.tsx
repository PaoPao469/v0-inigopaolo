"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import SlimeCursor from "@/components/slime-cursor"

export default function ShaderShowcase() {
  return (
    <>
      <SlimeCursor />
      <ShaderBackground>
        <Header />
        <HeroContent />
        <PulsingCircle />
      </ShaderBackground>
    </>
  )
}
