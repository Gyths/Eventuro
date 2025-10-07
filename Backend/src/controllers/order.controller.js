import { createOrderSvc } from '../services/order.service.js'

export async function createOrderCtrl(req, res) {
    try {
        const result = await createOrderSvc(req.body);
        res.status(201).json({
            message: 'Orden creada exitosamente.',
            data: result
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
}
