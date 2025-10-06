import { Router } from 'express';
import { createManyEventToCategory } from '../controllers/eventToCategory.controller.js'

const router = Router();

router.post('/', createManyEventToCategory);

export default router;