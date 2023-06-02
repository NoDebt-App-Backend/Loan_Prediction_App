import express from "express";
import loanControllers from "../controllers/loan.controller.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
const router = express.Router();

router.post("/create", tryCatchHandler(loanControllers.addBorrower));
router.get("/", tryCatchHandler(loanControllers.findBorrower));

export default router;
