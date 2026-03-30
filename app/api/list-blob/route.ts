import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const prefix = searchParams.get('prefix') || ''
    
    const { blobs } = await list({ prefix })

    // Group blobs by project folder
    const projects: Record<string, { images: Array<{ pathname: string; url: string; size: number; filename: string }> }> = {}
    
    for (const blob of blobs) {
      // Skip non-image files
      if (!blob.pathname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue
      
      // Extract project folder from pathname
      const parts = blob.pathname.split('/')
      const projectFolder = parts.length > 1 ? parts[0] : 'root'
      const filename = parts[parts.length - 1]
      
      if (!projects[projectFolder]) {
        projects[projectFolder] = { images: [] }
      }
      
      projects[projectFolder].images.push({
        pathname: blob.pathname,
        url: blob.url,
        size: blob.size,
        filename,
      })
    }
    
    // Sort images within each project by filename
    for (const project of Object.values(projects)) {
      project.images.sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true }))
    }

    return NextResponse.json({
      total: blobs.length,
      projects,
    })
  } catch (error) {
    console.error('Error listing blobs:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}
