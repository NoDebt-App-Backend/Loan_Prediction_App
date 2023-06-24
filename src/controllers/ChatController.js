import Chat from "../model/chatModel.js";

import Admin from "../model/admin.model.js";

export default class ChatController {
  static async accessChat(req, res) {
    const { adminId } = req.body;
    // check if a chat with this Admin already exists

    if (!adminId) {
      console.log("AdminId param not sent with request");
      return res.sendStatus(400);
    }

    let isChat = await Chat.find({
      $and: [
        { admins: { $elemMatch: { $eq: req.admin._id } } },
        { admins: { $elemMatch: { $eq: adminId } } },
      ],
    })
      .populate(
        "admins",
        "_id firstName lastName email profileImage createdAt updatedAt"
      )
      .populate("latestMessage");

    isChat = await Admin.populate(isChat, {
      path: "latestMessage.sender",
      select: "firstName lastName email profileImage",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        admins: [req.admin._id, adminId],
      };

      try {
        const createdChat = await Chat.create(chatData);

        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "admins",
          "_id firstName lastName email profileImage createdAt updatedAt"
        );
        res.status(200).send(FullChat);
      } catch (err) {
        res.status(400);
        throw new Error(err.message);
      }
    }
  }

  static async fetchChats(req, res) {
    try {
      Chat.find({ admins: { $elemMatch: { $eq: req.admin._id } } })
        .populate(
          "admins",
          "_id firstName lastName email profileImage createdAt updatedAt"
        )
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          await Admin.populate(results, {
            path: "latestMessage.sender",
            select: "firstName lastName email profileImage",
          });
          res.status(200).send(results);
        });
    } catch (err) {
      res.status(400);
      throw new Error(err.message);
    }
  }
}
