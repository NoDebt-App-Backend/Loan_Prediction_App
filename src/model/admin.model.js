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
      unique: true,
      sparse: true,
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
      required: true,
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
    imageName: String,
  },
  { timestamps: true },
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
