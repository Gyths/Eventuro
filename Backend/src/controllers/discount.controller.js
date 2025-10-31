// src/controllers/discount.controller.js
import { validateDiscountSvc } from "../services/discount.service.js";

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
