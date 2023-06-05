import express from "express";
const router = express.Router();
import AdminController from "../controllers/admin.controller.js";
import ImageController from "../controllers/adminImage.controller.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
import authMiddleWare from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadImage.js";

// To create a new admin acccount
router.post("/signup", tryCatchHandler(AdminController.createCompany));

// To log into admin account
router.post("/login", tryCatchHandler(AdminController.Login));

// To add a new admin from the main admin account
router.post(
  "/create",
  authMiddleWare,
  tryCatchHandler(AdminController.addAdmin)
);

// To retrieve all the admin accounts
router.get(
  "/admins",
  authMiddleWare,
  tryCatchHandler(AdminController.getAllAdmins)
);

// To retrieve all the company accounts
router.get(
  "/companies",
  authMiddleWare,
  tryCatchHandler(AdminController.getAllOrganisations)
);

// To retrieve the relationship between the admin and company
router.get(
  "/admin-company",
  authMiddleWare,
  tryCatchHandler(AdminController.getAllAdminCompanies)
);

// To get a single admin account
router.get("/admin", authMiddleWare, tryCatchHandler(AdminController.getAdmin));

// To check if the admin is authorized
router.get(
  "/protected",
  authMiddleWare,
  tryCatchHandler(AdminController.protectedRoute)
);

// Route to update the admin's information or profile
router.put("/:id", authMiddleWare, tryCatchHandler(AdminController.updateAdmin));

// Route to change password in the application
router.put(
  "/:id/change-password",
  authMiddleWare,
  tryCatchHandler(AdminController.changePassword)
);

// Image Upload Routes
upload.single("profileImage");

router.put(
  "/:id/profile-picture",
  authMiddleWare,
  upload.single("profileImage"),
  tryCatchHandler(ImageController.uploadImage)
);

router.get(
  "/:id/profile-picture",
  authMiddleWare,
  tryCatchHandler(ImageController.downloadImage)
);

router.delete(
  "/:id/profile-picture",
  authMiddleWare,
  tryCatchHandler(ImageController.deleteImage)
);

export default router;
