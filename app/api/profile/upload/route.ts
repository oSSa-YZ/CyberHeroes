import { NextRequest, NextResponse } from "next/server"
import { verifySessionToken } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("session")?.value
    const res = verifySessionToken(token)
    if (!res.valid || !res.username) {
      return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ ok: false, error: 'File must be an image' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: 'File too large (max 5MB)' }, { status: 400 })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'profiles')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Generate unique filename
    const fileExtension = file.name.split('.').pop()
    const fileName = `${res.username}-${Date.now()}.${fileExtension}`
    const filePath = join(uploadsDir, fileName)

    // Save file
    const bytes = await file.arrayBuffer()
    await writeFile(filePath, Buffer.from(bytes))

    // Return the public URL
    const publicUrl = `/uploads/profiles/${fileName}`
    return NextResponse.json({ ok: true, url: publicUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ ok: false, error: 'Upload failed' }, { status: 500 })
  }
}
