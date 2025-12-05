import { createOrderSvc } from "../services/order.service.js";
import { toJSONSafe } from "../utils/serialize.js";
import { cancelOrderSvc } from "../services/order.service.js";
import { getOrdersByUser } from "../services/order.service.js";
import { getPurchaseAnalyticsSvc } from "../services/order.service.js";

export async function createOrderCtrl(req, res) {
  try {
    const sessionUserId = req.user?.userId;
    if (!sessionUserId && !req.body.buyerUserId) {
      return res
        .status(401)
        .json({ code: 1, error: "Usuario no autenticado." });
    }

    const payload = {
      ...req.body,
      buyerUserId: sessionUserId
        ? BigInt(sessionUserId)
        : BigInt(req.body.buyerUserId),
    };

    const order = await createOrderSvc(payload);

    return res.status(201).json(toJSONSafe(order));
  } catch (err) {
    return res.status(400).json({ code: err.code, error: err.message });
  }
}

export async function cancelOrderCtrl(req, res) {
  try {
    const orderId = BigInt(req.params.orderId);
    const result = await cancelOrderSvc(orderId);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Error al cancelar la orden:", err);
    return res.status(400).json({ error: err.message });
  }
}

export const getOrdersByUserCtrl = async (req, res) => {
  try {
    const userId = BigInt(req.params.userId);
    const orders = await getOrdersByUser(userId);

    res.status(200).json(
      toJSONSafe({
        total: orders.length,
        items: orders,
      })
    );
  } catch (error) {
    console.error("Error en getOrdersByUser:", error);
    res.status(500).json({
      message: "Error al obtener las órdenes del usuario.",
      error: error.message,
    });
  }
};

export async function getPurchaseAnalyticsCtrl(req, res) {
  try {
    const organizerId = BigInt(req.params.organizerId);

    const data = await getPurchaseAnalyticsSvc(organizerId);

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error en getPurchaseAnalytics:", err);
    return res.status(400).json({ error: err.message });
  }
}

