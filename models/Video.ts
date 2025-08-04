import mongoose from "mongoose"

const VideoSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  channel: { type: String, required: true },
  views: { type: String }, // Storing as string as per your current formatViews output
  timeAgo: { type: String }, // Storing as string as per your current formatTimeAgo output
  duration: { type: String }, // Storing as string as per your current formatDuration output
  thumbnail: { type: String },
  description: { type: String },
  video_url: { type: String },
  channelInitial: { type: String },
  type: { type: String, enum: ["video", "clip"], required: true },
  published_at: { type: Date }, // Assuming you might have a Date field in MongoDB
})

// Check if the model already exists to prevent recompilation issues in Next.js development mode
const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema)

export default Video
