import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { config } from "../config/index.js";
import AdminGoogle from "../model/adminGoogle.model.js"

// Google OAuth strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google_id,
      clientSecret: config.google_secret,
      callbackURL: config.google_callback,
      passReqToCallback: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      const adminGoogle = await AdminGoogle.findOne({
        googleId: profile.id,
      });

      if (adminGoogle) {
        done(null, adminGoogle)
      } else {
        if (req.body.email && req.body.password) {
          const email = profile.email[0].value;
          const password = req.body.password;

          const admin = new AdminGoogle({
            email,
            password,
            googleId: profile.id,
            name: profile.displayName
          });

          adminGoogle = await admin.save();

          done(null, adminGoogle);
        } else {
          done(null, false, {
            message: 'Please signup with Google or your email address'
          })
        }
      }

      if (error) throw error;

  //     if (!adminGoogle) {
  //       const adminGoogle = new AdminGoogle({
  //         googleId: profile.id,
  //         // firstName: profile.givenName,
  //         // lastName: profile.familyName,
  //         profileImage: profile.picture,
  //         email: profile.emails[0].value,
  //       //   accessToken: accessToken,
  //         // provider: profile.provider,
  //         // passwordLink: req.body.passwordLink,
  //       });
  //       await adminGoogle.save();
  //       // console.log(profile);
  //     }

  //     const { googleId, _id, createdAt, updatedAt, email, passwordLink } = adminGoogle;
  // //           // Return a response to the client
  //           res.status(200).json({
  //             message: "Account created successfully",
  //             status: "Success",
  //             data: {
  //              adminGoogle: {
  // //                 firstName: firstName,
  // //                 lastName: lastName,
  //                 email: email,
  //                 AdminId: _id,
  //                 GoogleId: googleId,
  //                 createdAt: createdAt,
  //                 updatedAt: updatedAt,
  //                 passwordLink: passwordLink,
                // },
              // },
            // });

  //           if (error) {
  //             console.log(error);
  //           }
  //           return cb(
  //             req,
  //             res.status(200).json({
  //               status: "Success",
  //               message: "Facebook User signed up successfully",
  //               admin: adminFacebook,
  //             })
  //           );
  //         } else {
  //           return cb(
  //             req,
  //             res.status(200).json({
  //               status: "Success",
  //               message: "Facebook User already exists",
  //             })
  //           );
  //         }
  //       }
  //     )
  //   );

    }
  )
);

const authController = {
  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleAuthCallback: passport.authenticate("google", {
    successRedirect: "/signup/google",
    failureRedirect: "/",
  }),
};

export default authController;
