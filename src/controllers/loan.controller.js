import axios from "axios";
import Admin from "../model/admin.model.js";
import AdminCompanyMap from "../model/adminCompanyMap.model.js";
import { Loan } from "../model/loan.model.js";
import { createLoanValidator } from "../validators/loan.validator.js";
import { NotFoundError, UnAuthorizedError } from "../error/error.js";
import sendEmail from "../utils/sendEmail.js";
import { BadUserRequestError } from "../error/error.js";
import { mongoIdValidator } from "../validators/mongoId.validator.js";

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
    if (!admin) throw new NotFoundError("user does not exist");

    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    const { error } = createLoanValidator.validate(req.body);
    if (error) throw error;

    const loan = new Loan(req.body);

    loan.adminInCharge = `${admin.firstName} ${admin.lastName}`;
    loan.organisationId = adminCompanyMap.organisationId._id;
    loan.organisation = adminCompanyMap.organisationId._id;
    loan.organisationName = adminCompanyMap.organisationId.organisationName;
    const { createdAt } = loan;

    const response = await axios.post(
      "https://web-production-f0d4.up.railway.app/loan_default_prediction",
      {
        gender: loan.gender,
        marital_status: loan.maritalStatus,
        employment: loan.employmentType,
        income_per_month: loan.incomePerMonth,
        loan_type: loan.loanType,
        collateral_type: loan.collateralType,
        collateral_value: loan.collateralValue,
        guarantor_relationship: loan.guarantor.relationship,
        guarantor_employment: loan.guarantor.employmentType,
        guarantor_other_sources_of_income: loan.guarantor.otherSourcesOfIncome,
        guarantor_income_per_month: loan.guarantor.incomePerMonth,
        loan_amount: loan.loanAmount,
        applicant_job_role: loan.jobRole,
        applicant_job_sector: loan.jobSector,
        age: loan.age,
        guarantor_age: loan.guarantor.age,
      }
    );

    loan.creditScore = response.data.creditScore;
    if (loan.incomePerMonth * 12 + loan.collateralValue > 2 * loan.loanAmount) {
      loan.eligibility = response.data.loanEligibility;
    } else {
      loan.eligibility = false;
    }

    await loan.save();

    res.status(201).json({
      status: "success",
      data: {
        loan,
        createdAt: createdAt,
      },
    });
  }

  // SHOW FULL BORROWERS DATA CONTROLLER

  static async showFullBorrowersData(req, res) {
    const { id } = req.query;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw error;
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

  // FIND BORROWERS ELIGIBILITY STATUS

  static async findBorrowersEligibilityStatus(req, res) {
    const { id } = req.query;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw error;
    if (!id) throw new UnAuthorizedError("Unauthorized user");
    const borrower = await Loan.findById(id);
    if (!borrower) throw new NotFoundError("Invalid link or details");

    res.status(200).json({
      status: "success",
      data: {
        eligibility: borrower.eligibility,
      },
    });
  }

  // SEND ELIGIBILITY STATUS TO BORROWER AS EMAIL

  static async sendBorrowersEligibilityStatus(req, res) {
    const { id } = req.query;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw error;

    // Get company name
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!id) throw new UnAuthorizedError("Unauthorized user");
    const borrower = await Loan.findById(id);
    if (!borrower) throw new NotFoundError("Invalid link or details");

    // SEND EMAIL TO BORROWER BASED ON ELIGIBILITY STATUS
    if (borrower.eligibility === true) {
      await sendEmail(
        borrower.email,
        "Loan Eligibility Status",
        {
          name: borrower.fullname,
          loanAmount: borrower.loanAmount,
          organisationName: adminCompanyMap.organisationId.organisationName,
        },
        "./template/eligible.handlebars"
      );
      res.status(200).json({
        status: "success",
        message: "eligibility status successfully sent to borrowers mail",
      });
    } else if (borrower.eligibility === false) {
      await sendEmail(
        borrower.email,
        "Loan Eligibility Status",
        {
          name: borrower.fullname,
          loanAmount: borrower.loanAmount,
          organisationName: adminCompanyMap.organisationId.organisationName,
        },
        "./template/notEligible.handlebars"
      );
      res.status(200).json({
        status: "success",
        message: "eligibility status successfully sent to borrowers mail",
      });
    }
  }

  // FIND BORROWERS UNDER A PARTICULAR COMPANY CONTROLLER

  static async findAllCompanyLoans(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }
    //QUERY  TO FIND ALL COMPANY LOANS
    const loansCount = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
    });
    const loans = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
    }).select(
      "fullname email address createdAt eligibility creditScore loanAmount adminInCharge"
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

  // FIND BORROWERS UNDER A PARTICULAR COMPANY CONTROLLER(PAGINATED)

  static async findAllCompanyLoansPaginated(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    //QUERY TO FIND ALL COMPANY LOANS
    const loansCount = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
    });
    const loans = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
    })
      .select(
        "fullname email address createdAt eligibility creditScore loanAmount adminInCharge"
      )
      .sort({ createdAt: -1 })
      .skip(((+req.query.page || 1) - 1) * 10)
      .limit(10);

    return res.status(200).json({
      message: loans.length < 1 ? "No loans found" : "Loans found successfully",
      title: "Loan Applications",
      status: "Success",
      totalPages: Math.ceil(loansCount.length / 10),
      results: loans.length,
      data: {
        loans: loans,
      },
    });
  }

  // FIND All SUCCESSFUL COMPANY LOANS GENERATED BY A COMPANY IN DESCENDING ORDER CONTROLLER

  static async findAllSuccessfulCompanyLoansInDescendingOrder(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    // FIND AND FILTER ALL SUCCESSFUL COMPANY LOANS

    const loans = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
      eligibility: true,
    })
      .select(
        "fullname email address createdAt eligibility creditScore loanAmount"
      )
      .sort({ createdAt: -1 })
      .skip(((+req.query.page || 1) - 1) * 10)
      .limit(10);

    const loansCount = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
      eligibility: true,
    });
    // CALCULATE THE SUM OF ALL SUCCESSFUL LOANS GENERATED BY A COMPANY
    const loansGeneratedSum = await Loan.aggregate([
      {
        $match: {
          organisation: adminCompanyMap.organisationId._id,
          eligibility: true,
        },
      },
      {
        $group: {
          _id: "null",
          sumLoansGenerated: { $sum: "$loanAmount" },
        },
      },
    ]);
    let totalSuccessLoansFigure;
    if (loansGeneratedSum.length > 0) {
      totalSuccessLoansFigure = loansGeneratedSum[0].sumLoansGenerated;
    }

    return res.status(200).json({
      message: loans.length < 1 ? "No loans found" : "Loans found successfully",
      title: "Loans Generated",
      totalPages: Math.ceil(loansCount.length / 10),
      status: "Success",
      results: loans.length,
      totalSuccessLoansFigure: totalSuccessLoansFigure,
      data: {
        loans: loans,
      },
    });
  }

  // FIND All SUCCESSFUL COMPANY LOANS GENERATED BY A COMPANY IN ASCENDING ORDER CONTROLLER

  static async findAllSuccessfulCompanyLoansInAscendingOrder(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    // FIND AND FILTER ALL SUCCESSFUL COMPANY LOANS
    const loansCount = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
      eligibility: true,
    });
    const loans = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
      eligibility: true,
    })
      .select(
        "fullname email address createdAt eligibility creditScore loanAmount"
      )
      .sort({ createdAt: 1 })
      .skip(((+req.query.page || 1) - 1) * 10)
      .limit(10);

    // CALCULATE THE SUM OF ALL SUCCESSFUL LOANS GENERATED BY A COMPANY
    const loansGeneratedSum = await Loan.aggregate([
      {
        $match: {
          organisation: adminCompanyMap.organisationId._id,
          eligibility: true,
        },
      },
      {
        $group: {
          _id: "null",
          sumLoansGenerated: { $sum: "$loanAmount" },
        },
      },
    ]);

    let totalSuccessLoansFigure;
    if (loansGeneratedSum.length > 0) {
      totalSuccessLoansFigure = loansGeneratedSum[0].sumLoansGenerated;
    }
    return res.status(200).json({
      message: loans.length < 1 ? "No loans found" : "Loans found successfully",
      title: "Loans Generated",
      status: "Success",
      totalPages: Math.ceil(loansCount.length / 10),
      results: loans.length,
      totalSuccessLoansFigure: totalSuccessLoansFigure,
      data: {
        loans: loans,
      },
    });
  }

  // FIND REJECTED COMPANY LOANS GENERATED BY A COMPANY IN DESCENDING ORDER CONTROLLER

  static async findAllRejectedCompanyLoansInDescendingOrder(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    // FIND AND FILTER REJECTED COMPANY LOANS
    const loansCount = await Loan.find({
      organisation: adminCompanyMap.organisationId._id,
      eligibility: false,
    });
    const loans = await Loan.find({
      organisation: adminCompanyMap.organisationId._id,
      eligibility: false,
    })
      .select(
        "fullname email address createdAt eligibility creditScore loanAmount"
      )
      .sort({ createdAt: -1 })
      .skip(((+req.query.page || 1) - 1) * 10)
      .limit(10);

    // CALCULATE THE SUM OF ALL REJECTED LOANS GENERATED BY A COMPANY
    const loansRejectedSum = await Loan.aggregate([
      {
        $match: {
          organisation: adminCompanyMap.organisationId._id,
          eligibility: false,
        },
      },
      {
        $group: {
          _id: "null",
          sumLoansRejected: { $sum: "$loanAmount" },
        },
      },
    ]);

    let totalRejectedLoansFigure;
    if (loansRejectedSum.length > 0) {
      totalRejectedLoansFigure = loansRejectedSum[0].sumLoansRejected;
    }
    return res.status(200).json({
      message: loans.length < 1 ? "No loans found" : "Loans found successfully",
      title: "Loans Declined",
      status: "Success",
      totalPages: Math.ceil(loansCount.length / 10),
      results: loans.length,
      totalRejectedLoansFigure,
      data: {
        loans: loans,
      },
    });
  }

  // FIND REJECTED COMPANY LOANS GENERATED BY A COMPANY IN ASCENDING ORDER CONTROLLER

  static async findAllRejectedCompanyLoansInAscendingOrder(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    // FIND AND FILTER REJECTED COMPANY LOANS
    const loansCount = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
      eligibility: false,
    });
    const loans = await Loan.find({
      organisationId: adminCompanyMap.organisationId._id,
      eligibility: false,
    })
      .select(
        "fullname email address createdAt eligibility creditScore loanAmount"
      )
      .sort({ createdAt: 1 })
      .skip(((+req.query.page || 1) - 1) * 10)
      .limit(10);

    // CALCULATE THE SUM OF ALL REJECTED LOANS GENERATED BY A COMPANY
    const loansRejectedSum = await Loan.aggregate([
      {
        $match: {
          organisation: adminCompanyMap.organisationId._id,
          eligibility: false,
        },
      },
      {
        $group: {
          _id: "null",
          sumLoansRejected: { $sum: "$loanAmount" },
        },
      },
    ]);

    let totalRejectedLoansFigure;
    if (loansRejectedSum.length > 0) {
      totalRejectedLoansFigure = loansRejectedSum[0].sumLoansRejected;
    }
    return res.status(200).json({
      message: loans.length < 1 ? "No loans found" : "Loans found successfully",
      title: "Loans Declined",
      status: "Success",
      totalPages: Math.ceil(loansCount.length / 10),
      results: loans.length,
      totalRejectedLoansFigure,
      data: {
        loans: loans,
      },
    });
  }

  // SEARCH FOR LOAN BY NAME
  static async searchForLoanByname(req, res) {
    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    try {
      const name = req.params.name;
      const loans = await Loan.find({
        fullname: { $regex: new RegExp(".*" + name + ".*", "i") },
        organisationId: adminCompanyMap.organisationId._id,
      }).select(
        "fullname email address createdAt eligibility creditScore loanAmount organisationName"
      );
      res.status(200).json({
        results: loans.length,
        loans,
      });
    } catch (err) {
      res.json({ message: err });
    }
  }
}
