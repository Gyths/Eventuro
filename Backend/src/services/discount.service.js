import { listDiscountByCode } from "../repositories/discount.repo.js";
import { listDiscountsByCodes } from "../repositories/discount.repo.js";
import { pickBestScopeMatch } from "../utils/discount.util.js";
import { evaluateStacking } from "../utils/discount.util.js";
import { isItemEligibleByAppliesTo } from "../utils/discount.util.js";
import { toDate } from "../utils/serialize.js";

export async function validateDiscountSvc(input) {

    const code = String(input?.code ?? "").trim();
    const eventId = input?.eventId;
    const userId = input?.userId;
    const items = Array.isArray(input?.items) ? input.items : [];
    const appliedCodes = Array.isArray(input?.appliedCodes) ? input.appliedCodes : [];

    if (!code) {
        return { valid: false, reason: "Missing code" };
    }

    const discounts = await listDiscountByCode(code);

    if (!Array.isArray(discounts) || discounts.length === 0) {
        return { valid: false, reason: "Code not found" };
    }

    const discount = pickBestScopeMatch(discounts, eventId, userId);
    if (!discount) {
        return { valid: false, reason: "The code does not apply to this context (user/event)" };
    }

    if (discount.status !== "A") {
        return { valid: false, reason: "Inactive discount" };
    }

    const now = new Date();
    const startAt = toDate(discount.startAt);
    const endAt = toDate(discount.endAt);

    if ((startAt && now < startAt) || (endAt && now > endAt)) {
        return { valid: false, reason: "Outside the valid time window" };
    }

    const availableQty = discount.availableQty;
    if (availableQty !== null && availableQty !== undefined) {
        const qtyNum = Number(availableQty);
        if (!Number.isFinite(qtyNum) || qtyNum <= 0) {
            return { valid: false, reason: "Discount sold out" };
        }
    }

    if (appliedCodes.length > 0) {
        const existing = await listDiscountsByCodes(appliedCodes); // => [{ code, stackable, ... }]
        const cannotStackReason = evaluateStacking(discount, Array.isArray(existing) ? existing : []);
        if (cannotStackReason) {
            return { valid: false, reason: cannotStackReason };
        }
    }

    const eligibleDetail = items.map((it) => {
        const ok = isItemEligibleByAppliesTo(discount.appliesTo, it);
        return ok
            ? { ...it, eligible: true }
            : { ...it, eligible: false, why: "Zone not eligible" };
    });

    const eligibleQty = eligibleDetail
        .filter((d) => d.eligible)
        .reduce((a, d) => a + Number(d.quantity || 0), 0);

    if (eligibleQty === 0) {
        return { valid: false, reason: "No items are eligible for this discount", eligibleDetail };
    }

    return {
        valid: true,
        reason: null,
        discount,
        eligibleDetail,
        eligibleQty,
    };
}
