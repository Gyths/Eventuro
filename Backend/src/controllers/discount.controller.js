// src/controllers/discount.controller.js
import { validateDiscountSvc } from "../services/discount.service.js";
import { listDiscountByOrganizerIdSvc } from "../services/discount.service.js";
import { toJSONSafe } from "../utils/serialize.js";

export async function validateDiscount(req, res) {
  try {
    const input = req.body;

    const result = await validateDiscountSvc(input);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        errorCode: result.code,
        message: result.reason,
        ...(result.eligibleDetail ? { eligibleDetail: result.eligibleDetail } : {}),
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount is valid",
      discount: result.discount,
      eligibleDetail: result.eligibleDetail,
      eligibleQty: result.eligibleQty,
    });

  } catch (error) {
    console.error("Error in validateDiscountCtrl:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function listDiscountByOrganizerId(req, res) {
  try {
    const organizerId = req.auth?.user?.organizer?.organizerId;
    if (!organizerId) {
      return res.status(400).json({ message: "El usuario no tiene organizador asociado" });
    }

    const rawEventId = req.params?.eventId;
    const eventId = rawEventId ? BigInt(rawEventId) : null;

    const discounts = await listDiscountByOrganizerIdSvc({ organizerId, eventId });

    return res.status(200).json(toJSONSafe(discounts));
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
}