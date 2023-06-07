import express from "express";
import loanControllers from "../controllers/loan.controller.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
const router = express.Router();
import authMiddleWare from "../middlewares/auth.js";
/*Description: Add a new loan request */
router.post(
  "/create",
  authMiddleWare,
  tryCatchHandler(loanControllers.addBorrower)
);
/*Description: find a loan or borrower by its Id */
router.get(
  "/",
  authMiddleWare,
  tryCatchHandler(loanControllers.showFullBorrowersData)
);

// GET ALL COMPANY LOANS
router.get("/company-loans", authMiddleWare, loanControllers.findAllUserLoans);

// GET ALL SUCCESSFUL COMPANY LOANS
router.get(
  "/success-loans",
  authMiddleWare,
  loanControllers.findAllSuccessfulCompanyLoans
);
// GET ALL REJECTED COMPANY LOANS
router.get(
  "/rejected-loans",
  authMiddleWare,
  loanControllers.findAllRejectedCompanyLoans
);

export default router;
