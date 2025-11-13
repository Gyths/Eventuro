import { Router } from 'express';
import { createComplaintController } from '../controllers/complaint.controller.js';

const router = Router();

router.post('/', createComplaintController);

export default router;
