import { list } from '@vercel/blob'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { section, slug } = await request.json()

    if (!section || !slug) {
      return NextResponse.json(
        { error: 'Missing section or slug' },
        { status: 400 }
      )
    }

    // List all blobs under portfolio/[section]/[slug]/
    const prefix = `portfolio/${section}/${slug}/`
    const { blobs } = await list({ prefix })

    // Filter for image files and sort by page number
    const imageBlobs = blobs
      .filter((blob) => /\.(jpg|jpeg|png|webp)$/i.test(blob.pathname))
      .map((blob) => ({
        url: blob.url,
        pathname: blob.pathname,
        filename: blob.pathname.split('/').pop() || '',
      }))
      .sort((a, b) => {
        const aNum = parseInt(a.filename.match(/\d+/)?.[0] ?? '999')
        const bNum = parseInt(b.filename.match(/\d+/)?.[0] ?? '999')
        return aNum - bNum
      })

    return NextResponse.json({
      images: imageBlobs.map((blob) => blob.url),
      count: imageBlobs.length,
    })
  } catch (error) {
    console.error('[v0] Error fetching blob images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}
