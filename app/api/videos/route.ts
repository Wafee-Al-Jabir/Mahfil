import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Video from "@/models/Video"

export async function GET() {
  await dbConnect()

  try {
    const videos = await Video.find({})
    return NextResponse.json(videos, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching videos from MongoDB:", error)
    return NextResponse.json({ message: "Failed to fetch videos.", error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await dbConnect()

  try {
    const videoData = await req.json()
    const newVideo = await Video.create(videoData)
    return NextResponse.json({ message: "Video added successfully!", video: newVideo }, { status: 201 })
  } catch (error: any) {
    console.error("Error adding video to MongoDB:", error)
    return NextResponse.json({ message: "Failed to add video.", error: error.message }, { status: 500 })
  }
}
