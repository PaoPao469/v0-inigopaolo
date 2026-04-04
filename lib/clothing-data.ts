export interface ClothingSection {
  id: string
  label: string
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
    thumbnail: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&auto=format&fit=crop&q=80",
    description: "Contemporary streetwear brand blending minimalist aesthetics with bold design elements.",
    sections: [
      {
        id: "final-product",
        label: "FINAL PRODUCT",
        images: [
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1485218126466-34e6392ec754?w=800&auto=format&fit=crop&q=80",
        ],
      },
      {
        id: "tech-pack",
        label: "TECH PACK",
        images: [
          "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80",
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
