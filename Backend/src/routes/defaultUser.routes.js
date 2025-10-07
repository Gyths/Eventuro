// src/routes/defaultUser.routes.js
import express from "express";
import bcrypt from "bcrypt";

import { createDefaultUser , listDefaultUser} from '../controllers/defaultUser.controller.js';

const router = express.Router();

// Crear usuario
router.post("/register", createDefaultUser);
router.get("/list", listDefaultUser);


export default router;
