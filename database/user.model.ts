import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    name: String,
    password: String,
    coverImage: String,
    profileImage: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
