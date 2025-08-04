import { NextResponse } from "next/server"
import connectMongoDB from "@/lib/mongodb"
import Video from "@/models/Video"

export async function GET() {
  try {
    await connectMongoDB()
    const videos = await Video.find({})
    return NextResponse.json(videos, { status: 200 })
  } catch (error) {
    console.error("Error fetching videos:", error)
    return NextResponse.json({ message: "Error fetching videos" }, { status: 500 })
  }
}
