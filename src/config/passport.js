// import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { config } from "../config/index.js";
import passport from "passport";
import AdminGoogle from "../model/adminGoogle.model.js";

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
      const adminGoogle = await AdminGoogle.findOne({
        googleId: profile.id,
      });

      if (adminGoogle) {
        return done(null, adminGoogle);
      } else {
        if (req.body.email && req.body.password) {
          const email = profile.email[0].value;
          const password = req.body.password;

          const admin = new AdminGoogle({
            provider: profile.provider,
            email: email,
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.picture
          });

          await admin.save();

          return done(null, adminGoogle);
        }
      }
    }
  )
);

export { passport };
