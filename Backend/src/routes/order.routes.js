import express from "express";
import { createOrderCtrl } from "../controllers/order.controller.js";
import { cancelOrderCtrl } from "../controllers/order.controller.js";
import { getOrdersByUserCtrl } from "../controllers/order.controller.js";
import { getPurchaseAnalyticsCtrl } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrderCtrl);
router.post("/:orderId/cancel", cancelOrderCtrl);
router.get("/byUser/:userId", getOrdersByUserCtrl);
router.get("/analytics/organizer/:organizerId", getPurchaseAnalyticsCtrl);

export default router;
