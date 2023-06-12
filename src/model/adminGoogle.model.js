import mongoose from "mongoose";

const adminGoogleSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const AdminGoogle = mongoose.model("AdminGoogle", adminGoogleSchema);

export default AdminGoogle;
