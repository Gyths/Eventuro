import { Router } from "express";
import {
  createEvent,
  listEvent,
  listAvailableTickets,
  setEventFee,
  getEventDetails,
  listEventsByOrganizer,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/", createEvent);
router.get("/list", listEvent);
router.post("/availability", listAvailableTickets);
router.put('/:id/fee', setEventFee);
router.get('/:id/details', getEventDetails);
router.get('/events-by-organizer/:idOrganizer', listEventsByOrganizer);

export default router;
