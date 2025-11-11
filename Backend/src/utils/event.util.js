export function setDiscountedPrices(zones, activeSalePhaseDiscount = 0) {
  for (const zone of zones) {
    if (!zone.allocations) {
      zone.zonePrice = zone.basePrice * (1 - activeSalePhaseDiscount / 100);
      continue;
    }
    for (const allocation of zone.allocations) {
      if (allocation.discountType === "PERCENTAGE")
        allocation.price =
          Number(zone.basePrice) * (1 - Number(allocation.discountValue) / 100);
      if (allocation.discountType === "CASH")
        allocation.price =
          Number(zone.basePrice) - Number(allocation.discountValue);

      allocation.price =
        Number(allocation.price) * (1 - activeSalePhaseDiscount / 100);
    }
  }
  return zones;
}
