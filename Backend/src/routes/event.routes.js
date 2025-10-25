import { Router } from "express";
import {
  createEvent,
  listEvent,
  listAvailableTickets,
} from "../controllers/event.controller.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("imagenPrincipal"), createEvent);
router.get("/list", listEvent);
router.post("/availability", listAvailableTickets);

export default router;
