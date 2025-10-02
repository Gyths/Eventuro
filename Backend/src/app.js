import express from 'express';
import { sessionMiddleware } from './config/session.js';
import { passport } from './services/passport.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import multer from "multer";
import cors from 'cors';

const app = express();
app.use(express.json());
const upload = multer();
app.use(upload.none());

app.use(cors({
    origin: "http://localhost:5173", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Permite el intercambio de cookies de sesión
}));

app.use(sessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

// Montar rutas
app.use(authRoutes);
app.use(userRoutes);

export default app;
