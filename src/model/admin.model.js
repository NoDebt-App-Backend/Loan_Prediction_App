import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
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
      match: [
        /^(\+\d{1,3}\s?)?(\d{3,})$/,
        "Please enter a valid phone number e.g. +2349000000000",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      // required: true,
    },
    organisationEmail: {
      type: String,
      unique: false,
      sparse: true,
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
    imageUrl: {
      type: String,
      default:
        "http://res.cloudinary.com/dondeickl/image/upload/v1686778622/dummy_image.png",
    },
    loginURL: String,
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
