import express from 'express';
import { createTicketCtrl } from '../controllers/ticket.controller.js';
import { updateTicketCtrl } from '../controllers/ticket.controller.js';


const router = express.Router();

router.post('/', createTicketCtrl);
router.put('/:id/update', updateTicketCtrl);

export default router;
