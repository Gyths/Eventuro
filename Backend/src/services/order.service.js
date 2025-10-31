import { createOrderRepo } from '../repositories/order.repo.js';
import { cancelOrderRepo } from '../repositories/order.repo.js';
import { findByUserId } from '../repositories/order.repo.js';

export async function createOrderSvc(input, ctx = {}) {

  if (!input || !Array.isArray(input.items) || input.items.length === 0) {
    throw new Error('La orden debe contener al menos un item.');
  }

  if (input.currency && input.currency !== 'PEN') {
    throw new Error('Solo se permiten órdenes en PEN.');
  }

  if (!input.buyerUserId) {
    throw new Error('buyerUserId requerido.');
  }

  return await createOrderRepo(input, ctx);
}


export async function cancelOrderSvc(orderId) {

  if (!orderId) {
    throw new Error('orderId requerido.');
  }
  return await cancelOrderRepo(orderId);
}

export const getOrdersByUser = async (userId) => {
  return await findByUserId(userId);
}
