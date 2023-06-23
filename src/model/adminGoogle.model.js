import mongoose from "mongoose";
import Admin from "../model/admin.model.js";

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
    phoneNumber: {
      type: String,
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
    access_token: { 
      type: String, 
    },
    organisationEmail: {
      type: String,
    },
    numberOfStaffs: {
      type: Number,
    },
    staffID: {
      type: String,
    },
    role: {
      type: String,
    },
    organisationType: {
      type: String,
    },
    website: {
      type: String,
    },
    position: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    passwordLink: String, // This is excluded as the URL from frontend to reset password
    imageName: String,
    facebookId: String, 
    imageUrl: {
      type: String,
      default:
        "http://res.cloudinary.com/dondeickl/image/upload/v1686778622/dummy_image.png",
    },
    loginURL: String,
  },
    // organisationId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Organisation",
    //   required: true,
    // },
  { timestamps: true }
);

const AdminGoogle = Admin.discriminator("AdminGoogle", adminGoogleSchema);

export default AdminGoogle;
