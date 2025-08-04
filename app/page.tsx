"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Menu,
  Search,
  Video,
  Bell,
  User,
  Home,
  TrendingUp,
  Music,
  Film,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
  Play,
  X,
  AlertCircle,
  MoreVertical,
  RotateCw,
  Sun,
  Moon,
} from "lucide-react"
import { YouTubeLogoDark } from "@/components/youtube-logo-dark"
import { YouTubeLogoLight } from "@/components/youtube-logo-light"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function YouTubeClonePage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Mock data as fallback
  const mockVideos = [
    {
      id: "mock1",
      title: "Building a Modern Web Application with Vue 3 and Tailwind CSS",
      channel: "Tech Tutorials",
      views: "1.2M views",
      timeAgo: "2 days ago",
      duration: "15:30",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Vue+3+Tutorial",
      channelInitial: "T",
      description:
        "Learn how to build modern web applications using Vue 3 and Tailwind CSS. This comprehensive tutorial covers everything from setup to deployment.",
      type: "video",
    },
    {
      id: "mock2",
      title: "10 JavaScript Tips Every Developer Should Know",
      channel: "Code Masters",
      views: "856K views",
      timeAgo: "1 week ago",
      duration: "12:45",
      thumbnail: "/placeholder.svg?height=180&width=320&text=JavaScript+Tips",
      channelInitial: "C",
      description:
        "Discover 10 essential JavaScript tips that will make you a better developer. From ES6 features to performance optimization.",
      type: "video",
    },
    {
      id: "mock_clip1",
      title: "Daily Muslim Prayer Reminder",
      channel: "Muslims Day Clips",
      views: "50K views",
      timeAgo: "3 hours ago",
      duration: "01:15",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Prayer+Clip",
      channelInitial: "M",
      description: "A short clip reminding about daily prayers and their importance.",
      type: "clip",
    },
    {
      id: "mock_clip2",
      title: "Short Quran Recitation",
      channel: "Islamic Clips",
      views: "120K views",
      timeAgo: "1 day ago",
      duration: "02:00",
      thumbnail: "/placeholder.svg?height=180&width=320&text=Quran+Clip",
      channelInitial: "I",
      description: "Beautiful short recitation from the Holy Quran.",
      type: "clip",
    },
  ]

  const categories = [
    "All",
    "Videos", // New category for main videos
    "Clips", // New category for clips
    "Technology",
    "Music",
    "Gaming",
    "Sports",
    "News",
    "Education",
    "Entertainment",
    "Science",
    "Travel",
  ]

  const sidebarItems = [
    { name: "Home", icon: Home, active: true },
    { name: "Trending", icon: TrendingUp, active: false },
    { name: "Music", icon: Music, active: false },
    { name: "Movies", icon: Film, active: false },
    { name: "Gaming", icon: Gamepad2, active: false },
    { name: "News", icon: Newspaper, active: false },
    { name: "Sports", icon: Trophy, active: false },
    { name: "Learning", icon: Lightbulb, active: false },
    { name: "Fashion", icon: Shirt, active: false },
    { name: "Podcasts", icon: Podcast, active: false },
  ]

  const subscriptions = [
    { name: "Tech Channel", initial: "T" },
    { name: "Music World", initial: "M" },
    { name: "Gaming Hub", initial: "G" },
    { name: "Muslims Day", initial: "M" }, // Added for clips
  ]

  const formatDuration = useCallback((duration: string | number | undefined) => {
    if (typeof duration === "string") return duration
    if (!duration)
      return `${Math.floor(Math.random() * 15) + 5}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`

    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }, [])

  const formatViews = useCallback((views: string | number | undefined) => {
    if (typeof views === "string") return views
    if (!views) return `${Math.floor(Math.random() * 999)}K views`

    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`
    }

    return `${views} views`
  }, [])

  const formatTimeAgo = useCallback((publishedAt: string | undefined) => {
    if (!publishedAt) {
      const timeOptions = [
        "1 hour ago",
        "2 hours ago",
        "1 day ago",
        "2 days ago",
        "1 week ago",
        "2 weeks ago",
        "1 month ago",
      ]
      return timeOptions[Math.floor(Math.random() * timeOptions.length)]
    }

    const now = new Date()
    const published = new Date(publishedAt)
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`

    return `${Math.floor(diffInSeconds / 31536000)} years ago`
  }, [])

  const fetchVideos = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/videos") // Call your new API route
      if (!response.ok) {
        throw new Error(`API error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("MongoDB API Response:", data)

      // Assuming your MongoDB data already has 'type' field ('video' or 'clip')
      // and other fields are consistent with your mock data structure.
      // If not, you might need to transform the data here.
      setVideos(data)
      if (data.length === 0) {
        setError("No videos found in MongoDB. Showing sample videos.")
        setVideos(mockVideos) // Fallback to mock data if MongoDB is empty
      }
    } catch (err: any) {
      console.error("Error fetching videos from your API:", err)
      setError(`Failed to fetch videos from your database: ${err.message}. Showing sample videos.`)
      setVideos(mockVideos) // Fallback to mock data on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initialize dark mode based on system preference or local storage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme")
      if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        setIsDarkMode(true)
        document.documentElement.classList.add("dark")
      } else {
        setIsDarkMode(false)
        document.documentElement.classList.remove("dark")
      }
    }

    setVideos(mockVideos) // Immediately show mock data
    fetchVideos() // Then fetch real data
  }, [fetchVideos])

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      if (newMode) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
      }
      return newMode
    })
  }

  const handleSearch = () => {
    // In a real app, this would filter or search videos
    console.log("Searching for:", searchQuery)
  }

  const playVideo = (video: any) => {
    setSelectedVideo(video)
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/placeholder.svg?height=180&width=320&text=Video+Thumbnail"
  }

  const regularVideos = videos.filter((video: any) => video.type === "video")
  const shortsVideos = videos.filter((video: any) => video.type === "clip")

  const filteredRegularVideos = regularVideos.filter((video: any) => {
    const matchesCategory = selectedCategory === "All" || selectedCategory === "Videos" || selectedCategory !== "Clips"
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const filteredShortsVideos = shortsVideos.filter((video: any) => {
    const matchesCategory = selectedCategory === "All" || selectedCategory === "Clips" || selectedCategory !== "Videos"
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex items-center space-x-2">
              {isDarkMode ? <YouTubeLogoDark className="h-8 w-auto" /> : <YouTubeLogoLight className="h-8 w-auto" />}
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-full focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                title="Search videos"
                onClick={handleSearch}
                className="px-6 py-2 bg-gray-50 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <Video className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <Bell className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full" onClick={fetchVideos}>
              <RotateCw className="w-6 h-6 text-gray-700 dark:text-gray-300" /> {/* Refresh/Reload icon */}
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full" onClick={toggleDarkMode}>
              {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
            </button>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" /> {/* User icon, or 'U' if no icon */}
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-900 h-screen sticky top-16 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <div className="p-4">
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${item.name === "Home" ? "bg-gray-100 dark:bg-gray-800 font-medium" : "hover:bg-gray-100 dark:hover:bg-gray-800"} text-gray-700 dark:text-gray-300`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-800 mt-4 pt-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 px-3">Subscriptions</h3>
              <div className="space-y-2">
                {subscriptions.map((channel) => (
                  <a
                    key={channel.name}
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{channel.initial}</span>
                    </div>
                    <span className="text-sm">{channel.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Card className="w-full mb-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Join the Community!</CardTitle>
              <CardDescription>
                Sign in or sign up to personalize your experience, save videos, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center space-x-4 pb-6">
              <Link href="/signin" passHref>
                <Button className="bg-red-600 hover:bg-red-700 text-white">Sign In</Button>
              </Link>
              <Link href="/signup" passHref>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-gray-800 dark:text-red-400 dark:border-red-400 bg-transparent"
                >
                  Sign Up
                </Button>
              </Link>
            </CardContent>
          </Card>
          {/* Category Pills */}
          <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category ? "bg-black text-white dark:bg-gray-100 dark:text-gray-900" : "bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"}`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading && videos.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 dark:bg-gray-700 aspect-video rounded-lg mb-3"></div>
                  <div className="flex space-x-3">
                    <div className="w-9 h-9 bg-gray-300 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Error state (but still show fallback videos) */}
              {error && (
                <div className="text-center py-8 bg-red-50 dark:bg-red-900 rounded-lg mb-6">
                  <AlertCircle className="w-8 h-8 text-red-500 dark:text-red-300 mx-auto mb-2" />
                  <p className="text-red-600 dark:text-red-200 text-sm">{error}</p>
                </div>
              )}

              {(() => {
                const content = []
                let regularVideoIndex = 0
                let shortsVideoIndex = 0
                const videosPerChunk = 8 // 2 rows * 4 columns
                const shortsPerChunk = filteredShortsVideos.length // Display all available shorts in one row

                while (
                  regularVideoIndex < filteredRegularVideos.length ||
                  shortsVideoIndex < filteredShortsVideos.length
                ) {
                  // Add 2 rows of regular videos
                  const currentRegularVideos = filteredRegularVideos.slice(
                    regularVideoIndex,
                    regularVideoIndex + videosPerChunk,
                  )
                  if (currentRegularVideos.length > 0 && selectedCategory !== "Clips") {
                    content.push(
                      <div
                        key={`videos-${regularVideoIndex}`}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8"
                      >
                        {currentRegularVideos.map((video) => (
                          <div key={video.id} className="cursor-pointer group" onClick={() => playVideo(video)}>
                            <div className="relative aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden mb-3">
                              <Image
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                width={320}
                                height={180}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                onError={handleImageError}
                              />
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                                {video.duration}
                              </div>
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                                <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </div>
                            </div>
                            <div className="flex space-x-3">
                              <div className="w-9 h-9 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm font-bold">{video.channelInitial}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2 mb-1">
                                  {video.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{video.channel}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {video.views} • {video.timeAgo}
                                </p>
                              </div>
                              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-all duration-200">
                                <MoreVertical className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>,
                    )
                    regularVideoIndex += videosPerChunk
                  }

                  // Add 1 row of shorts
                  const currentShortsVideos = filteredShortsVideos.slice(
                    shortsVideoIndex,
                    shortsVideoIndex + shortsPerChunk,
                  )
                  if (currentShortsVideos.length > 0 && selectedCategory !== "Videos") {
                    content.push(
                      <div key={`shorts-${shortsVideoIndex}`} className="mb-8">
                        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Shorts</h2>
                        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                          {currentShortsVideos.map((video) => (
                            <div
                              key={video.id}
                              className="flex-shrink-0 w-40 cursor-pointer group"
                              onClick={() => playVideo(video)}
                            >
                              <div className="relative w-full aspect-[9/16] bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden mb-2">
                                <Image
                                  src={video.thumbnail || "/placeholder.svg"}
                                  alt={video.title}
                                  width={160}
                                  height={284} // 160 * (16/9)
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  onError={handleImageError}
                                />
                                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                                  {video.duration}
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
                                  <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
                                  {video.title}
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{video.views}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="border-b border-gray-200 dark:border-gray-800 my-6"></div>
                      </div>,
                    )
                    shortsVideoIndex += shortsPerChunk // Move to the next set of shorts
                  }
                }
                return content
              })()}

              {/* Load More Button (for mock data or if API has more pages) */}
              {!loading && (filteredRegularVideos.length > 0 || filteredShortsVideos.length > 0) && (
                <div className="text-center mt-8">
                  <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
                    Load More Videos
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Video player modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeVideo}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{selectedVideo.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{selectedVideo.views}</span>
                    <span>{selectedVideo.timeAgo}</span>
                  </div>
                </div>
                <button onClick={closeVideo} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              <div className="aspect-video bg-black rounded-lg mb-4 flex items-center justify-center">
                {selectedVideo.video_url ? (
                  <video src={selectedVideo.video_url} controls autoPlay className="w-full h-full rounded-lg"></video>
                ) : (
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg">Video player would be here</p>
                    <p className="text-sm opacity-75 mt-2">No direct video URL available for this item.</p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{selectedVideo.channelInitial}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{selectedVideo.channel}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1.2M subscribers</p> {/* Static for now */}
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                <p className="text-gray-700 dark:text-gray-300">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
