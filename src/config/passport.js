import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { config } from "../config/index.js";
import AdminGoogle from "../model/adminGoogle.model.js";

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
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    AdminGoogle.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

const authController = {
  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleAuthCallback: passport.authenticate("google", { session: false }),

  async oauth(req, res) {
    console.log(req);
    res.redirect(200);
  },
};

export default authController;
