"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsError(false)
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
        setIsError(false)
        // Optionally redirect to sign-in page after successful registration
        router.push("/signin")
      } else {
        setMessage(data.message || "Sign up failed.")
        setIsError(true)
      }
    } catch (error: any) {
      console.error("Client-side sign-up error:", error)
      setMessage("An unexpected error occurred. Please try again.")
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your details below to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          {message && (
            <p className={`mt-4 text-center text-sm ${isError ? "text-red-500" : "text-green-500"}`}>{message}</p>
          )}
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/signin" className="underline text-red-600 hover:text-red-700">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
