import express from "express";
const router = express.Router();
import AdminController from "../controllers/admin.controller.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
import authMiddleWare from "../middlewares/auth.js";
import Company from "../model/company.model.js";


router.post('/signup', tryCatchHandler(AdminController.createCompany));
router.post('/login',tryCatchHandler(AdminController.Login));
router.post('/create', authMiddleWare, tryCatchHandler(AdminController.addAdmin) );
router.get("/admins", tryCatchHandler(AdminController.getAllAdmins));
router.get("/companies", tryCatchHandler(AdminController.getAllCompanies));
router.get("/admin-company", tryCatchHandler(AdminController.getAllAdminCompanies))


export default router