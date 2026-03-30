import { list } from '@vercel/blob'

export interface BlobImage {
  pathname: string
  url: string
  size: number
  filename: string
  slideNumber: number
}

// Map project slugs to their blob folder names
const projectFolderMap: Record<string, string> = {
  "project-1": "project-1",
  "project-2": "project-2", 
  "rhino-project": "rhino-project",
  "model-photography": "model-photography",
  "clothing-brand": "clothing-brand",
  "car-photography": "car-photography",
}

export async function getProjectImagesFromBlob(projectSlug: string): Promise<BlobImage[]> {
  try {
    const folderName = projectFolderMap[projectSlug] || projectSlug
    const { blobs } = await list({ prefix: folderName })
    
    const images: BlobImage[] = []
    
    for (const blob of blobs) {
      // Only include image files
      if (!blob.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue
      
      const filename = blob.pathname.split('/').pop() || ''
      
      // Extract slide number from filename (e.g., "01.png" -> 1, "slide-02.jpg" -> 2)
      const match = filename.match(/(\d+)/)
      const slideNumber = match ? parseInt(match[1], 10) : 0
      
      images.push({
        pathname: blob.pathname,
        url: blob.url,
        size: blob.size,
        filename,
        slideNumber,
      })
    }
    
    // Sort by slide number
    images.sort((a, b) => a.slideNumber - b.slideNumber)
    
    return images
  } catch (error) {
    console.error(`Error fetching images for ${projectSlug}:`, error)
    return []
  }
}

export async function getAllProjectImages(): Promise<Record<string, BlobImage[]>> {
  try {
    const { blobs } = await list()
    
    const projects: Record<string, BlobImage[]> = {}
    
    for (const blob of blobs) {
      // Only include image files
      if (!blob.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue
      
      const parts = blob.pathname.split('/')
      const projectFolder = parts.length > 1 ? parts[0] : 'root'
      const filename = parts[parts.length - 1]
      
      // Extract slide number
      const match = filename.match(/(\d+)/)
      const slideNumber = match ? parseInt(match[1], 10) : 0
      
      if (!projects[projectFolder]) {
        projects[projectFolder] = []
      }
      
      projects[projectFolder].push({
        pathname: blob.pathname,
        url: blob.url,
        size: blob.size,
        filename,
        slideNumber,
      })
    }
    
    // Sort images in each project
    for (const images of Object.values(projects)) {
      images.sort((a, b) => a.slideNumber - b.slideNumber)
    }
    
    return projects
  } catch (error) {
    console.error('Error fetching all project images:', error)
    return {}
  }
}
