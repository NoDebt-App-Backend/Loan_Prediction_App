import express from "express";
import { chatAuth } from "../middlewares/chatAuth.js";
const router = express.Router();

import ChatController from "../controllers/chatController.js";

router.post("/", chatAuth, ChatController.accessChat);
router.get("/", chatAuth, ChatController.fetchChats);

export { router };
