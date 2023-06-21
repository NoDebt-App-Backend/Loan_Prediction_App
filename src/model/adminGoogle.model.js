import mongoose from "mongoose";

const adminGoogleSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    provider: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    accessToken: String,
  },
  { timestamps: true }
);

const AdminGoogle = mongoose.model("AdminGoogle", adminGoogleSchema);

export default AdminGoogle;
