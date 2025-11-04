import express from "express";
import { listAuditLogs } from "../controllers/audit.controller.js";
import { verifyToken } from "../middlewares/ensureAuth.js";
import { attachUserContext } from "../middlewares/ensureAuth.js";
import { listAuditTransactions } from "../controllers/audit.controller.js";
import { getAuditChanges } from "../controllers/audit.controller.js";

const router = express.Router();

router.get("/list", listAuditLogs);
router.get('/', listAuditTransactions);
router.get('/:id',  getAuditChanges);

export default router;
