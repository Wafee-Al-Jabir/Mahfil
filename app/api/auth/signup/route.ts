import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectMongoDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    await connectMongoDB()
    const { username, email, password } = await request.json()

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return NextResponse.json({ message: "User with this email or username already exists" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ username, email, password: hashedPassword })

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Sign up error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
