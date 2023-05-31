import express from "express";
const router = express.Router();
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadImage.js";

// route to create a new user
router.post("/create", tryCatchHandler(UserController.createUser));

router.get("/find", tryCatchHandler(UserController.findUser));

//route to login and get jwt token
router.post("/login", tryCatchHandler(UserController.Login));

//protected route that grant access after successful login
router.get(
  "/protected",
  authMiddleware,
  tryCatchHandler(UserController.protectedRoute)
);

router.put("/:id", upload.single('image'), tryCatchHandler(UserController.updateUser));

export default router;
