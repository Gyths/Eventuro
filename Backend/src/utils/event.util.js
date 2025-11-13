export function setFinalPrices(zones, activeSalePhasePercentage = 0) {
  for (const zone of zones) {
    if (!zone.allocations) continue;

    if (!zone.allocations) {
      zone.zonePrice = zone.basePrice * (1 - activeSalePhasePercentage / 100);
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
        Number(allocation.price) * (1 + activeSalePhasePercentage / 100);
    }
  }
  return zones;
}

export function formatDates(dates) {
  const formattedDates = dates.map((date) => ({
    ...date,
    startDate: new Date(date.startAt).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    startHour: new Date(date.startAt).toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    endDate: new Date(date.endAt).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    endHour: new Date(date.endAt).toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));
  return formattedDates;
}
