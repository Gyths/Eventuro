import express from "express";
import { verifyToken } from "../middlewares/ensureAuth.js";
import { attachUserContext } from "../middlewares/ensureAuth.js";
import { requireAdmin } from "../middlewares/ensureAuth.js";
import { listAuditTransactions } from "../controllers/audit.controller.js";
import { getAuditChanges } from "../controllers/audit.controller.js";

const router = express.Router();

router.get('/', /*verifyToken, attachUserContext, requireAdmin,*/ listAuditTransactions);
router.get('/:id', /*verifyToken, attachUserContext, requireAdmin,*/ getAuditChanges);

export default router;
