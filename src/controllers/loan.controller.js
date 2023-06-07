import { Loan } from "../model/loan.model.js";
import { createLoanValidator } from "../validators/loan.validator.js";
import User from "../model/user.model.js";
import Admin from "../model/admin.model.js";
import AdminCompanyMap from "../model/adminCompanyMap.model.js";
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
    const admin = await Admin.findOne({ email: req.admin.email });
    // const { id } = req.query;

    if (!admin) throw new NotFoundError("user does not exist");

    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("companyId", " companyName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    const { error } = createLoanValidator.validate(req.body);
    if (error) throw error;

    const userExists = await User.findById(id);
    if (!userExists) throw new NotFoundError("user does not exist");
    const userInCollection = await User.findById(req.body.user);
    if (!userInCollection) throw new NotFoundError("user does not exist");

    // Admin value comes from decoded payload
    // const admin = await User.findOne({ email: req.admin.email });
    // if (!admin) throw new UnAuthorizedError("Unauthrized user");
    const loan = await new Loan(req.body);

    loan.adminInCharge = admin.name;
    loan.companyId = adminCompanyMap.companyId._id;
    loan.company = adminCompanyMap.companyId._id;
    loan.companyName = adminCompanyMap.companyId.companyName;

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

  // FIND BORROWERS UNDER A PARTICULAR COMPANY

  static async findAllCompanyLoans(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("companyId", " companyName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    const loans = await Loan.find({
      companyId: adminCompanyMap.companyId._id,
    }).select(
      "fullname email address createdAt eligibility creditScore loanAmount"
    );

    return res.status(200).json({
      message: loans.length < 1 ? "No loans found" : "Loans found successfully",
      title: "Loan Applications",
      status: "Success",
      results: loans.length,
      data: {
        loans: loans,
      },
    });
  }

  // FIND SUCCESSFUL COMPANY LOANS

  static async findAllSuccessfulCompanyLoans(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("companyId", " companyName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    const loans = await Loan.find({
      companyId: adminCompanyMap.companyId._id,
      eligibility: true,
    })
      .select(
        "fullname email address createdAt eligibility creditScore loanAmount"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: loans.length < 1 ? "No loans found" : "Loans found successfully",
      title: "Loans Generated",
      status: "Success",
      results: loans.length,
      data: {
        loans: loans,
      },
    });
  }
  // FIND REJECTED COMPANY LOANS

  static async findAllRejectedCompanyLoans(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("companyId", " companyName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    const loans = await Loan.find({
      companyId: adminCompanyMap.companyId._id,
      eligibility: false,
    })
      .select(
        "fullname email address createdAt eligibility creditScore loanAmount"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: loans.length < 1 ? "No loans found" : "Loans found successfully",
      title: "Loans Declined",
      status: "Success",
      results: loans.length,
      data: {
        loans: loans,
      },
    });
  }
}
