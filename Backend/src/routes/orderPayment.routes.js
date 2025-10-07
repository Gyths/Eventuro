import express from 'express'
import { confirmOrderPaymentCtrl } from '../controllers/orderPayment.controller.js'

const router = express.Router();

// Endpoint para confirmar el pago y generar tickets
router.post('/:id/pay', confirmOrderPaymentCtrl);

export default router;
