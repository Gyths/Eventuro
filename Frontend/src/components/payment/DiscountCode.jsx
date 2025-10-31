import React from "react";
import { EventuroApi } from "../../api";
import AlertMessage from "../AlertMessage";
import { DISCOUNT_CODE_TEXTS } from "./texts";

export default function DiscountCode({ userId, eventId, order, setOrder }) {
  const endpoint = "/discount/validate";
  const method = "POST";

  const [discountCode, setDiscountCode] = React.useState("");
  const [appliedCodes, setAppliedCodes] = React.useState([]);
  const [showDiscountCodeAlert, setShowDiscountCodeAlert] =
    React.useState(false);
  const handleChange = (event) => {
    setDiscountCode(event.target.value);
  };
  const [errorCode, setErrorCode] = React.useState();

  const handleDiscount = () => {
    if (discountCode === "") {
      setShowDiscountCodeAlert(true);
      return;
    } else {
      setShowDiscountCodeAlert(false);
    }

    const data = {
      code: discountCode,
      eventId: eventId,
      userId: userId,
      appliedCodes: [],
      items: [{}],
    };

    try {
      console.log(discountCode);
      const response = EventuroApi({
        endpoint: endpoint,
        method: method,
        data: data,
      });
      if (response.success != "true") {
        setErrorCode(response.code);
        setShowDiscountCodeAlert(false);
        return;
      }

      let order_placeholder = order;

      setAppliedCodes(...appliedCodes, response.discount.code);
      if (response.discount.type === "PERCENTAGE") {
        order_placeholder.total =
          parseInt(order_placeholder.total) *
          (1 - parseInt(response.discount.value));
        setOrder(order_placeholder);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handlePageLoad = () => {
      // Limpiar códigos aplicados
      setAppliedCodes([]);
      setDiscountCode("");
      setErrorCode(0);
      setShowDiscountCodeAlert(false);

      // Restaurar total original cuando haya subtotal disponible
      setOrder((prev) => ({
        ...prev,
        totalAmount: prev?.subtotal || 0,
      }));
    };

    // Caso 1: se ejecuta al montar si el subtotal ya está disponible
    if (order?.subtotal) handlePageLoad();

    // Caso 2: se ejecuta al recargar o cerrar el navegador
    window.addEventListener("beforeunload", handlePageLoad);
    return () => {
      window.removeEventListener("beforeunload", handlePageLoad);
    };
  }, [order?.subtotal]);

  useEffect(() => {
    if (!order?.subtotal || !event?.shoppingCart) return;

    const updatedCart = structuredClone(event.shoppingCart);

    // Siempre limpiar descuentos anteriores del carrito
    Object.keys(updatedCart).forEach((zoneName) => {
      const zoneCart = updatedCart[zoneName];
      if (!zoneCart) return;

      delete zoneCart.discountsApplied;
      delete zoneCart.discount;
      delete zoneCart.discountedQty;

      // Si tiene allocations
      if (!zoneCart.price && typeof zoneCart === "object") {
        Object.values(zoneCart).forEach((alloc) => {
          if (alloc && typeof alloc === "object") {
            delete alloc.discount;
            delete alloc.priceAfterDiscount;
          }
        });
      }

      // Restaurar precio total original
      if (zoneCart.price && zoneCart.quantity) {
        zoneCart.totalZonePrice = zoneCart.price;
      } else if (typeof zoneCart === "object") {
        let total = 0;
        Object.values(zoneCart).forEach((alloc) => {
          if (alloc && typeof alloc.price === "number") total += alloc.price;
        });
        zoneCart.totalZonePrice = total;
      }
    });

    // 🧮 2️⃣ Si no hay descuentos activos → limpiar y restablecer totales
    if (appliedCodes.length === 0) {
      const restoredTotal = Object.values(updatedCart).reduce((sum, zone) => {
        if (typeof zone.totalZonePrice === "number")
          return sum + zone.totalZonePrice;
        return sum;
      }, 0);

      setEvent((prev) => ({ ...prev, shoppingCart: updatedCart }));
      setOrder((prev) => ({ ...prev, totalAmount: restoredTotal }));
      return; // 👈 termina aquí, no aplica descuentos
    }

    // Si hay descuentos activos → reaplicar descuentos
    appliedCodes.forEach((code) => {
      const percentage = code.value / 100;
      code.eligibleZones.forEach(({ zone, quantity: eligibleQty }) => {
        const zoneCart = updatedCart[zone];
        if (!zoneCart) return;

        let totalDiscountAmount = 0;
        let totalDiscountedQty = 0;

        // Caso 1: sin allocations
        if (zoneCart.price && zoneCart.quantity) {
          const discountedQty = Math.min(zoneCart.quantity, eligibleQty);
          const basePricePerTicket = zoneCart.price / zoneCart.quantity;
          const discountAmount =
            discountedQty * basePricePerTicket * percentage;

          totalDiscountAmount += discountAmount;
          totalDiscountedQty += discountedQty;

          zoneCart.totalZonePrice = zoneCart.price - totalDiscountAmount;
          zoneCart.discountsApplied = [
            {
              discountId: discountId,
              code: code.code,
              percentage: code.value,
              discountedQty,
              discountAmount,
            },
          ];
        }
        // Caso 2: con allocations
        else {
          let remainingEligible = eligibleQty;
          let totalPrice = 0;
          let discountsApplied = [];

          Object.entries(zoneCart).forEach(([key, alloc]) => {
            if (typeof alloc !== "object" || !alloc.quantity) return;
            const basePricePerTicket = alloc.price / alloc.quantity;

            const discountedQty = Math.min(alloc.quantity, remainingEligible);
            remainingEligible -= discountedQty;

            const discountAmount =
              discountedQty * basePricePerTicket * percentage;
            totalDiscountAmount += discountAmount;
            totalDiscountedQty += discountedQty;

            alloc.discount = discountAmount;
            alloc.priceAfterDiscount = alloc.price - discountAmount;
            totalPrice += alloc.priceAfterDiscount;

            if (discountedQty > 0) {
              discountsApplied.push({
                discountId: code.discountId,
                code: code.code,
                percentage: code.value,
                discountedQty,
                discountAmount,
                allocation: key,
              });
            }
          });

          zoneCart.totalZonePrice = totalPrice;
          zoneCart.discountsApplied = discountsApplied;
        }
      });
    });

    // Recalcular total general final
    const newTotal = Object.values(updatedCart).reduce((sum, zone) => {
      if (typeof zone.totalZonePrice === "number")
        return sum + zone.totalZonePrice;
      return sum;
    }, 0);

    setEvent((prev) => ({ ...prev, shoppingCart: updatedCart }));
    setOrder((prev) => ({ ...prev, totalAmount: newTotal }));
  }, [appliedCodes, order?.subtotal]);

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-lg mt-6 pb-2">
        <p className="font-medium mb-2">{DISCOUNT_CODE_TEXTS.title}</p>
        <div className="flex gap-2">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Código de descuento aquí"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={handleDiscount}
            className="bg-yellow-400 text-white px-4 rounded hover:bg-yellow-500 transition-transform duration-200 active:scale-102"
          >
            Agregar
          </button>
        </div>
      </div>
      {showDiscountCodeAlert && (
        <AlertMessage id="discount-code-alert">
          {DISCOUNT_CODE_TEXTS.alerts[0]}
        </AlertMessage>
      )}
    </div>
  );
}
