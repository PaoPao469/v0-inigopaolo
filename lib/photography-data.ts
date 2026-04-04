// Photography data structure
export const photographyData = {
  "car-photography": {
    label: "CAR PHOTOGRAPHY",
    slug: "car-photography",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car%20photography.png-PuNEl58kO63IX181I5gXtr3ILKvF1p.jpeg",
    description: "Automotive photography capturing the beauty and design of iconic vehicles.",
    subsections: [
      {
        id: "ferrari",
        title: "FERRARI",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car%20photography.png-PuNEl58kO63IX181I5gXtr3ILKvF1p.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
        ],
      },
      {
        id: "shelby",
        title: "SHELBY",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car%20photography.png-PuNEl58kO63IX181I5gXtr3ILKvF1p.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
        ],
      },
      {
        id: "toyota",
        title: "TOYOTA",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car%20photography.png-PuNEl58kO63IX181I5gXtr3ILKvF1p.jpeg",
        ],
      },
    ],
  },
  "model-photography": {
    label: "MODEL PHOTOGRAPHY",
    slug: "model-photography",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Model%20Photography.png-y2MtLFA3iLB3iyfdXPkng2jraLP1FR.jpeg",
    description: "Portrait and fashion photography showcasing creative direction and lighting techniques.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Model%20Photography.png-y2MtLFA3iLB3iyfdXPkng2jraLP1FR.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car%20photography.png-PuNEl58kO63IX181I5gXtr3ILKvF1p.jpeg",
    ],
  },
}

export type PhotographyCategory = keyof typeof photographyData

// Get all category slugs
export function getAllPhotographySlugs() {
  return Object.keys(photographyData)
}

// Get category data by slug
export function getPhotographyCategory(slug: string) {
  return photographyData[slug as PhotographyCategory]
}

// Check if a category has subsections (like Car Photography)
export function hasSubsections(slug: string) {
  const category = getPhotographyCategory(slug)
  return category && "subsections" in category
}

// Get subsection by ID within a category
export function getSubsection(categorySlug: string, subsectionId: string) {
  const category = getPhotographyCategory(categorySlug)
  if (category && "subsections" in category) {
    return category.subsections.find((s) => s.id === subsectionId)
  }
  return null
}
