import React, { useEffect } from "react";
import { EventuroApi } from "../../api";
import { useAuth } from "../../services/auth/AuthContext";
import { XCircleIcon } from "@heroicons/react/24/outline";
import useEvent from "../../services/Event/EventContext";
import useOrder from "../../services/Order/OrderContext";
import AlertMessage from "../AlertMessage";
import { DISCOUNT_CODE_TEXTS } from "./texts";

export default function DiscountCode() {
  const endpoint = "/discount/validate";
  const method = "POST";

  const { user } = useAuth();
  const { event, setEvent } = useEvent();
  const { order, setOrder } = useOrder();

  const [errorCode, setErrorCode] = React.useState(0);
  const [discountCode, setDiscountCode] = React.useState("");
  const [appliedCodes, setAppliedCodes] = React.useState([]);
  const [showDiscountCodeAlert, setShowDiscountCodeAlert] =
    React.useState(false);

  const handleChange = (event) => {
    setDiscountCode(event.target.value.trim());
  };

  const currencies = { PEN: "S/." };

  // Remover un descuento existente
  const handleRemove = (discountId) => {
    setAppliedCodes(
      appliedCodes.filter((code) => code.discountId !== discountId)
    );
  };

  // Aplicar un nuevo descuento validado desde el backend
  const handleDiscount = async () => {
    if (discountCode === "") {
      setErrorCode(1);
      setShowDiscountCodeAlert(true);
      return;
    }

    const alreadyApplied = appliedCodes.some(
      (applied) => applied.code.toUpperCase() === discountCode.toUpperCase()
    );

    if (alreadyApplied) {
      setErrorCode(9);
      setShowDiscountCodeAlert(true);
      return;
    }

    setShowDiscountCodeAlert(false);

    const data = {
      code: discountCode,
      eventId: event.eventId,
      userId: user.userId,
      appliedCodes: appliedCodes.map((code) => {
        return code.code;
      }),
      items: Object.entries(event.shoppingCart).map(([zone, zoneInf]) => {
        let quantity = 0;
        if (zoneInf.price && zoneInf.quantity)
          quantity = parseInt(zoneInf.quantity);
        else {
          Object.entries(zoneInf).map(([_, allocationInf]) => {
            quantity += parseInt(allocationInf.quantity || 0);
          });
        }
        return { zone, quantity };
      }),
    };

    try {
      const response = await EventuroApi({ endpoint, method, data });

      if (!response.success) {
        setErrorCode(0);
        setShowDiscountCodeAlert(true);
        return;
      }

      const newCode = {
        discountId: response.discount.discountId,
        code: response.discount.code,
        value: parseFloat(response.discount.percentage),
        eligibleZones: response.eligibleDetail
          .filter((item) => item.eligible)
          .map((item) => ({
            zone: item.zone,
            quantity: item.quantity,
          })),
      };

      setAppliedCodes((prev) => [...prev, newCode]);
    } catch (err) {
      try {
        const error = JSON.parse(err.message.split(": ")[1]);
        setShowDiscountCodeAlert(true);
        setErrorCode(error.errorCode);
      } catch {
        console.warn("No se pudo parsear el JSON del error:", err.message);
      }
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
    <>
      <div className="flex flex-col">
        <div className="w-full max-w-lg mt-6 pb-2">
          <p className="font-medium mb-2">{DISCOUNT_CODE_TEXTS.title}</p>
          <div className="flex gap-2">
            <input
              id="discount-code-input"
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
            {DISCOUNT_CODE_TEXTS.alerts[errorCode]}
          </AlertMessage>
        )}
      </div>
      {/* Mostrar códigos aplicados */}
      {appliedCodes.length > 0 && (
        <div className="flex w-auto">
          <div className="flex flex-col gap-2">
            {appliedCodes.map((code) => (
              <div
                key={code.discountId}
                className="flex flex-row w-auto rounded-2xl border justify-between border-gray-300 bg-white shadow-2xs"
              >
                <div className="flex flex-col p-4">
                  <span className="text-3xl font-bold text-center">
                    {code.code}
                  </span>
                  {code.eligibleZones.map((item, idx) => (
                    <span key={idx}>
                      {item.zone} x{item.quantity}
                    </span>
                  ))}
                </div>
                <div className="flex border-l border-gray-300">
                  <div className="flex px-4 text-5xl font-bold text-center items-center justify-center">
                    {code.value + "%"}
                  </div>
                </div>
                <div
                  onClick={() => handleRemove(code.discountId)}
                  className="flex items-center px-2 cursor-pointer hover:bg-gray-100 transition-all duration-300 rounded-r-2xl"
                >
                  <XCircleIcon className="size-5 text-red-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
