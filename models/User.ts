import mongoose, { Schema, models } from "mongoose"

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email address.",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [6, "Password must be at least 6 characters long."],
  },
})

const User = models.User || mongoose.model("User", UserSchema)

export default User
