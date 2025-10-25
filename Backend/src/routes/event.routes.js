import { Router } from "express";
import {
  createEvent,
  listEvent,
  listAvailableTickets,
  setEventFee,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/", createEvent);
router.get("/list", listEvent);
router.post("/availability", listAvailableTickets);
router.put('/:id/fee', setEventFee);

export default router;
