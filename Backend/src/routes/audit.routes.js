import express from "express";
import { listAuditLogs } from "../controllers/audit.controller.js";

const router = express.Router();

router.get("/list", listAuditLogs);

export default router;
