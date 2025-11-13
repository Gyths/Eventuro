import { Router } from 'express';
import { verifyToken } from "../middlewares/ensureAuth.js";
import { createComplaintController } from '../controllers/complaint.controller.js';
import { listComplaintsByUserController } from '../controllers/complaint.controller.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/', upload.single("evidence"), verifyToken, createComplaintController);
router.get('/user/:userId', listComplaintsByUserController);

export default router;
