import Message from "../model/messageModel.js";
import Chat from "../model/chatModel.js";
import Admin from "../model/admin.model.js";

export default class MessageController {
  static async sendMessage(req, res) {
    const { content, chatId, temporaryId } = req.body;

    if (!content || !chatId) {
      console.log("invalid data passed into request");
      return res.sendStatus(400);
    }
    let newMessage = {
      sender: req.admin._id,
      content: content,
      chat: chatId,
      temporaryId: temporaryId,
    };

    try {
      let message = await Message.create(newMessage);

      message = await message.populate(
        "sender",
        "firstName lastName email profileImage"
      );
      message = await message.populate("chat");
      message = await Admin.populate(message, {
        path: "chat.admins",
        select: "firstName lastName email profileImage",
      });
      await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
      res.json(message);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }

  static async allMessages(req, res) {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "firstName lastName email profileImage")
        .populate("chat");
      res.status(200).json(messages);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
}
