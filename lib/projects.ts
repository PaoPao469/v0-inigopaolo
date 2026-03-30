export interface ProjectImage {
  url: string
  caption?: string
  description?: string
}

export interface Project {
  slug: string
  title: string
  year: string
  location?: string
  description: string
  pageCount: number
  section: "architecture" | "photography" | "clothing"
  images?: ProjectImage[]  // Gallery images with descriptions
  tags?: string[]     // Project tags for filtering
  featured?: boolean  // Highlight on main page
}

// Architecture projects - Year 1 and Year 2 work
export const architectureProjects: Project[] = [
  {
    slug: "project-1",
    title: "Foundations + Visual Studies 1",
    year: "Year 1",
    description: "First year architecture portfolio showcasing foundational design skills, spatial understanding, and visual studies exploration. This collection demonstrates the development of core architectural principles and design thinking.",
    pageCount: 35,
    section: "architecture",
    tags: ["year-1", "foundations", "visual-studies"],
    featured: true,
    images: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg", caption: "Portfolio Cover", description: "Foundations + Visual Studies 1 Portfolio" },
    ],
  },
  {
    slug: "project-2",
    title: "Architectural Design II: Foundations",
    year: "Year 2",
    description: "Second year architecture project demonstrating advanced design thinking, conceptual development, and refined spatial compositions. This work explores deeper architectural concepts and construction principles.",
    pageCount: 12,
    section: "architecture",
    tags: ["year-2", "foundations"],
    images: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg", caption: "Portfolio Cover", description: "Architectural Design II: Foundations" },
    ],
  },
  {
    slug: "rhino-project",
    title: "Architectural Design II: Visual Studies",
    year: "Year 2",
    description: "Digital modeling project created using Rhino 3D, exploring parametric design and computational techniques. This project demonstrates proficiency in 3D modeling software and digital fabrication concepts.",
    pageCount: 6,
    section: "architecture",
    tags: ["year-2", "rhino", "3d-modeling", "visual-studies"],
    images: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg", caption: "Portfolio Cover", description: "Architectural Design II: Visual Studies" },
    ],
  },
]

// Photography projects - Car and Model photography
export const photographyProjects: Project[] = [
  {
    slug: "car-photography",
    title: "Car Photography",
    year: "2024",
    description: "Automotive photography series capturing the beauty and design of vehicles through creative composition and lighting techniques.",
    pageCount: 16,
    section: "photography",
    tags: ["automotive", "cars"],
    images: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car%20photography.png-PuNEl58kO63IX181I5gXtr3ILKvF1p.jpeg", caption: "Portfolio Cover", description: "Car Photography Collection" },
    ],
  },
  {
    slug: "model-photography",
    title: "Model Photography",
    year: "2024",
    description: "Portrait and fashion photography showcasing creative direction, lighting techniques, and collaborative work with models.",
    pageCount: 17,
    section: "photography",
    tags: ["portrait", "fashion", "model"],
    featured: true,
    images: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Model%20Photography.png-y2MtLFA3iLB3iyfdXPkng2jraLP1FR.jpeg", caption: "Katlego", description: "Portrait photography featuring creative styling and dynamic composition" },
    ],
  },
]

// Clothing projects
export const clothingProjects: Project[] = [
  {
    slug: "clothing-brand",
    title: "Horalta",
    year: "2024",
    description: "Original clothing brand concept featuring unique designs, gothic typography, and fashion pieces that blend streetwear aesthetics with artistic expression.",
    pageCount: 19,
    section: "clothing",
    tags: ["fashion", "branding", "design", "streetwear"],
    featured: true,
    images: [
      { url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clothing%20Brand.png-iT8yWNVcnho25dTpmjejj0L25DpEXU.jpeg", caption: "Brand Logo", description: "Horalta - Gothic-inspired clothing brand identity" },
    ],
  },
]

// Helper functions
export function getProjectsBySection(section: Project["section"]): Project[] {
  switch (section) {
    case "architecture":
      return architectureProjects
    case "photography":
      return photographyProjects
    case "clothing":
      return clothingProjects
    default:
      return []
  }
}

export function getProjectBySlug(section: Project["section"], slug: string): Project | undefined {
  return getProjectsBySection(section).find((p) => p.slug === slug)
}

export function getProjectImages(project: Project): ProjectImage[] {
  // Return the project's images array if available
  if (project.images && project.images.length > 0) {
    return project.images
  }
  // Fallback to thumbnail
  const thumbnail = projectThumbnails[project.slug]
  if (thumbnail) {
    return [{ url: thumbnail, caption: project.title }]
  }
  return []
}

// Fetch project images from Blob storage
export async function getBlobProjectImages(section: string, slug: string): Promise<string[]> {
  try {
    const response = await fetch('/api/blob-images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ section, slug }),
    })
    if (!response.ok) return []
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Error fetching blob images:', error)
    return []
  }
}

// Direct URLs for project cover images (from user's blob storage)
const projectThumbnails: Record<string, string> = {
  "project-1": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%201.png-Cq2oOdEFNtCXLlhI3NYz9d1WyfsQ4d.jpeg",
  "project-2": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/project%202.png-Nrnh2KD5R14zxwftxOj318BRF4PtN0.jpeg",
  "rhino-project": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Rhino%20Project.png-jNU56elsezwSUzWM9gwcP2H6ku3bZq.jpeg",
  "car-photography": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/car%20photography.png-PuNEl58kO63IX181I5gXtr3ILKvF1p.jpeg",
  "model-photography": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Model%20Photography.png-y2MtLFA3iLB3iyfdXPkng2jraLP1FR.jpeg",
  "clothing-brand": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Clothing%20Brand.png-iT8yWNVcnho25dTpmjejj0L25DpEXU.jpeg",
}

export function getProjectThumbnail(project: Project): string {
  return projectThumbnails[project.slug] || `/images/${project.section}/${project.slug}/page-1.png`
}

export function getAdjacentProjects(section: Project["section"], currentSlug: string): {
  prev: Project | null
  next: Project | null
} {
  const projects = getProjectsBySection(section)
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug)
  
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  }
}

export function getPageDescription(project: Project, pageNumber: number): string | undefined {
  return project.pages?.find(p => p.pageNumber === pageNumber)?.description
}

export function getPageCaption(project: Project, pageNumber: number): string | undefined {
  return project.pages?.find(p => p.pageNumber === pageNumber)?.caption
}

// Load extracted project data from JSON (for dynamic imports)
export async function loadProjectMetadata(section: string, slug: string): Promise<{
  pages: Array<{
    pageNumber: number
    imagePath: string
    textContent: string
    width: number
    height: number
  }>
} | null> {
  try {
    const response = await fetch(`/images/${section}/${slug}/project.json`)
    if (!response.ok) return null
    return response.json()
  } catch {
    return null
  }
}
