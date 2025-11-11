import { Router } from "express";
import {
  createEvent,
  listEvent,
  listEventInfo,
  listEventDateByEventId,
  listEventDateZoneByEventDateId,
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

router.post(
  "/",
  upload.fields([{ name: "imagenPrincipal" }, { name: "imagenBanner" }]),
  verifyToken,
  attachUserContext,
  createEvent
);
router.get("/list", listEvent);
router.get("/info", listEventInfo);
router.get("/dates", listEventDateByEventId);
router.get("/zones", listEventDateZoneByEventDateId);
router.put(
  "/:id/approve",
  verifyToken,
  attachUserContext,
  requireAdmin,
  setEventStatus
);
router.get("/:id/details", getEventDetails);
router.get("/events-by-organizer/:idOrganizer", listEventsByOrganizer);
router.get(
  "/to-approve",
  verifyToken,
  attachUserContext,
  requireAdmin,
  listEventstoApprove
);
export default router;
