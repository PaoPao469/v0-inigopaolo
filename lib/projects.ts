export interface PageInfo {
  pageNumber: number
  description?: string
  caption?: string
}

export interface Project {
  slug: string
  title: string
  year: string
  location?: string
  description: string
  pageCount: number
  section: "architecture" | "photography" | "clothing"
  pages?: PageInfo[]  // Optional per-page descriptions extracted from PDF
  tags?: string[]     // Project tags for filtering
  featured?: boolean  // Highlight on main page
}

// Architecture projects - Year 1 and Year 2 work
export const architectureProjects: Project[] = [
  {
    slug: "project-1",
    title: "Project 1",
    year: "Year 1",
    description: "First year architecture project showcasing foundational design skills and spatial understanding.",
    pageCount: 35,
    section: "architecture",
    tags: ["year-1"],
    featured: true,
  },
  {
    slug: "project-2",
    title: "Project 2",
    year: "Year 2",
    description: "Second year architecture project demonstrating advanced design thinking and conceptual development.",
    pageCount: 12,
    section: "architecture",
    tags: ["year-2"],
  },
  {
    slug: "rhino-project",
    title: "Rhino Project",
    year: "Year 2",
    description: "Digital modeling project created using Rhino 3D, exploring parametric design and computational techniques.",
    pageCount: 6,
    section: "architecture",
    tags: ["year-2", "rhino", "3d-modeling"],
  },
]

// Photography projects - Car and Model photography
export const photographyProjects: Project[] = [
  {
    slug: "car-photography",
    title: "Car Photography",
    year: "2024",
    description: "Automotive photography series capturing the beauty and design of vehicles through creative composition and lighting.",
    pageCount: 0, // File link unavailable - to be uploaded
    section: "photography",
    tags: ["automotive", "cars"],
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
  },
]

// Clothing projects
export const clothingProjects: Project[] = [
  {
    slug: "clothing-brand",
    title: "Clothing Brand",
    year: "2024",
    description: "Original clothing brand concept featuring unique designs, branding materials, and fashion pieces.",
    pageCount: 19,
    section: "clothing",
    tags: ["fashion", "branding", "design"],
    featured: true,
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

export function getProjectImages(project: Project): string[] {
  const prefix = projectBlobPrefixes[project.slug]
  if (prefix && project.pageCount > 0) {
    return Array.from({ length: project.pageCount }, (_, i) => {
      const pageNum = String(i + 1).padStart(2, '0')
      return `${BLOB_BASE_URL}/${prefix}-${pageNum}.png`
    })
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

// Blob storage base URL for portfolio images
const BLOB_BASE_URL = "https://qh5hx3paeqwuc7ch.public.blob.vercel-storage.com"

// Map project slugs to their blob folder/file prefixes
const projectBlobPrefixes: Record<string, string> = {
  "project-1": "project%201/project%201",
  "project-2": "project%202/project%202",
  "rhino-project": "rhino%20project/rhino%20project",
  "car-photography": "car%20photography/car%20photography",
  "model-photography": "Model%20Photography/Model%20Photography",
  "clothing-brand": "Clothing%20Brand/Clothing%20Brand",
}

export function getProjectThumbnail(project: Project): string {
  const prefix = projectBlobPrefixes[project.slug]
  if (prefix) {
    return `${BLOB_BASE_URL}/${prefix}-01.png`
  }
  return `/images/${project.section}/${project.slug}/page-1.png`
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
