import { createOrderRepo } from '../repositories/order.repo.js';

export async function createOrderSvc(input, ctx = {}) {

  if (!input || !Array.isArray(input.items) || input.items.length === 0) {
    throw new Error('La orden debe contener al menos un item.');
  }

  if (input.currency && input.currency !== 'PEN') {
    throw new Error('Solo se permiten órdenes en PEN.');
  }

  // Convertir buyerUserId si lo manda el cliente (en tu app preferir usar req.user)
  //if (!input.buyerUserId) {
    // si no viene, deberia haberse colocado desde el controller usando req.user
    //throw new Error('buyerUserId requerido.');
  //}

  return await createOrderRepo(input, ctx);
}
