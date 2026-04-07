export interface ClothingSection {
  id: string
  label: string
  thumbnail: string
  images: string[]
  isTechPack?: boolean
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
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-FIQbIlAaHseIHcUfdTVtTOk6Y5vGxU.jpg",
    description: "Contemporary streetwear brand blending minimalist aesthetics with bold design elements.",
    sections: [
      {
        id: "lookbook",
        label: "LOOKBOOK",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.JPG-cfKSxDMhEQMj5wCwedz9164WGXyRmi.jpeg",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-FIQbIlAaHseIHcUfdTVtTOk6Y5vGxU.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2.JPG-cfKSxDMhEQMj5wCwedz9164WGXyRmi.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3.JPG-r1mPF6xY618lF2IgFp2hi5PQtrfibu.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4.JPG-5bAgw29dt9WFcZp2N6n9KXlI8Fwyvs.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-dckppHJknnTKPwPAt5C3jRDiz2pBe3.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-N5VO2IycMMwDu5cjrIFNwN5MpoKFA3.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.JPG-dIb1jv13UNxbxEp1gn2KUFb311VT1R.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8.JPG-x7ax3gB31JGrUFywGOZNcAyUniFIdF.jpeg",
        ],
      },
      {
        id: "tech-pack",
        label: "TECH PACK",
        thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec%201-qg2bofaOq1a7Jjrcwva4nPYJsNTLxc.jpg",
        isTechPack: true,
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec%201-qg2bofaOq1a7Jjrcwva4nPYJsNTLxc.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec%202-q8XRfl8WVEIscd3CsscBFhqXn3rPUp.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec%203-YhM7z7XuAa7eU8TWRy75xl9M7rZeVw.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec%204-XO3kjiGPQJsbNdyAhP3fq0RC5omgAq.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec%205-EaPvZLn7kRyWLJStRmaVp2djonTyDW.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec%206-GYpjch5Asns5Rm2K4M0PeVDKy7wcUG.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tec%207-mMd8j2useDhJg7p9seJSb5Qc6RT03v.jpg",
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
