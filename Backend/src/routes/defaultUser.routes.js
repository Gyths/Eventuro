// src/routes/defaultUser.routes.js
import express from "express";
import bcrypt from "bcrypt";

import { registrarUsuarioDedault } from '../controllers/defaultUser.controller.js';

const router = express.Router();

// Crear usuario
router.post("/register", registrarUsuarioDedault);

export default router;
