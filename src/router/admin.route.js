import express from "express";
const router = express.Router();
import AdminController from "../controllers/admin.controller.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
import authMiddleWare from "../middlewares/auth.js";


router.post('/signup', tryCatchHandler(AdminController.createCompany));
router.post('/login',tryCatchHandler(AdminController.Login));
router.post('/create', authMiddleWare, tryCatchHandler(AdminController.addAdmin) );
router.get("/admins", tryCatchHandler(AdminController.getAllAdmins));
router.get("/companies",authMiddleWare, tryCatchHandler(AdminController.getAllCompanies));
router.get("/admin-company", tryCatchHandler(AdminController.getAllAdminCompanies));
router.get("/",authMiddleWare, tryCatchHandler(AdminController.getAdmin));
router.get('/admins',authMiddleWare, AdminController.getAdminsByCompany);
router.get("/company",authMiddleWare, tryCatchHandler(AdminController.getCompanyById) );



export default router;