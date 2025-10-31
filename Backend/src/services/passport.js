import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "../config/env.js";
import { handleGoogleProfile } from "./auth.js";
import { findUserByIdString } from "../repositories/user.repo.js";

if (
  config.googleClientId &&
  config.googleClientSecret &&
  config.googleCallbackURL
) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: config.googleCallbackURL,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const sessionUser = await handleGoogleProfile(profile);
          return done(null, sessionUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
} else {
  console.warn(
    "⚠ Google OAuth no configurado: faltan credenciales en el archivo .env"
  );
}

passport.serializeUser((user, done) => {
  if (!user || !user.userId) {
    console.error("Passport: user.userId no definido al serializar", user);
    return done(new Error("User ID missing during serialization"));
  }
  done(null, user.userId);
});
passport.deserializeUser(async (id, done) => {
  try {
    const u = await findUserByIdString(id);
    if (!u) return done(null, false);
    done(null, { ...u, userId: String(u.userId) });
  } catch (e) {
    done(e);
  }
});

export { passport };
