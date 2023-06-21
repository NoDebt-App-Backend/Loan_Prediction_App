import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { OAuth2Client } from "google-auth-library";
import { config } from "../config/index.js";
import Admin from "../model/admin.model.js";
import AdminGoogle from "../model/adminGoogle.model.js";
import Organisation from "../model/org.model.js";
import AdminCompanyMap from "../model/adminCompanyMap.model.js";
import { BadUserRequestError } from "../error/error.js";
// import { passport } from "../controllers/googleAuth.controller.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_id,
      clientSecret: config.google_secret,
      callbackURL: config.google_callback,
    },
    async function (accessToken, refreshToken, profile, done) {
      //   console.log(profile);
      console.log(accessToken);

      const existingEmail = await Admin.findOne({ email: email });
      if (existingEmail)
        throw new BadUserRequestError(
          "An account with this email already exists"
        );
      else {
        if (!existingEmail) {
          const adminGoogle = new AdminGoogle({
            provider: provider,
            email: email,
            googleId: id,
            firstName: givenName,
            lastName: familyName,
            imageUrl: picture,
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
            googleId,
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
                googleId,
                createdAt,
                updatedAt,
                passwordLink,
                imageUrl,
              },
            },
          });
        }
      }
    }
  )
);

export { passport }

// async function googleAuthController(req, res) {
//   const { accessToken } = passport();

//   const ticket = await client.verifyIdToken({
//     idToken: accessToken,
//     audience: config.google_id,
//   });

//   const { givenName, familyName, id, provider, email, picture } =
//     ticket.getPayload();
//   // const googleId = id;

//   const existingEmail = await Admin.findOne({ email: email });
//   if (existingEmail)
//     throw new BadUserRequestError("An account with this email already exists");
//   else {
//     if (!existingEmail) {

//       const adminGoogle = new AdminGoogle({
//         provider: provider,
//         email: email,
//         googleId: id,
//         firstName: givenName,
//         lastName: familyName,
//         imageUrl: picture,
//       });

//       const company = new Organisation({
//         organisationName: req.body.organisationName,
//       });

//       // Create a new adminCompanyMap document
//       const adminCompanyMap = new AdminCompanyMap({
//         adminId: profile.id,
//         organisationId: company._id,
//         organisationName: req.body.organisationName,
//         adminFirstName: req.body.firstName,
//         adminLastName: req.body.lastName,
//       });

//       await adminGoogle.save();

//       //save company document
//       await company.save();

//       // Save adminCompanyMap to the AdminCompanyMap collection
//       await adminCompanyMap.save();

//       const { organisationName, _id } = company;

//       const {
//         firstName,
//         lastName,
//         email,
//         googleId,
//         createdAt,
//         updatedAt,
//         passwordLink,
//         imageUrl,
//       } = adminGoogle;
//       res.status(200).json({
//         status: "Success",
//         message: "Account has been created successfully",
//         data: {
//           company_profile: {
//             company: organisationName,
//             company_id: _id,
//           },
//           admin: {
//             firstName,
//             lastName,
//             email,
//             AdminId: googleId,
//             createdAt,
//             updatedAt,
//             passwordLink,
//             imageUrl
//           },
//         },
//       });
//     }
//   }
// }

// export { googleAuthController };
