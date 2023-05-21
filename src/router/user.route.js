// import express from 'express';
// import UserController from '../controllers/user.controller.js';
import { tryCatchHandler } from '../utils/tryCatchHandler.js';

import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";

router.post("/", tryCatchHandler(UserController.createUser));

export default router;
