import express from 'express';
import { sessionMiddleware } from './config/session.js';
import { passport } from './services/passport.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import multer from "multer";

const app = express();
app.use(express.json());
const upload = multer();
app.use(upload.none());

app.use(sessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

// Montar rutas
app.use(authRoutes);
app.use(userRoutes);

export default app;
