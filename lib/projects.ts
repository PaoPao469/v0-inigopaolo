export interface Project {
  slug: string
  title: string
  year: string
  location?: string
  description: string
  pageCount: number
  section: "architecture" | "photography" | "clothing"
}

// Architecture projects - update this array with your actual projects
export const architectureProjects: Project[] = [
  {
    slug: "project-1",
    title: "Project Title 1",
    year: "2024",
    location: "City, Country",
    description: "Brief description of your first architecture project. Explain the concept, challenges, and your design approach.",
    pageCount: 4,
    section: "architecture",
  },
  {
    slug: "project-2",
    title: "Project Title 2",
    year: "2024",
    location: "City, Country",
    description: "Brief description of your second architecture project.",
    pageCount: 3,
    section: "architecture",
  },
  {
    slug: "project-3",
    title: "Project Title 3",
    year: "2023",
    location: "City, Country",
    description: "Brief description of your third architecture project.",
    pageCount: 5,
    section: "architecture",
  },
]

export const photographyProjects: Project[] = []

export const clothingProjects: Project[] = []

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
  return Array.from({ length: project.pageCount }, (_, i) => 
    `/images/${project.section}/${project.slug}/page-${i + 1}.jpg`
  )
}

export function getProjectThumbnail(project: Project): string {
  return `/images/${project.section}/${project.slug}/page-1.jpg`
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
