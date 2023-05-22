import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  linkToken: {
    type: String,
    required: true,
  },
  fiveDigitToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});
export const Token = model("Token", tokenSchema);
