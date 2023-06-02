import { Schema, model } from "mongoose";

// Setting up our user model
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 255,
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
    organisationName: {
      type: String,
    },
    organisationEmail: {
      type: String,
      unique: true,
    },
    numberOfStaffs: {
      type: Number,
    },
    staffID: {
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
    phoneNumber: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    imageName: String,
  }, {timestamps: true}
);

export default model("User", UserSchema);
