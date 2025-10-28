import { Router } from "express";
import { validateDiscount } from "../controllers/discount.controller.js";

const router = Router();

router.post("/validate", validateDiscount);

export default router;
