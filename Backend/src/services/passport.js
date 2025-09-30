import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { config } from '../config/env.js';
import { handleGoogleProfile } from './auth.js';
import { findUserByIdString } from '../repositories/user.repo.js';

passport.use(new GoogleStrategy(
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
));

passport.serializeUser((user, done) => done(null, user.userId)); // string
passport.deserializeUser(async (id, done) => {
  try {
    const u = await findUserByIdString(id);
    if (!u) return done(null, false);
    done(null, { ...u, userId: String(u.userId) });
  } catch (e) { done(e); }
});

export { passport };
