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

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials." }, { status: 401 })
    }

    // In a real application, you would generate and return a JWT or set a session cookie here.
    // For this example, we'll just return a success message.
    return NextResponse.json({ message: "Sign in successful!", user: user.email }, { status: 200 })
  } catch (error: any) {
    console.error("Signin error:", error)
    return NextResponse.json({ message: "Internal server error.", error: error.message }, { status: 500 })
  }
}
