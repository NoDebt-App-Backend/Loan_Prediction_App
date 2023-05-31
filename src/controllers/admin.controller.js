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
      adminName: req.body.firstName,
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
        throw new Error('AdminCompanyMap not found for the specified admin');
      }
  
      const companyId = adminCompanyMap.companyId._id;
      const companyName = adminCompanyMap.companyId.companyName;
  
      const newAdmin = new Admin({
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        password: generateRandomPassword(),
        companyId,
        companyName,
      });
  
      await newAdmin.save();
  
      res.status(200).json({
        message: 'Protected route accessed successfully',
        status: 'Success',
        data: {
          newAdmin,
        },
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message || 'Internal Server Error',
        status: 'Error',
      });
    }
  }
  
}
