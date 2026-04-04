export interface ClothingSection {
  id: string
  label: string
  thumbnail: string
  images: string[]
}

export interface ClothingBrand {
  slug: string
  label: string
  thumbnail: string
  description: string
  sections: ClothingSection[]
}

export const clothingData: Record<string, ClothingBrand> = {
  sukasa: {
    slug: "sukasa",
    label: "SUKASA",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
    description: "Contemporary streetwear brand blending minimalist aesthetics with bold design elements.",
    sections: [
      {
        id: "final-product",
        label: "FINAL PRODUCT",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
        ],
      },
      {
        id: "tech-pack",
        label: "TECH PACK",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Drune%20_%20Cape%20Mantel%20-%20Braun%20_%20M-67ernUIIpVC5ebfSdRvUazky9jP1TG.jpeg",
        ],
      },
    ],
  },
}

// Helper functions
export function getAllClothingBrands() {
  return Object.values(clothingData)
}

export function getClothingBrandBySlug(slug: string) {
  return clothingData[slug] || null
}

export function getAllClothingSlugs() {
  return Object.keys(clothingData)
}

export function getSectionById(brandSlug: string, sectionId: string) {
  const brand = clothingData[brandSlug]
  if (!brand) return null
  return brand.sections.find((s) => s.id === sectionId) || null
}

export function getAllSectionSlugs() {
  const slugs: { brand: string; section: string }[] = []
  for (const brand of Object.values(clothingData)) {
    for (const section of brand.sections) {
      slugs.push({ brand: brand.slug, section: section.id })
    }
  }
  return slugs
}
