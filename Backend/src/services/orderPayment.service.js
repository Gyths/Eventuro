import { confirmOrderPaymentRepo } from '../repositories/orderPayment.repo.js'

export async function confirmOrderPaymentSvc(orderId) {
  if (!orderId) throw new Error('El ID de la orden es requerido.');

  return await confirmOrderPaymentRepo(orderId);
}
