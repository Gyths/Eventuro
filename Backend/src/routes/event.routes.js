import { Router } from "express";
import {
  createEvent,
  listEvent,
  listEventInfo,
  listEventDateByEventId,
  listEventDateZonesByEventDateId,
  setEventStatus,
  getEventDetails,
  listEventsByOrganizer,
  listEventstoApprove,
  getSalesSummaryCtrl,
  getAttendeesByEventCtrl,
  updateEventDetails,
  deleteEvent,
  deleteEventDate,
  deleteEventDateZone,
  deleteTicketyTypeCtrl,
} from "../controllers/event.controller.js";
import { verifyToken } from "../middlewares/ensureAuth.js";
import { attachUserContext } from "../middlewares/ensureAuth.js";
import { requireAdmin } from "../middlewares/ensureAuth.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/",
  upload.fields([
    { name: "imagenPrincipal" },
    { name: "imagenBanner" },
    { name: "refundPolicyFile" },
  ]),
  verifyToken,
  attachUserContext,
  createEvent
);
router.get("/list", listEvent);
router.get("/events-by-organizer/:idOrganizer", listEventsByOrganizer);
router.get("/:eventId/info", listEventInfo);
router.get("/:eventId/dates", listEventDateByEventId);
router.get(
  "/:userId/:eventId/:eventDateId/zones",
  listEventDateZonesByEventDateId
);
router.put(
  "/:id/approve",
  verifyToken,
  attachUserContext,
  requireAdmin,
  setEventStatus
);
router.put(
  "/:id/update-details",
  verifyToken,
  attachUserContext,
  requireAdmin,
  updateEventDetails
);

router.get("/:id/details", getEventDetails);

router.get("/sales-summary/:organizerId", getSalesSummaryCtrl);
router.get("/:eventId/attendanceEvent/organizer/:organizerId", getAttendeesByEventCtrl);
router.get(
  "/to-approve",
  verifyToken,
  attachUserContext,
  requireAdmin,
  listEventstoApprove
);
router.post("/:eventId/del", verifyToken, deleteEvent);
router.post("/:eventDateId/del-date", verifyToken, deleteEventDate);
router.post("/:eventDateZoneId/del-zone", verifyToken, deleteEventDateZone);
router.post("/:eventId/deleteType", deleteTicketyTypeCtrl); //mandar el ticketType por body
export default router;
