import { Router } from "express";
import {
  createEvent,
  listEvent,
  listAvailableTickets,
  setEventStatus,
  getEventDetails,
  listEventsByOrganizer,
  listEventstoApprove,
} from "../controllers/event.controller.js";
import { verifyToken } from "../middlewares/ensureAuth.js";
import { attachUserContext } from "../middlewares/ensureAuth.js";
import { requireAdmin } from "../middlewares/ensureAuth.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/",upload.fields([{ name: "imagenPrincipal" },{ name: "imagenBanner" }]),createEvent);
router.get("/list", listEvent);
router.post("/availability", listAvailableTickets);
router.put('/:id/approve', verifyToken, attachUserContext, requireAdmin, setEventStatus);
router.get('/:id/details', getEventDetails);
router.get('/events-by-organizer/:idOrganizer', listEventsByOrganizer);
router.get('/to-approve', verifyToken, attachUserContext, requireAdmin, listEventstoApprove)
export default router;
