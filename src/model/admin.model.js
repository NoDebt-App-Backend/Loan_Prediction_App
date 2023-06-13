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
        "https://nodebt-photosbucket.s3.us-east-1.amazonaws.com/User-Icon-Grey-300x300.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2PPOPHMTJ73UG25L%2F20230613%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230613T201841Z&X-Amz-Expires=3600&X-Amz-Signature=d72e1dd2227f011987a4a8f94ec969e0fd686102b0053c89dca433d23184b201&X-Amz-SignedHeaders=host&x-id=GetObject",
    },
    loginURL: String,
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
