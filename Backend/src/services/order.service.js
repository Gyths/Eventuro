import { createOrderRepo } from '../repositories/order.repo.js';

export async function createOrderSvc(input, ctx = {}) {
  // Validaciones básicas
  if (!input || !Array.isArray(input.items) || input.items.length === 0) {
    throw new Error('La orden debe contener al menos un item.');
  }

  // Forzar moneda en payload (opcionales)
  if (input.currency && input.currency !== 'PEN') {
    throw new Error('Solo se permiten órdenes en PEN.');
  }

  // Convertir/normalizar buyerUserId si lo manda el cliente (en tu app preferir usar req.user)
  //if (!input.buyerUserId) {
    // si no viene, deberia haberse colocado desde el controller usando req.user
    //throw new Error('buyerUserId requerido.');
  //}

  // normalizar numeric/string -> BigInt en repo (repo ya lo hace)
  return await createOrderRepo(input, ctx);
}
