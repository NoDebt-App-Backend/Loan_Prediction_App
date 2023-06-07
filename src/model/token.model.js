import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
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
