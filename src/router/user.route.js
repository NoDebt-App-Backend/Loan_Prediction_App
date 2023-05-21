import express from "express";
const router = express.Router();
import { tryCatchHandler } from '../utils/tryCatchHandler.js';
import UserController from "../controllers/user.controller.js";

router.post("/", tryCatchHandler(UserController.createUser));

export default router;
