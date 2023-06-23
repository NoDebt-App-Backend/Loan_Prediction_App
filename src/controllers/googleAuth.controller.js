// import axios from "axios";
import AdminGoogle from "../model/adminGoogle.model.js";
import AdminCompanyMap from "../model/adminCompanyMap.model.js";
import Organisation from "../model/org.model.js";
import { BadUserRequestError } from "../error/error.js";
import { newToken } from "../utils/jwtHandler.js";

export default class GoogleAdminController {
  static async createGoogle(req, res) {
    const existingEmail = await AdminGoogle.findOne({ email: req.body.email });
    if (existingEmail)
      throw new BadUserRequestError(
        "An account with this email already exists"
      );

    const admin = new AdminGoogle(req.body);

    const company = new Organisation({
      organisationName: req.body.organisationName,
    });

    // Create a new adminCompanyMap document
    const adminCompanyMap = new AdminCompanyMap({
      adminId: admin._id,
      organisationId: company._id,
      organisationName: req.body.organisationName,
      adminFirstName: req.body.firstName,
      adminLastName: req.body.lastName,
    });

    await admin.save();

    //save company document
    await company.save();

    // Save adminCompanyMap to the AdminCompanyMap collection
    await adminCompanyMap.save();

    res.status(200).json({
      //mine
      message: "User found successfully",
      status: "Success",
      data: {
        googleId: admin.googleId,
        adminId: admin._id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        imageUrl: admin.imageUrl,
        access_token: newToken(admin),
        organisationId: {
          _id: company._id,
          organisationName: company.organisationName,
        },
        organisationName: company.organisationName,
      },
    });
  }

  static async loginGoogle(req, res) {
    const admin = await AdminGoogle.findOne({ email: req.body.email });
    if (!admin)
      throw new BadUserRequestError(
        "An account with this email is not registered. Please signup with google first."
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
}
