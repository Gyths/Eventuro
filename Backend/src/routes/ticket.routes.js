import express from 'express';
import { createTicketCtrl } from '../controllers/ticket.controller.js';
import { updateTicketCtrl } from '../controllers/ticket.controller.js';
import { requestTicketRefundCtrl } from '../controllers/ticket.controller.js';
import { listRefundSolicitationsCtrl } from '../controllers/ticket.controller.js';
import { approveRefundCtrl } from '../controllers/ticket.controller.js';
import { rejectRefundCtrl } from '../controllers/ticket.controller.js';

const router = express.Router();

router.post('/', createTicketCtrl);
router.put('/:ticketId/update', updateTicketCtrl);
router.post('/:ticketId/request-refund', requestTicketRefundCtrl);
router.get('/refund-requests/:organizerId', listRefundSolicitationsCtrl);
router.post('/:ticketId/approve-refund', approveRefundCtrl);
router.post('/:ticketId/reject-refund', rejectRefundCtrl);

export default router;
