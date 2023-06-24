import mongoose from "mongoose";

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

export default Chat;
