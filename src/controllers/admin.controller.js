import bcrypt from "bcrypt";
import {
  BadUserRequestError,
  InternalServerError,
  NotFoundError,
  UnAuthorizedError,
} from "../error/error.js";
import Admin from "../model/admin.model.js";
import {
  createCompanyValidator,
  loginAdminValidator,
  updateAdminValidator,
  changePasswordValidator,
} from "../validators/admin.validator.js";
import { mongoIdValidator } from "../validators/mongoId.validator.js";
import { config } from "../config/index.js";
import dotenv from "dotenv";
import Organisation from "../model/org.model.js";
import { newToken } from "../utils/jwtHandler.js";
import AdminCompanyMap from "../model/adminCompanyMap.model.js";
import generateRandomPassword from "../utils/generateRandomPassword.js";
import nodemailer from "nodemailer";
dotenv.config();

export default class AdminController {
  //get all companies
  static async getAllOrganisations(req, res) {
    const organisations = await Organisation.find();
    res.status(200).json({
      status: "Success",
      message: "Organisations found successfully",
      data: {
        organisations: organisations,
      },
    });
    if (error) throw new InternalServerError("Internal Server Error");
  }
  //get all admins
  static async getAllAdmins(req, res) {
    const admin = await Admin.find();
    res.status(200).json({
      status: "Success",
      message: "Admins found successfully",
      data: {
        Admins: admin,
      },
    });
    if (error) throw new InternalServerError("Internal Server Error");
  }

  //get all companies-admin relationship
  static async getAllAdminCompanies(req, res) {
    const adminCompanyMap = await AdminCompanyMap.find();
    res.status(200).json({
      status: "Success",
      message: "Admin-Companies found successfully",
      data: {
        AdminCompanies: adminCompanyMap,
      },
    });
    if (error) throw new InternalServerError("Internal Server Error");
  }
  //get an admin
  static async getAdmin(req, res) {
    const { id } = req.query;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");
    const admin = await Admin.findById(id);
    if (!admin) throw new NotFoundError("User not found");

    // const admin = await Admin.findOne({ email });

    // if (!admin) throw new NotFoundError("Admin not Found");

    res.status(200).json({
      message: "Admin found successfully",
      status: "Success",
      data: {
        admin,
      },
    });
    if (error) throw new InternalServerError("Internal Server Error");
  }

