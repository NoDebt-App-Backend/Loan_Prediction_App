// import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { config } from "../config/index.js";
import passport from "passport";
import AdminGoogle from "../model/adminGoogle.model.js";
import { createCompanyValidator } from "../validators/admin.validator.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_id,
      clientSecret: config.google_secret,
      callbackURL: config.google_callback,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);
      try {
        const adminGoogle = await AdminGoogle.findOne({
          googleId: profile.id,
        });

        if (adminGoogle) {
          return done(null, adminGoogle);
        } else {
          const { error } = createCompanyValidator.validate(req.body);
          if (error) throw error;

          // Create a new company document
          // const company = new Organisation({
          //   organisationName: req.body.organisationName,
          // });

          // // Create a new adminCompanyMap document
          // const adminCompanyMap = new AdminCompanyMap({
          //   adminId: profile.id,
          //   organisationId: company._id,
          //   organisationName: req.body.organisationName,
          //   adminFirstName: req.body.firstName,
          //   adminLastName: req.body.lastName,
          // });

          if (!adminGoogle) {
            // const email = profile.email[0].value;

            const admin = new AdminGoogle({
              provider: profile.provider,
              email: profile.email,
              googleId: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.picture,
            });

            await admin.save();

            // //save company document
            // await company.save();

            // // Save adminCompanyMap to the AdminCompanyMap collection
            // await adminCompanyMap.save();

            // const { organisationName } = company;

            // // const { firstName, lastName, email, adminId, createdAt, updatedAt, passwordLink, image } = admin;

            return done(null, admin);
          }
        }
      } catch (err) {
        throw err;
      }
    }
  )
);

const googleAuthController = {
  googleAuth: (req, res) => {

  },
  googleAuthCallback: (req, res) => {
    
    const adminGoogle = AdminGoogle.findById(profile.id)
    res.status(200).json({
      status: 'Success',
      message: 'Account has been created successfully',
      data: {
        admin: admin
      }
    })
  },
}

export { passport };
