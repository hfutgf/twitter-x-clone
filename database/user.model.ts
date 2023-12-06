import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    name: String,
    password: String,
    coverImage: String,
    profileImage: String,
    bio: String,
    location: String,
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    hasFollowed: Boolean,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
