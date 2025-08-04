"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Bell,
  Menu,
  Home,
  Compass,
  Youtube,
  History,
  ThumbsUp,
  Clock,
  Settings,
  Flag,
  HelpCircle,
  MessageSquare,
} from "lucide-react"
import { useTheme } from "next-themes"
import { YouTubeLogoLight } from "@/components/youtube-logo-light"
import { YouTubeLogoDark } from "@/components/youtube-logo-dark"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

interface Video {
  _id: string
  title: string
  thumbnailUrl: string
  channelName: string
  views: number
  uploadDate: string
  channelAvatarUrl: string
}

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/api/videos")
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setVideos(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const sidebarItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Explore", href: "#" },
    { icon: Youtube, label: "Subscriptions", href: "#" },
    { icon: History, label: "History", href: "#" },
    { icon: ThumbsUp, label: "Liked videos", href: "#" },
    { icon: Clock, label: "Watch later", href: "#" },
  ]

  const moreItems = [
    { icon: Settings, label: "Settings", href: "#" },
    { icon: Flag, label: "Report history", href: "#" },
    { icon: HelpCircle, label: "Help", href: "#" },
    { icon: MessageSquare, label: "Send feedback", href: "#" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <ScrollArea className="h-full py-4">
                  <div className="px-4 pb-4">
                    <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                      {theme === "dark" ? (
                        <YouTubeLogoDark className="h-6 w-auto" />
                      ) : (
                        <YouTubeLogoLight className="h-6 w-auto" />
                      )}
                      <span className="sr-only">YouTube Clone</span>
                    </Link>
                  </div>
                  <nav className="grid gap-1 px-4">
                    {sidebarItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <Separator className="my-4" />
                  <div className="px-4 text-sm font-semibold text-muted-foreground">More from YouTube</div>
                  <nav className="grid gap-1 px-4 mt-2">
                    {moreItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        prefetch={false}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
              {theme === "dark" ? (
                <YouTubeLogoDark className="h-6 w-auto" />
              ) : (
                <YouTubeLogoLight className="h-6 w-auto" />
              )}
              <span className="sr-only">YouTube Clone</span>
            </Link>
          </div>
          <div className="flex-1 max-w-md mx-auto px-4">
            {" "}
            {/* Added px-4 for horizontal padding */}
            <div className="relative flex w-full items-center">
              <Input type="search" placeholder="Search" className="w-full rounded-full pl-4 pr-10 py-2" />
              <Button type="submit" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/signin" prefetch={false}>
                    Sign In
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/signup" prefetch={false}>
                    Sign Up
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  Toggle Theme
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-full text-center text-red-500">Error loading videos: {error}</div>
        ) : (
          videos.map((video) => (
            <Link key={video._id} href={`/watch/${video._id}`} className="group block" prefetch={false}>
              <div className="relative w-full aspect-video overflow-hidden rounded-lg">
                <Image
                  src={video.thumbnailUrl || "/placeholder.svg?height=200&width=300&query=video thumbnail"}
                  alt={`Thumbnail for ${video.title}`}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start gap-3 mt-3">
                <Avatar className="w-9 h-9">
                  <AvatarImage
                    src={video.channelAvatarUrl || "/placeholder-user.jpg"}
                    alt={`Avatar of ${video.channelName}`}
                  />
                  <AvatarFallback>{video.channelName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <h3 className="text-base font-semibold leading-tight line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.channelName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatViews(video.views)} views • {video.uploadDate}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </main>
    </div>
  )
}
