import express from "express";
const router = express.Router();
import ContactController from "../controllers/contact.controller.js";
// import { tryCatchHandler } from "../utils/tryCatchHandler.js";

// To create a new contact message
router.post("/contact", ContactController.contactUs);

export {router};