import { Router } from "express";
import { verifyToken, attachUserContext } from "../middlewares/ensureAuth.js";
import { upsertOrganizerCtrl } from "../controllers/organizer.controller.js";

const router = Router();

router.post("/organizers", verifyToken, attachUserContext, upsertOrganizerCtrl);

export default router;
