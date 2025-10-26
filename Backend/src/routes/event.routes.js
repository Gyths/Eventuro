import { Router } from "express";
import {
  createEvent,
  listEvent,
  listAvailableTickets,
  setEventFee,
} from "../controllers/event.controller.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("imagenPrincipal"), createEvent);
router.get("/list", listEvent);
router.post("/availability", listAvailableTickets);
router.put('/:id/fee', setEventFee);

export default router;
