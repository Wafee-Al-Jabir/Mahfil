import mongoose from "mongoose"
import dbConnect from "../lib/mongodb.js"
import Video from "../models/Video.js"
import { ximitMahfilVideos } from "../data/ximit-mahfil-data.js"

async function seedVideos() {
  console.log("Attempting to connect to MongoDB...")
  await dbConnect()
  console.log("MongoDB connected.")

  try {
    // Clear existing videos to prevent duplicates on re-run
    await Video.deleteMany({})
    console.log("Existing videos cleared.")

    // Insert new videos
    await Video.insertMany(ximitMahfilVideos)
    console.log(`${ximitMahfilVideos.length} videos seeded successfully!`)
  } catch (error) {
    console.error("Error seeding videos:", error)
  } finally {
    mongoose.connection.close()
    console.log("MongoDB connection closed.")
  }
}

seedVideos()
