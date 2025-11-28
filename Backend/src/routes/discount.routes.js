import { Router } from "express";
import { validateDiscount } from "../controllers/discount.controller.js";
import { attachUserContext, verifyToken } from "../middlewares/ensureAuth.js";
import { listDiscountByOrganizerId } from "../controllers/discount.controller.js";

const router = Router();

router.post("/validate", validateDiscount);
router.get("/:eventId", verifyToken, attachUserContext, listDiscountByOrganizerId);
router.get("/", verifyToken, attachUserContext, listDiscountByOrganizerId);

export default router;
