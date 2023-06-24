// MESSAGE ROUTES
import express from "express";
import { chatAuth } from "../middlewares/chatAuth.js";
import MessageController from "../controllers/messageController.js";
const router = express.Router();
// SEND MESSAGE - pass in content and chatId into the req.body
router.post("/", chatAuth, MessageController.sendMessage);

// VIEW ALL MESSAGES FROM A SINGLE CHAT
router.get("/:chatId", chatAuth, MessageController.allMessages);

export { router };
