import { Router } from 'express';
import { createVenue } from '../controllers/venue.controller.js'

const router = Router();

router.post('/', createVenue);

export default router;