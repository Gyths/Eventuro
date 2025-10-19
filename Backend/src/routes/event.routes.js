import { Router } from "express";
import {
  createEvent,
  listEvent,
  listAvailableTickets,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/", createEvent);
router.get("/list", listEvent);
router.post("/availability", listAvailableTickets);

export default router;
