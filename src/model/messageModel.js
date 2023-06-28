import mongoose from "mongoose";
const messageModel = mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    content: { type: String, trim: true, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true },
    temporaryId: String,
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageModel);
export default Message;
