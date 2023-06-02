import express from "express";
const router = express.Router();
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.js";
import ImageController from "../controllers/userImage.controller.js";
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

// Route to update the user's information or profile
router.put("/:id", authMiddleware, tryCatchHandler(UserController.updateUser));

// Image Upload Routes
upload.single("profileImage");

router.put(
  "/:id/profile-picture",
  authMiddleware,
  upload.single("profileImage"),
  tryCatchHandler(ImageController.uploadImage)
);

router.get("/:id/profile-picture", authMiddleware, tryCatchHandler(ImageController.downloadImage))

router.delete(
  "/:id/profile-picture",
  authMiddleware,
  tryCatchHandler(ImageController.deleteImage)
);

export default router;
