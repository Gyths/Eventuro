import { Router } from 'express';
import { createComplaintController } from '../controllers/complaint.controller.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/', upload.single("evidence"), createComplaintController);

export default router;
