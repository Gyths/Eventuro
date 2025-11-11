import express from "express";
import { createOrderCtrl } from "../controllers/order.controller.js";
import { cancelOrderCtrl } from "../controllers/order.controller.js";
import { getOrdersByUserCtrl } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrderCtrl);
router.post("/:orderId/cancel", cancelOrderCtrl);
router.get("/byUser/:userId", getOrdersByUserCtrl);

export default router;
