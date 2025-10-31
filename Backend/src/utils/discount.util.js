export function pickBestScopeMatch(discounts, eventId, userId) {
  const byEvent = discounts.find(
    (d) => d.scope === "EVENT" && d.eventId && d.eventId === eventId
  );
  if (byEvent) return byEvent;

  const byEventUser = discounts.find(
    (d) =>
      d.scope === "EVENT_USER" &&
      d.eventId &&
      d.userId &&
      d.eventId === eventId &&
      d.userId === userId
  );
  if (byEventUser) return byEventUser;

  const byUser = discounts.find(
    (d) => d.scope === "USER" && d.userId && d.userId === userId
  );
  if (byUser) return byUser;

  const global = discounts.find((d) => d.scope === "GLOBAL");
  if (global) return global;

  return null;
}

export function evaluateStacking(current, existingDiscounts) {
  const hasUnstackableInExisting = existingDiscounts.some(
    (d) => d.stackable === false
  );

  if (hasUnstackableInExisting) {
    return "Another non-stackable discount is already applied";
  }

  if (current.stackable === false && existingDiscounts.length > 0) {
    return "This discount cannot be combined with other discounts";
  }

  return null;
}

function normalize(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

//Spec es la zona o ámbito al que aplica el descuento
//item es la zona a comparar
export function isItemEligibleByAppliesTo(spec, item) {
  console.log(item);
  const zone = normalize(item?.zone);
  if (!zone) return false;

  if (typeof spec === "string") {
    const at = normalize(spec);
    if (!at) return false;
    if (at === "ALL") return true;
    return zone === at || zone.startsWith(at + " ");
  }

  return false;
}