  //signup a company
  static async createCompany(req, res) {
    // Validation with Joi before it gets to the database
    const { error } = createCompanyValidator.validate(req.body);
    if (error) throw error;
    const existingEmail = await Admin.findOne({ email: req.body.email });
    if (existingEmail)
      throw new BadUserRequestError(
        "An account with this email already exists"
      );
    const saltRounds = config.bcrypt_saltRound;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    // Check if the company name already exists
    const existingCompany = await Organisation.findOne({
      name: req.body.organisationName,
    });
    if (existingCompany)
      throw new BadUserRequestError("Company name already exists");

    // Create new admin account
    const admin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    // Create a new company document
    const company = new Organisation({
      organisationName: req.body.organisationName,
    });

    // Create a new adminCompanyMap document
    const adminCompanyMap = new AdminCompanyMap({
      adminId: admin._id,
      organisationId: company._id,
      organisationName: req.body.organisationName,
      adminFirstName: req.body.firstName,
    });

    // Save admin to the Admin collection
    await admin.save();

    //save company document
    await company.save();

    // Save adminCompanyMap to the AdminCompanyMap collection
    await adminCompanyMap.save();
    // Save company to the Company collection

    const { _id, createdAt, updatedAt } = admin;
    // Return a response to the client
    res.status(200).json({
      message: "Company account created successfully",
      status: "Success",
      data: {
        company_profile: {
          company: req.body.organisationName,
          company_id: company._id,
        },
        admin: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          AdminId: _id,
          createdAt: createdAt,
          updatedAt: updatedAt,
        },
      },
    });
  }

  static async Login(req, res) {
    // Catching all the errors and handling them as they are returned in the response body
    const { value, error } = loginAdminValidator.validate(req.body);
    if (error) throw error;

    if (!req.body.email || !req.body.password)
      throw new BadUserRequestError(
        "Please provide a valid email address and password before you can login."
      );

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin)
      throw new BadUserRequestError(
        "Please provide a valid email address and password before you can login."
      );

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!passwordMatch)
      throw new BadUserRequestError(
        "Please provide a valid email address and password before you can login."
      );

    const { _id, email, name } = admin;
    // Returning a response to the client
    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        adminId: _id,
        adminName: name,
        email: email,
        access_token: newToken(admin),
      },
    });
  }

  static async protectedRoute(req, res) {
    // Route logic for authenticated users only
    res.status(200).json({
      message: "Protected route accessed successfully",
      status: "Success",
    });
  }

  static async addAdmin(req, res) {
    const { firstName, lastName, email, phoneNumber, role } = req.body;

    const adminCompanyMap = await AdminCompanyMap.findOne({
      adminId: req.admin.adminId,
    }).populate("companyId", " companyName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    const companyId = adminCompanyMap.companyId._id;
    const companyName = adminCompanyMap.companyId.companyName;

    const newpassword = generateRandomPassword();
    const saltRounds = config.bcrypt_saltRound;
    const hashedPassword = bcrypt.hashSync(newpassword, saltRounds);
    console.log(newpassword);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password: hashedPassword,
      companyId,
      companyName,
    });

    const newAdminCompanyMap = new AdminCompanyMap({
      adminId: newAdmin._id,
      companyId: companyId,
      companyName: companyName,
      adminFisrtName: firstName,
      adminLastName: lastName,
    });
    await newAdminCompanyMap.save();
    await newAdmin.save();

    // Send email to new admin
    // Configurations for email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.nodemailerUser, //  Gmail email address
        pass: config.nodemailerPassword, //  Gmail password or an application-specific password
      },
    });

    const mailOptions = {
      from: "nodebtapplication@gmail.com",
      to: newAdmin.email,
      subject: "Welcome to Nodebt",
      text: `Hello ${newAdmin.firstName},\n\nWelcome to No Debt!\n\nYour login details are as follows:\nEmail: ${newAdmin.email}\nPassword: ${newpassword}\n\nPlease use the following link to access the login page: https://localhost:4000/api/admin/login\n\nIf you have any questions, feel free to contact us.\n\nBest regards,\nNodebt`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Protected route accessed successfully",
      status: "Success",
      data: {
        newAdmin,
        newpassword,
      },
    });
    if (error) {
      throw new InternalServerError({
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async updateAdmin(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const updateValidatorResponse = updateAdminValidator.validate(req.body);
    const updateAdminError = updateValidatorResponse.error;
    if (error) throw updateAdminError;

    const admin = await Admin.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        organisationEmail: req.body.organisationEmail,
        numberOfStaffs: req.body.numberOfStaffs,
        staffID: req.body.staffID,
        organisationType: req.body.organisationType,
        role: req.body.role,
        website: req.body.website,
        position: req.body.position,
        phoneNumber: req.body.phoneNumber,
      },
      { new: true }
    );

    if (!admin) throw new InternalServerError("Failed to update profile");

    // save to mongoose database
    await admin.save();

    // Return a response to the client
    res.status(200).json({
      message: "Profile updated successfully",
      status: "Success",
      data: {
        admin: admin,
      },
    });
  }

  static async changePassword(req, res) {
    const { id } = req.params;
    const { error } = mongoIdValidator.validate(req.params);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");

    const updatePasswordResponse = changePasswordValidator.validate(req.body);
    const updatePasswordError = updatePasswordResponse.error;
    if (error) throw updatePasswordError;

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const currentAdmin = await Admin.findById(id);

    if (confirmNewPassword !== newPassword)
      throw new BadUserRequestError(
        "New Password and confirm New Password do not match."
      );

    const PasswordMatch = await bcrypt.compare(
      oldPassword,
      currentAdmin.password
    );

    if (!PasswordMatch)
      throw new BadUserRequestError(
        "Password incorrect. Please provide a correct password"
      );

    const saltRounds = config.bcrypt_saltRound;
    const hashedNewPassword = bcrypt.hashSync(newPassword, saltRounds);

    currentAdmin.password = hashedNewPassword;
    currentAdmin.confirmPassword = hashedNewPassword;

    await currentAdmin.save();

    res.status(200).json({
      status: "Success",
      message: "Password changed successfully",
    });

    if (error)
      throw new InternalServerError("Something went wrong! Please try again");
  }
}
