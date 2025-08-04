"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign-in logic here
    console.log("Sign In submitted")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your email below to sign in to your account</CardDescription>
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
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-red-600 hover:text-red-700">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
