import axios from "axios";
import AdminGoogle from "../model/adminGoogle.model.js";
import AdminCompanyMap from "../model/adminCompanyMap.model.js";
import Organisation from "../model/org.model.js";
import { BadUserRequestError } from "../error/error.js";

export async function getGoogleToken(req, res) {
  const existingEmail = await AdminGoogle.findOne({ email: req.body.email });
  if (existingEmail)
    throw new BadUserRequestError("An account with this email already exists");

  const admin = new AdminGoogle(req.body);

  const { createdAt } = admin;

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

  const { organisationName, _id } = company;

  res.status(200).json({
    status: "Success",
    message: "Account registered successfully",
    data: {
      company_profile: {
        company: organisationName,
        company_id: _id,
      },
      admin: admin,
      createdAt,
    },
  });
}

// loan.creditScore = response.data.creditScore;

// const userInfo = await axios
//   .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//   .then((res) => res.data);

// console.log(userInfo);

// await axios
// .get("https://www.googleapis.com/oauth2/v3/userinfo", {
//   headers: { Authorization: `Bearer ${token}` },
// })
// .then((res) => res.data);

// console.log(userInfo);
