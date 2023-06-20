import { OAuth2Client } from "google-auth-library";
import { config } from "../config/index.js";
import Admin from "../model/admin.model.js";
import Organisation from "../model/org.model.js";
import AdminCompanyMap from "../model/adminCompanyMap.model.js";
import { BadUserRequestError } from "../error/error.js";

const client = new OAuth2Client(config.google_id);

// server.post("/api/v1/auth/google", async (req, res) => {
//   const { token } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,
//   });
//   const { name, email, picture } = ticket.getPayload();
//   const user = await db.user.upsert({
//     where: { email: email },
//     update: { name, picture },
//     create: { name, email, picture },
//   });
//   res.status(201);
//   res.json(user);
// });

async function googleAuthController(req, res) {
  const { token } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: config.google_id,
  });

  const { givenName, familyName, id, provider, email, picture } =
    ticket.getPayload();
  const googleId = id;

  const existingEmail = await Admin.findOne({ email: email });
  if (existingEmail)
    throw new BadUserRequestError("An account with this email already exists");
  else {
    if (!adminGoogle) {

      const adminGoogle = new Admin({
        provider: provider,
        email: email,
        googleId: googleId,
        firstName: givenName,
        lastName: familyName,
        imageUrl: picture,
        callbackLink: req.body.callbackLink,
        passwordLink: req.body.passwordLink,
      });

      const company = new Organisation({
        organisationName: req.body.organisationName,
      });

      // Create a new adminCompanyMap document
      const adminCompanyMap = new AdminCompanyMap({
        adminId: profile.id,
        organisationId: company._id,
        organisationName: req.body.organisationName,
        adminFirstName: req.body.firstName,
        adminLastName: req.body.lastName,
      });

      await adminGoogle.save();

      //save company document
      await company.save();

      // Save adminCompanyMap to the AdminCompanyMap collection
      await adminCompanyMap.save();

      const { organisationName, _id } = company;

      const {
        firstName,
        lastName,
        email,
        id,
        createdAt,
        updatedAt,
        passwordLink,
        imageUrl,
      } = adminGoogle;
      res.status(200).json({
        status: "Success",
        message: "Account has been created successfully",
        data: {
          company_profile: {
            company: organisationName,
            company_id: _id,
          },
          admin: {
            firstName,
            lastName,
            email,
            AdminId: googleId,
            createdAt,
            updatedAt,
            passwordLink,
            imageUrl
          },
        },
      });
    }
  }
}

export { googleAuthController };