import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  await dbConnect()

  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists." }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ email, password: hashedPassword })

    return NextResponse.json({ message: "User registered successfully!", user: newUser.email }, { status: 201 })
  } catch (error: any) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "Internal server error.", error: error.message }, { status: 500 })
  }
}
