import bcrypt from "bcrypt";
import { BadUserRequestError, InternalServerError, UnAuthorizedError } from "../error/error.js";
import Admin from "../model/admin.model.js";
import {createCompanyValidator, loginAdminValidator}from "../validators/admin.validator.js";
import { config } from "../config/index.js";
import dotenv from "dotenv";
import Company from "../model/company.model.js";
import { newToken } from "../utils/jwtHandler.js";
import AdminCompanyMap from "../model/adminCompanyMap.model.js";
import generateRandomPassword from "../utils/generateRandomPassword.js";
import nodemailer from "nodemailer"
dotenv.config();

export default class AdminController {
  //get all companies
  static async getAllCompanies(req, res){
    try {
      const companies = await Company.find();
      res.json(companies);
      
    } catch (error) {
        throw new InternalServerError(
           'Internal Server Error'
        )
    }
  }
   //get all admins
  static async getAllAdmins (req, res){
    try {
      const admin = await Admin.find();
      res.json(admin);
    } catch (error) {
      throw new InternalServerError(
        'Internal Server Error'
     )
    }
  };

  //get all companies-admin relationship
  static async getAllAdminCompanies(req, res){
    try {
      const adminCompanyMap = await AdminCompanyMap.find();
      res.json(adminCompanyMap);
    } catch (error) {
        throw new InternalServerError(
           'Internal Server Error'
        )
      
    }
  };
  //get an admin
  static async getAdmin(req, res) {
    try {
      const { email } = req.query;
  
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(404).json({
          message: 'Admin not found',
          status: 'Error',
        });
      }
  
      res.status(200).json({
        message: 'Admin found',
        status: 'Success',
        data: {
          admin,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        status: 'Error',
      });
    }
  }
  
  //signup a company
  static async createCompany(req, res) {
    // Validation with Joi before it gets to the database
    const { error } = createCompanyValidator.validate(req.body);
    if (error) {
      const errorMessage = error.details ? error.details[0].message : error.message;
      throw new BadUserRequestError(errorMessage);
    }    
    const existingEmail = await Admin.findOne({ email: req.body.email });
    if (existingEmail)
      throw new BadUserRequestError(
        "An account with this email already exists"
      );
    const saltRounds = config.bcrypt_saltRound;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  

    // Check if the company name already exists
    const existingCompany = await Company.findOne({
      name: req.body.companyName,
    });
    if (existingCompany)
      throw new BadUserRequestError("Company name already exists");

    // Create new admin account
    const admin = new Admin({
      firstName: req.body.firstName,
      // lastName: undefined,
      // phoneNumber: undefined,
      email: req.body.email,
      // role: undefined,
      password: hashedPassword,
      confirmPassword: hashedPassword
    });


    // Create a new company document
    const company = new Company({
      name: req.body.companyName,
    });

    
    // Create a new adminCompanyMap document
    const adminCompanyMap = new AdminCompanyMap({
      adminId: admin._id,
      companyId: company._id,
      companyName: req.body.companyName,
      adminFisrtName: req.body.firstName,
    });
   
   // Save admin to the Admin collection
    await admin.save();

   //save company document
    await company.save();

    // Save adminCompanyMap to the AdminCompanyMap collection
    await adminCompanyMap.save();
    // Save company to the Company collection
    
    // Return a response to the client
    res.status(200).json({
      message: "Company account created successfully",
      status: "Success",
      data: {
            company_profile:{ company: req.body.companyName,
            company_id: company._id,},
            admin:{
                firstName: req.body.firstName,
                email: req.body.email,
                hashedPassword: hashedPassword,
                id: admin._id,
            }
      },
    });
  }

  static async Login(req, res) {
    // Catching all the errors and handling them as they are returned in the response body
    const { value, error } = loginAdminValidator.validate(req.body);
    if (error) throw error;
  
    if (!req.body.email || !req.body.password)
      throw new BadUserRequestError("Please provide a valid email address and password before you can login.");
  
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin)
      throw new BadUserRequestError("Invalid email address. Please provide a valid email address before you can login.");
  
    const passwordMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!passwordMatch)
      throw new BadUserRequestError("Invalid password. Please provide a valid password before you can login.");
  
    // Returning a response to the client
    res.status(200).json({
      message: "User found successfully",
      status: "Success",
      data: {
        access_token: newToken(admin),
      },
    });
  }
  
  
  static async addAdmin(req, res) {
    try {
      const { firstName, lastName, email, phoneNumber, role } = req.body;
  
      const adminCompanyMap = await AdminCompanyMap.findOne({ adminId: req.admin.adminId }).populate('companyId', ' companyName');
  
      if (!adminCompanyMap) {
        throw new UnAuthorizedError('Admin is not found and cannot perform this operation.');
      }
  
      const companyId = adminCompanyMap.companyId._id;
      const companyName = adminCompanyMap.companyId.companyName;


      const newpassword = generateRandomPassword();
      const saltRounds = config.bcrypt_saltRound;
      const hashedPassword = bcrypt.hashSync(newpassword, saltRounds);
      console.log(newpassword)
  
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
  
      

      const newAdminCompanyMap = new AdminCompanyMap(
        {
        adminId: newAdmin._id,
        companyId: companyId,
        companyName: companyName,
        adminFisrtName: firstName,
        adminLastName:lastName
        }
      )
      await newAdminCompanyMap.save();
      await newAdmin.save();

 // Send email to new admin
  // Configurations for email
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: config.nodemailerUser, //  Gmail email address
      pass: config.nodemailerPassword //  Gmail password or an application-specific password
    }
  });
  

const mailOptions = {
  from: 'nodebtapplication@gmail.com',
  to: newAdmin.email,
  subject: 'Welcome to Nodebt',
  text: `Hello ${newAdmin.firstName},\n\nWelcome to our company!\n\nYour login details are as follows:\nEmail: ${newAdmin.email}\nPassword: ${newpassword}\n\nPlease use the following link to access the login page: https://localhost:4000/api/admin/login\n\nIf you have any questions, feel free to contact us.\n\nBest regards,\nNodebt`,};

await transporter.sendMail(mailOptions);

res.status(200).json({
  message: 'Protected route accessed successfully',
  status: 'Success',
  data: {
    newAdmin, newpassword
  }
});
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: 'Error',
      });
    }
  }
  
}
