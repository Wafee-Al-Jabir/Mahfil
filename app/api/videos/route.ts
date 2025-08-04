import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Video from "@/models/Video"

export async function GET() {
  await dbConnect()

  try {
    const videos = await Video.find({})
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Error fetching videos from MongoDB:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

// You might also want to add a POST route to seed data or add new videos
export async function POST(req: Request) {
  await dbConnect()

  try {
    const body = await req.json()
    const newVideo = await Video.create(body)
    return NextResponse.json(newVideo, { status: 201 })
  } catch (error) {
    console.error("Error adding video to MongoDB:", error)
    return NextResponse.json({ error: "Failed to add video" }, { status: 500 })
  }
}
