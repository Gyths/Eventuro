import express from 'express';
import { createTicketCtrl } from '../controllers/ticket.controller.js';
import { updateTicketCtrl } from '../controllers/ticket.controller.js';
import { getTicketsByUserCtrl } from '../controllers/ticket.controller.js';

const router = express.Router();

router.post('/', createTicketCtrl);
router.put('/:ticketId/update', updateTicketCtrl);
router.get('/byUser/:userId', getTicketsByUserCtrl);
export default router;
