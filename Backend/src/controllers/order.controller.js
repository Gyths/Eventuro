import { createOrderSvc } from '../services/order.service.js'
import { toJSONSafe } from '../utils/serialize.js';

export async function createOrderCtrl(req, res) {
    try {
        const sessionUserId = req.user?.userId;
        if (!sessionUserId && !req.body.buyerUserId) {
            return res.status(401).json({ error: 'Usuario no autenticado.' });
        }

        const payload = {
            ...req.body,
            buyerUserId: sessionUserId ? BigInt(sessionUserId) : BigInt(req.body.buyerUserId)
        };

        const order = await createOrderSvc(payload);

        return res.status(201).json(toJSONSafe(order));
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}
