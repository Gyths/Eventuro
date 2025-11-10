import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

export const transporter = nodemailer.createTransport({
  host: config.emailHost,
  port: 587,
  secure: false,
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});
