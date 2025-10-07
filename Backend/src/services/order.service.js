import { createOrderRepo } from '../repositories/order.repo.js'

export async function createOrderSvc(input) {
    if (!input.buyerUserId || !Array.isArray(input.items) || input.items.length === 0) {
        throw new Error('Datos de orden inválidos.');
    }

    // Valida que todas las monedas sean PEN
    input.items.forEach(i => {
        if (i.currency && i.currency !== 'PEN') {
            throw new Error('Solo se permiten órdenes en soles peruanos (PEN).');
        }
    });

    // Aquí podrías aplicar lógica de códigos de descuento globales si existen.
    return await createOrderRepo(input);
}
