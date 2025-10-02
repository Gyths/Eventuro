import { Router } from 'express';
import { createManyEventSalesPhases } from '../controllers/eventSalesPhase.controller.js'

const router = Router();

router.post('/', createManyEventSalesPhases);

export default router;