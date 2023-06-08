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

// FIND A BORROWERS ELIGIBILITY STATUS BY ADDING THE ID TO REQ.QUERY
router.get(
  "/eligibility",
  authMiddleWare,
  loanControllers.findBorrowersEligibilityStatus
);

// SEND A BORROWERS ELIGIBILITY STATUS BY ADDING THE ID TO REQ.QUERY
router.get(
  "/send-eligibility-status",
  authMiddleWare,
  loanControllers.sendBorrowersEligibilityStatus
);

// GET ALL COMPANY LOANS
router.get(
  "/company-loans",
  authMiddleWare,
  loanControllers.findAllCompanyLoans
);

// ROUTE TO SUCCESSFUL COMPANY LOANS IN DESCENDING ORDER
router.get(
  "/success-loans/descending",
  authMiddleWare,
  loanControllers.findAllSuccessfulCompanyLoansInDescendingOrder
);

// ROUTE TO SUCCESSFUL COMPANY LOANS IN ASCENDING ORDER

router.get(
  "/success-loans/ascending",
  authMiddleWare,
  loanControllers.findAllSuccessfulCompanyLoansInAscendingOrder
);

// FIND ALL REJECTED COMPANY LOANS IN DESCENDING ORDER
router.get(
  "/rejected-loans/descending",
  authMiddleWare,
  loanControllers.findAllRejectedCompanyLoansInDescendingOrder
);

// FIND ALL REJECTED COMPANY LOANS IN ASCENDING ORDER
router.get(
  "/rejected-loans/ascending",
  authMiddleWare,
  loanControllers.findAllRejectedCompanyLoansInAscendingOrder
);

// SEARCH FOR LOAN BY FULL NAME
router.get("/getloan/:name", decodeAuth, loanControllers.searchForLoanByname);
export default router;
