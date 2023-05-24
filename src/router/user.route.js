import express from "express";
const router = express.Router();
import { tryCatchHandler } from '../utils/tryCatchHandler.js';
import UserController from "../controllers/user.controller.js";
import authMiddleware  from '../middlewares/auth.js';

router.post("/create", tryCatchHandler(UserController.createUser));

//route to login and get jwt token
router.post('/login', tryCatchHandler(UserController.Login));

//protected route that grant access after successful login
router.get('/protected', authMiddleware, tryCatchHandler(UserController.protectedRoute));

export default router;
