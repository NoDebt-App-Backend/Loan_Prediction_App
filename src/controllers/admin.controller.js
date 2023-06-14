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

  static async getAllAdmins(req, res) {
    const { id } = req.query;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw new BadUserRequestError("Please pass in a valid mongoId");
    const admin = await Admin.findById(id);
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
    if (!admin) throw new NotFoundError("Admin not found");

    res.status(200).json({
      message: "Admin found successfully",
      status: "Success",
      data: {
        admin,
      },
    });
    if (error) throw new InternalServerError("Internal Server Error");
  }

  //get admins by company id
  static async getAdminsByCompany(req, res) {
    const organisationId = req.query.organisationId;
    const adminCompanyMaps = await AdminCompanyMap.find({ organisationId })
      .populate({
        path: "adminId",
        model: "Admin",
        select: "firstName lastName email phoneNumber role",
      })
      .exec();

    if (!adminCompanyMaps || adminCompanyMaps.length === 0) {
      throw new NotFoundError("No admins found for the given companyId");
    }

    const admins = adminCompanyMaps.map(
      (adminCompanyMap) => adminCompanyMap.adminId
    );

    res.status(200).json({
      message: "Admins found successfully",
      status: "Success",
      data: {
        admins,
      },
    });
  }

  //get company by id
  static async getCompanyById(req, res) {
    const organisationId = req.query.organisationId;
    const organisation = await Organisation.findById(organisationId);
    if (!organisation) throw new NotFoundError("organisation not found");

    res.status(200).json({
      message: "organisation retrieved successfully",
      status: "Success",
      data: {
        organisation,
      },
    });
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

    const imageDefaultUrl = "https://nodebt-photosbucket.s3.us-east-1.amazonaws.com/User-Icon-Grey-300x300.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2PPOPHMTJ73UG25L%2F20230613%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230613T201841Z&X-Amz-Expires=3600&X-Amz-Signature=d72e1dd2227f011987a4a8f94ec969e0fd686102b0053c89dca433d23184b201&X-Amz-SignedHeaders=host&x-id=GetObject"

    // Create new admin account
    const admin = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      passwordLink: req.body.passwordLink,
      imageUrl: imageDefaultUrl,
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

    const { _id, createdAt, updatedAt, passwordLink, imageUrl } = admin;
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
          passwordLink: passwordLink,
          imageUrl: imageUrl,
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

    const { _id, email, firstName, lastName, imageUrl } = admin;
    // console.log(admin);

    const adminCompany = await AdminCompanyMap.findOne({
      adminId: _id,
    }).populate("organisationId", " organisationName");

    const { organisationName, organisationId } = adminCompany;

    // Returning a response to the client
    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        adminId: _id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        imageUrl: imageUrl,
        access_token: newToken(admin),
        organisationId: organisationId,
        organisationName: organisationName,
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
    }).populate("organisationId", " organisationName");

    if (!adminCompanyMap) {
      throw new UnAuthorizedError(
        "Admin is not found and cannot perform this operation."
      );
    }

    const organisationId = adminCompanyMap.organisationId._id;
    const organisationName = adminCompanyMap.organisationId.organisationName;

    const newpassword = generateRandomPassword();
    const saltRounds = config.bcrypt_saltRound;
    const hashedPassword = bcrypt.hashSync(newpassword, saltRounds);
    console.log(newpassword);

    const imageDefaultUrl = "https://nodebt-photosbucket.s3.us-east-1.amazonaws.com/User-Icon-Grey-300x300.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA2PPOPHMTJ73UG25L%2F20230613%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230613T201841Z&X-Amz-Expires=3600&X-Amz-Signature=d72e1dd2227f011987a4a8f94ec969e0fd686102b0053c89dca433d23184b201&X-Amz-SignedHeaders=host&x-id=GetObject"

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password: hashedPassword,
      organisationId,
      organisationName,
      loginURL: req.body.loginURL,
      imageUrl: req.body.url || imageDefaultUrl,
    });

    const newAdminCompanyMap = new AdminCompanyMap({
      adminId: newAdmin._id,
      organisationId: organisationId,
      organisationName: organisationName,
      adminFirstName: firstName,
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
        user: config.nodemailer_user, //  Gmail email address
        pass: config.nodemailer_pass, //  Gmail password or an application-specific password
      },
    });

    const loginURL = newAdmin.loginURL;

    const mailOptions = {
      from: "nodebtapplication@gmail.com",
      to: newAdmin.email,
      subject: "Welcome to Nodebt",
      text: `Hello ${newAdmin.firstName},\n\nWelcome to No Debt!\n\nYour login details are as follows:\nEmail: ${newAdmin.email}\nPassword: ${newpassword}\n\nPlease use the following link to access the login page: ${loginURL}\n\nIf you have any questions, feel free to contact us.\n\nBest regards,\nNodebt`,
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

    const adminUser = await Admin.findById(id);

    const { imageDefaultUrl } = adminUser;

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
        imageUrl: req.body.imageUrl || imageDefaultUrl,
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
