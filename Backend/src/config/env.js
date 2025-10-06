import 'dotenv/config';

export const config = {
  port: process.env.PORT || 4000,
  sessionSecret: process.env.SESSION_SECRET || 'cats',
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:4000/google/callback'
};

