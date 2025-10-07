import { confirmOrderPaymentSvc } from '../services/orderPayment.service.js'

export async function confirmOrderPaymentCtrl(req, res) {
  try {
    const orderId = req.params.id;
    const result = await confirmOrderPaymentSvc(orderId);

    res.status(200).json({
      message: 'Pago confirmado y tickets generados correctamente.',
      data: result
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
}
