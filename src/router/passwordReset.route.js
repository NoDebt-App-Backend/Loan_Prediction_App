import express from "express";
import PasswordController from "./../controllers/resetPassword.controllers.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
const router = express.Router();

/*Routes for password-related operations*/

/*Description: Change password request */
router.get("/", tryCatchHandler(PasswordController.changePassword));

/*Description: Passsword reset request*/
router.post("/:id", tryCatchHandler(PasswordController.sendToken));

/*Description: Input New Password request*/

router.put("/:id", tryCatchHandler(PasswordController.updateNewPassword));

export default router;
