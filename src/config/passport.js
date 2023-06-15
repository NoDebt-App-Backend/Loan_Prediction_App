import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { config } from "../config/index.js";
import AdminGoogle from "../model/adminGoogle.model.js"

// Google OAuth strategy configuration
export function passportConfig(passport) {
    passport.use(
        new GoogleStrategy(
          {
            clientID: config.google_id,
            clientSecret: config.google_secret,
            callbackURL: config.google_callback,
            passReqToCallback: true,
          },
          async function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            // const adminGoogle = await AdminGoogle.findOne({
            //   googleId: profile.id,
            // });
      
            // if (adminGoogle) {
            //   done(null, adminGoogle)
            // } else {
            //   if (req.body.email && req.body.password) {
            //     const email = profile.email[0].value;
            //     const password = req.body.password;
      
            //     const admin = new AdminGoogle({
            //       email,
            //       password,
            //       googleId: profile.id,
            //       name: profile.displayName
            //     });
      
            //     adminGoogle = await admin.save();
      
            //     done(null, adminGoogle);
            //   } else {
            //     done(null, false, {
            //       message: 'Please signup with Google or your email address'
            //     })
            //   }
            // }
      
            // if (error) throw error;
          }
        )
      )
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        AdminGoogle.findById(id, function(err, user) {
            done(err, user);
        });
    });
}

const authController = {
  googleAuth: passport.authenticate("google", { scope: ["profile"] }),

  googleAuthCallback: passport.authenticate("google", {
      failureRedirect: "/",
  }, (req, res) => {
    res.redirect("/signup")
  }),
};

export default authController;
