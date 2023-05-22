import express from "express";
const router = express.Router();
import UserController from "../controllers/user.controller.js";
/**Routes for user-related operations */

/**Description: Create new user request */
router.post("/", UserController.newUser);

/**Description: Show all users request */
router.get("/", UserController.allUsers);

export default router;
