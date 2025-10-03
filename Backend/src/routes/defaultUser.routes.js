// src/routes/defaultUser.routes.js
import express from "express";
import bcrypt from "bcrypt";

import { registrarUsuarioDedault,mostrarUsuariosDedault } from '../controllers/defaultUser.controller.js';

const router = express.Router();

// Crear usuario
router.post("/register", registrarUsuarioDedault);
router.get("/show", mostrarUsuariosDedault);


export default router;
