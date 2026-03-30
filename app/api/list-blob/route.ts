import { list } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { blobs } = await list()

    console.log('[v0] Blob storage contents:', blobs.map(b => b.pathname))

    return NextResponse.json({
      files: blobs.map((blob) => ({
        pathname: blob.pathname,
        url: blob.url,
        size: blob.size,
      })),
    })
  } catch (error) {
    console.error('[v0] Error listing blobs:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}
