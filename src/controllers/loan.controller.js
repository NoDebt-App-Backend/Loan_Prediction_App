import Loan from '../model/loan.model.js';
import { createLoanValidator } from "../validators/loan.validator.js";
import User from '../model/user.model.js'
import {
  BadUserRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../error/error.js";

/**
 * Controller class for managing loan/borrowers-related operations
 */
export default class loanControllers {
  /**
   * Handles the create new user request
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static async addBorrower(req, res) {
    const { id } = req.query;

    if (!id) throw new NotFoundError("user does not exist");
    const { error } = createLoanValidator.validate(req.body);
    if (error) throw error;

    const userExists = await User.findById(id);
    if (!userExists) throw new NotFoundError("user does not exist");
    const userInCollection = await User.findById(req.body.user);
    if (!userInCollection) throw new NotFoundError("user does not exist");

    // Admin value comes from decoded payload
    const admin = await User.findOne({ email: req.user.email });
    if (!admin) throw new UnAuthorizedError("Unauthrized user");
    const loan = await new Loan(req.body);
    loan.adminInCharge = admin.name;
    await loan.save();
    res.status(201).json({
      status: "success",
      data: {
        loan,
      },
    });
  }

  static async findBorrower(req, res) {
    const { id } = req.query;
    if (!id) throw new UnAuthorizedError("Unauthorized user");
    const borrower = await Loan.findById(id);
    if (!borrower) throw new NotFoundError("Invalid link or details");

    res.status(200).json({
      status: "success",
      data: {
        borrower,
      },
    });
  }
}
