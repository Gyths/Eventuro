import { Router } from 'express';
import { createEvent, listEvent} from '../controllers/event.controller.js'

const router = Router();

router.post('/', createEvent);
router.get('/list', listEvent);

export default router;