import { Loan } from "../models/loan.model.js";
import { createLoanValidator } from "../validators/loan.validator.js";
import { User } from "../models/user.model.js";
import { BadUserRequestError, NotFoundError } from "../error/error.js";

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
    if (!id) throw new BadUserRequestError("user does not exist");
    const { error } = createLoanValidator.validate(req.body);
    if (error) throw error;

    const user = await User.findById(id);
    if (!user) throw new NotFoundError("user does not exist");
    const userInCollection = await User.findById(req.body.user);
    if (!userInCollection) throw new NotFoundError("user does not exist");

    const loan = await Loan.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        loan,
      },
    });
  }
}
