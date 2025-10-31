import express from 'express'
import { createOrderCtrl } from '../controllers/order.controller.js'
import { cancelOrderCtrl } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', createOrderCtrl);
router.post('/:id/cancel', cancelOrderCtrl);

export default router;
