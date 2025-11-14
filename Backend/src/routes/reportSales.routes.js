// src/routes/reportSales.routes.js
import { Router } from "express";
import {
  listReportSaleTicketsCtrl,
  exportReportSaleTicketsCsvCtrl,
  showSalesReportCtrl,
} from "../controllers/reportSales.controller.js";
import { verifyToken } from "../middlewares/ensureAuth.js";
import { attachUserContext } from "../middlewares/ensureAuth.js";
import { requireAdmin } from "../middlewares/ensureAuth.js";

const router = Router();

router.get(
  "/sales-tickets",
  /*verifyToken, attachUserContext, requireAdmin,*/ listReportSaleTicketsCtrl
);
router.get(
  "/sales-tickets/export",
  /*verifyToken, attachUserContext, requireAdmin, */ exportReportSaleTicketsCsvCtrl
);
router.get("/sales/:organizerId", 
  /*verifyToken, attachUserContext, requireAdmin, */ showSalesReportCtrl
);

export default router;
