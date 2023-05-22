import express from "express";
import PasswordController from "./../controllers/password.controller.js";
const router = express.Router();

/*Routes for password-related operations*/

/*Description: Change password request */
router.post("/", PasswordController.changePassword);

/*Description: Passsword reset request*/
router.post("/:userId/:token", PasswordController.sendPassword);

export default router;
