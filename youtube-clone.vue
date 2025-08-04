<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div class="flex items-center justify-between px-4 py-2">
        <!-- Left section -->
        <div class="flex items-center space-x-4">
          <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-full">
            <Menu class="w-6 h-6" />
          </button>
          <div class="flex items-center space-x-1">
            <Youtube class="w-8 h-8 text-red-600" />
            <span class="text-xl font-semibold">YouTube</span>
          </div>
        </div>

        <!-- Center section - Search -->
        <div class="flex-1 max-w-2xl mx-4">
          <div class="flex">
            <div class="flex-1 relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search"
                class="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
                @keyup.enter="handleSearch"
              />
            </div>
            <button
              @click="handleSearch"
              class="px-6 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100"
            >
              <Search class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Right section -->
        <div class="flex items-center space-x-2">
          <button class="p-2 hover:bg-gray-100 rounded-full">
            <Video class="w-6 h-6" />
          </button>
          <button class="p-2 hover:bg-gray-100 rounded-full">
            <Bell class="w-6 h-6" />
          </button>
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User class="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>

    <div class="flex pt-16">
      <!-- Sidebar -->
      <aside
        :class="[
          'fixed left-0 top-16 h-full bg-white border-r border-gray-200 z-40 transition-transform duration-300',
          sidebarOpen ? 'w-60 translate-x-0' : 'w-16 -translate-x-0'
        ]"
      >
        <div class="p-2">
          <nav class="space-y-1">
            <a
              v-for="item in sidebarItems"
              :key="item.name"
              href="#"
              :class="[
                'flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors',
                item.active ? 'bg-gray-100 font-medium' : ''
              ]"
            >
              <component :is="item.icon" class="w-6 h-6 flex-shrink-0" />
              <span v-if="sidebarOpen" class="ml-3 text-sm">{{ item.name }}</span>
            </a>
          </nav>

          <div v-if="sidebarOpen" class="border-t border-gray-200 mt-4 pt-4">
            <h3 class="px-3 text-sm font-medium text-gray-500 mb-2">Subscriptions</h3>
            <div class="space-y-1">
              <a
                v-for="channel in subscriptions"
                :key="channel.name"
                href="#"
                class="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <div class="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
                <span class="ml-3 text-sm">{{ channel.name }}</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main content -->
      <main :class="['flex-1 transition-all duration-300', sidebarOpen ? 'ml-60' : 'ml-16']">
        <div class="p-6">
          <!-- Loading state -->
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div v-for="n in 12" :key="n" class="animate-pulse">
              <div class="bg-gray-300 aspect-video rounded-lg mb-3"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                <div class="h-3 bg-gray-300 rounded w-1/2"></div>
                <div class="h-3 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="text-center py-12">
            <AlertCircle class="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">Failed to load videos</h3>
            <p class="text-gray-500 mb-4">{{ error }}</p>
            <button
              @click="fetchVideos"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>

          <!-- Videos grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div
              v-for="video in videos"
              :key="video.id"
              class="cursor-pointer group"
              @click="playVideo(video)"
            >
              <!-- Thumbnail -->
              <div class="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
                <img
                  :src="video.thumbnail || '/placeholder.svg?height=180&width=320'"
                  :alt="video.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div class="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                  {{ formatDuration(video.duration) }}
                </div>
              </div>

              <!-- Video info -->
              <div class="flex space-x-3">
                <div class="w-9 h-9 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-sm line-clamp-2 text-gray-900 group-hover:text-blue-600">
                    {{ video.title }}
                  </h3>
                  <p class="text-sm text-gray-600 mt-1">{{ video.channel || 'Unknown Channel' }}</p>
                  <div class="flex items-center text-sm text-gray-600 mt-1 space-x-1">
                    <span>{{ formatViews(video.views) }} views</span>
                    <span>•</span>
                    <span>{{ formatTimeAgo(video.published_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Load more button -->
          <div v-if="videos.length > 0 && !loading" class="text-center mt-8">
            <button
              @click="loadMore"
              :disabled="loadingMore"
              class="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium disabled:opacity-50"
            >
              {{ loadingMore ? 'Loading...' : 'Load More' }}
            </button>
          </div>
        </div>
      </main>
    </div>

    <!-- Video player modal -->
    <div
      v-if="selectedVideo"
      class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
      @click="closeVideo"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-auto" @click.stop>
        <div class="p-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold">{{ selectedVideo.title }}</h2>
            <button @click="closeVideo" class="p-2 hover:bg-gray-100 rounded-full">
              <X class="w-6 h-6" />
            </button>
          </div>
          <div class="aspect-video bg-black rounded-lg mb-4">
            <video
              v-if="selectedVideo.video_url"
              :src="selectedVideo.video_url"
              controls
              class="w-full h-full"
              autoplay
            ></video>
            <div v-else class="flex items-center justify-center h-full text-white">
              <Play class="w-16 h-16" />
            </div>
          </div>
          <div class="space-y-2">
            <p class="text-gray-600">{{ selectedVideo.channel || 'Unknown Channel' }}</p>
            <div class="flex items-center text-sm text-gray-600 space-x-4">
              <span>{{ formatViews(selectedVideo.views) }} views</span>
              <span>{{ formatTimeAgo(selectedVideo.published_at) }}</span>
            </div>
            <p v-if="selectedVideo.description" class="text-gray-700 mt-4">
              {{ selectedVideo.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import {
  Menu,
  Search,
  Video,
  Bell,
  User,
  Youtube,
  Home,
  TrendingUp,
  Music,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
  Play,
  X,
  AlertCircle
} from 'lucide-vue-next'

// Reactive data
const sidebarOpen = ref(true)
const searchQuery = ref('')
const videos = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const error = ref(null)
const selectedVideo = ref(null)
const currentPage = ref(1)

// Sidebar configuration
const sidebarItems = ref([
  { name: 'Home', icon: Home, active: true },
  { name: 'Trending', icon: TrendingUp, active: false },
  { name: 'Music', icon: Music, active: false },
  { name: 'Movies', icon: Film, active: false },
  { name: 'Live', icon: Radio, active: false },
  { name: 'Gaming', icon: Gamepad2, active: false },
  { name: 'News', icon: Newspaper, active: false },
  { name: 'Sports', icon: Trophy, active: false },
  { name: 'Learning', icon: Lightbulb, active: false },
  { name: 'Fashion', icon: Shirt, active: false },
  { name: 'Podcasts', icon: Podcast, active: false }
])

const subscriptions = ref([
  { name: 'Tech Channel' },
  { name: 'Music World' },
  { name: 'Gaming Hub' },
  { name: 'News Today' },
  { name: 'Learning Path' }
])

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const fetchVideos = async (page = 1, append = false) => {
  try {
    if (!append) {
      loading.value = true
      error.value = null
    } else {
      loadingMore.value = true
    }

    const response = await fetch(`https://ximit.mahfil.net/api/v2/homefeed-videos?page=${page}&page_size=15`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (append) {
      videos.value = [...videos.value, ...(data.results || data.data || data)]
    } else {
      videos.value = data.results || data.data || data || []
    }
    
    currentPage.value = page
  } catch (err) {
    console.error('Error fetching videos:', err)
    error.value = err.message || 'Failed to fetch videos'
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  fetchVideos(currentPage.value + 1, true)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // In a real app, this would filter or search videos
    console.log('Searching for:', searchQuery.value)
  }
}

const playVideo = (video) => {
  selectedVideo.value = video
}

const closeVideo = () => {
  selectedVideo.value = null
}

const formatDuration = (duration) => {
  if (!duration) return '0:00'
  
  // If duration is in seconds
  if (typeof duration === 'number') {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  
  return duration
}

const formatViews = (views) => {
  if (!views) return '0 views'
  
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`
  }
  
  return `${views} views`
}

const formatTimeAgo = (publishedAt) => {
  if (!publishedAt) return 'Unknown'
  
  const now = new Date()
  const published = new Date(publishedAt)
  const diffInSeconds = Math.floor((now - published) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`
}

// Lifecycle
onMounted(() => {
  fetchVideos()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
