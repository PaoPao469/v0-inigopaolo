import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list({
      prefix: 'portfolio/',
    })

    // Group blobs by project folder
    const projects: Record<string, { pathname: string; url: string; filename: string }[]> = {}

    for (const blob of blobs) {
      const parts = blob.pathname.split('/')
      if (parts.length >= 3) {
        const projectName = parts[1]
        if (!projects[projectName]) {
          projects[projectName] = []
        }
        projects[projectName].push({
          pathname: blob.pathname,
          url: blob.url,
          filename: blob.pathname.split('/').pop() || 'unknown',
        })
      }
    }

    // Sort pages within each project
    Object.keys(projects).forEach((projectName) => {
      projects[projectName].sort((a, b) => {
        const aNum = parseInt(a.filename.match(/\d+/)?.[0] ?? '999')
        const bNum = parseInt(b.filename.match(/\d+/)?.[0] ?? '999')
        return aNum - bNum
      })
    })

    return NextResponse.json({
      projects,
      summary: Object.entries(projects).map(([name, images]) => ({
        name,
        pageCount: images.length,
      })),
    })
  } catch (error) {
    console.error('Error listing portfolio:', error)
    return NextResponse.json({ error: 'Failed to list portfolio' }, { status: 500 })
  }
}
