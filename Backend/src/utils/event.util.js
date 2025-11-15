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
        allocation.price = allocation.discountValue;

      allocation.price =
        Number(allocation.price) * (1 + activeSalePhasePercentage / 100);
    }
  }
  return zones;
}

export function formatDate(date, monthFormat = "long") {
  const formattedDate = new Date(date).toLocaleDateString("es-PE", {
    day: "2-digit",
    month: monthFormat,
    year: "numeric",
  });
  return formattedDate;
}

export function formatHour(date) {
  const formattedHour = new Date(date).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return formattedHour;
}

export function formatDates(dates) {
  const formattedDates = dates.map((date) => ({
    ...date,
    startDate: formatDate(date.startAt),
    startHour: formatHour(date.startAt),
    endDate: formatDate(date.endAt),
    endHour: formatHour(date.endAt),
  }));

  return formattedDates;
}
