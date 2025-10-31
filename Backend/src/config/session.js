import session from 'express-session';
import { config } from './env.js';

export function sessionMiddleware() {
  return session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
  });
}
