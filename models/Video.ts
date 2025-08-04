import mongoose, { Schema, models } from "mongoose"

const VideoSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  channel: { type: String, required: true },
  views: { type: String, required: true },
  timeAgo: { type: String, required: true },
  duration: { type: String, required: true },
  thumbnail: { type: String, required: true },
  channelInitial: { type: String, required: true },
  description: { type: String },
  video_url: { type: String },
  type: { type: String, enum: ["video", "clip"], required: true },
  channelImage: { type: String },
  channelUsername: { type: String },
  isVerified: { type: Boolean },
  likes: { type: Number },
  mashallah: { type: Number },
  commentCount: { type: Number },
  mp4Urls: { type: [String] },
  manifest: { type: String },
})

const Video = models.Video || mongoose.model("Video", VideoSchema)

export default Video
