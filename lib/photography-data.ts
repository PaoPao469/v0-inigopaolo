// Photography data structure
export const photographyData = {
  "car-photography": {
    label: "CAR PHOTOGRAPHY",
    slug: "car-photography",
    thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_3942-2gZxuflBrsQ9xubXksxh9W00bFvrfN.jpg",
    description: "Automotive photography capturing the beauty and design of iconic vehicles.",
    subsections: [
      {
        id: "ferrari",
        title: "FERRARI",
        images: [
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_3942-2gZxuflBrsQ9xubXksxh9W00bFvrfN.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4012-3-JsFZnSAHUVsQj7hhjT6V5Ak9qzsNUc.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_3959-5-ykAb7m0aY8Ow6CjX9e71dJ8xN1TJNp.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4100-TddR4TB0wSkkoI3P05kcYrOLFMb5fI.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4007-5-4-MqI4u7XHm38aEN51IrNmlzDTkvrvvL.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4066-VSbv50gJnwSUXFUO4V4fZ6hLlxeGgG.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4071-jntAwXPBcGbILCkYgGLrrZehsP0GGE.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4062-3-iPF7N641r4tPEBgXGqRusQ9Qj3hpSg.jpg",
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
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4352-2-EkCljfdEphyXNBZNkhZfjR5faA1gBk.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4367-4-8S7mDGVQAILYY8532Pbsktzzeo7E0p.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4235-4-Xbh5GcluMT05iFyxn61XOYXnyBOJ6Z.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4321-ucBD6Vo6b7tAefIPHEZVKSxc6qxs2X.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4325-2-AbrCqWPXLfId0jNUmHs9NBZ0yJth9k.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4312-jsEPdtqIjQtYnad99kDK1C0kDin6dp.jpg",
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC_4384-2N41yCIj1y2sIB5uPK5sTFvYt6NsPt.jpg",
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
