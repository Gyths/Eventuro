// src/routes/defaultUser.routes.js
import express from "express";
import bcrypt from "bcrypt";

import { createDefaultUser } from '../controllers/defaultUser.controller.js';

const router = express.Router();

// Crear usuario
router.post("/register", createDefaultUser);



export default router;
