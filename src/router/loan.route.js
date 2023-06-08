import express from "express";
import loanControllers from "../controllers/loan.controller.js";
import { tryCatchHandler } from "../utils/tryCatchHandler.js";
const router = express.Router();
import { decodeAuth } from "../middlewares/decodeAuth.js";

/*Description: Add a new loan request */
router.post(
  "/create",
  decodeAuth,
  tryCatchHandler(loanControllers.addBorrower)
);
/*Description: find a loan or borrower by its Id */
router.get("/", tryCatchHandler(loanControllers.findBorrower));

export default router;
