import React, { useEffect } from "react";
import { EventuroApi } from "../../api";
import { useAuth } from "../../services/auth/AuthContext";
import { XCircleIcon } from "@heroicons/react/24/outline";
import useEvent from "../../services/Event/EventContext";
import useOrder from "../../services/Order/OrderContext";
import AlertMessage from "../AlertMessage";
import { DISCOUNT_CODE_TEXTS } from "./texts";
import { motion, AnimatePresence } from "framer-motion";

export default function DiscountCode() {
  const endpoint = "/discount/validate";
  const method = "POST";

  const { user } = useAuth();
  const { event, setEvent } = useEvent();
  const { order, setOrder } = useOrder();

  const [errorCode, setErrorCode] = React.useState(0);
  const [discountCode, setDiscountCode] = React.useState("");
  const [appliedCodes, setAppliedCodes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showDiscountCodeAlert, setShowDiscountCodeAlert] =
    React.useState(false);

  const handleChange = (event) => {
    setDiscountCode(event.target.value.trim());
  };

  const currencies = { PEN: "S/." };

  // Remover un descuento existente
  const handleRemove = (discountId) => {
    setAppliedCodes((prev) =>
      prev.filter((code) => code.discountId !== discountId)
    );

    // Limpia los descuentos aplicados antes del siguiente useEffect
    setEvent((prev) => {
      const newCart = structuredClone(prev.shoppingCart.itemsByZone);

      Object.values(newCart).forEach((zone) => {
        delete zone.discountsApplied;
        delete zone.discountedTotalZonePrice;
      });

      return {
        ...prev,
        shoppingCart: {
          ...prev.shoppingCart,
          itemsByZone: newCart,
        },
      };
    });
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
    console.log(event.shoppingCart);
    setShowDiscountCodeAlert(false);
    const data = {
      code: discountCode,
      eventId: event.eventId,
      userId: user.userId,
      appliedCodes: appliedCodes.map((code) => {
        return code.code;
      }),
      items: Object.entries(event.shoppingCart.itemsByZone).map(
        ([zone, zoneInf]) => {
          const quantity = parseInt(zoneInf.totalQuantity);
          return { zone, quantity };
        }
      ),
    };

    try {
      setIsLoading(true);
      console.log(data);
      const response = await EventuroApi({ endpoint, method, data });

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

      await new Promise((res) => setTimeout(res, 300));
      setAppliedCodes((prev) => [...prev, newCode]);
    } catch (err) {
      await new Promise((res) => setTimeout(res, 300));

      setShowDiscountCodeAlert(true);
      setErrorCode(err.code);
      throw err;
    } finally {
      setIsLoading(false);
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
        totalAmount: prev?.subtotal,
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

    const baseCart = structuredClone(event.shoppingCart.itemsByZone);
    let newItemsByZone = structuredClone(baseCart);

    // Si no hay descuentos -> restaurar totales
    if (appliedCodes.length === 0) {
      const restoredTotal = Object.values(baseCart).reduce((sum, zone) => {
        return sum + (zone.totalZonePrice || 0);
      }, 0);

      setEvent((prev) => ({
        ...prev,
        shoppingCart: {
          ...prev.shoppingCart,
          itemsByZone: baseCart,
        },
      }));

      setOrder((prev) => ({
        ...prev,
        totalAmount: order.subtotal,
      }));

      return;
    }

    // Aplicar descuentos
    Object.entries(newItemsByZone).forEach(([zoneName, zoneCart]) => {
      const basePrice = zoneCart.totalZonePrice || 0;

      let totalDiscount = 0;
      let discountsApplied = [];

      appliedCodes.forEach((code) => {
        const eligible = code.eligibleZones.find((z) => z.zone === zoneName);
        if (!eligible) return;

        const discountAmount = basePrice * (code.value / 100);
        totalDiscount += discountAmount;

        discountsApplied.push({
          discountId: code.discountId,
          code: code.code,
          percentage: code.value,
          discountAmount,
        });
      });

      zoneCart.discountedTotalZonePrice = basePrice - totalDiscount;
      zoneCart.discountsApplied = discountsApplied;
    });

    const finalTotal = Object.values(newItemsByZone).reduce((sum, zone) => {
      return sum + (zone.discountedTotalZonePrice ?? zone.totalZonePrice ?? 0);
    }, 0);

    setEvent((prev) => ({
      ...prev,
      shoppingCart: {
        ...prev.shoppingCart,
        itemsByZone: newItemsByZone,
      },
    }));

    setOrder((prev) => ({
      ...prev,
      totalAmount: finalTotal,
    }));
  }, [appliedCodes, order?.subtotal]);

  return (
    <div className="flex flex-col pb-[10vh] gap-4">
      <div className="flex flex-col">
        <div className=" max-w-lg mt-6 pb-2">
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
              className="bg-yellow-400 text-white px-4 rounded-lg cursor-pointer hover:scale-103 hover:bg-yellow-500/90 transition-all duration-200 active:scale-102"
            >
              {isLoading ? (
                <div className="size-3 mx-5.5 my-1.5 justify-center items-center text-center border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              ) : (
                "Agregar"
              )}
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
      <AnimatePresence mode="sync">
        {appliedCodes.length > 0 &&
          appliedCodes.map((code) => (
            <motion.div
              key={code.discountId}
              initial={{ opacity: 0, rotateX: -90, y: -50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: 90, y: 50 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              layout
              className="flex max-w-lg flex-row w-auto rounded-2xl border justify-between border-gray-300 bg-white shadow-md"
            >
              <div className="flex flex-col p-4">
                <span className="text-3xl font-bold text-start">
                  {code.code}
                </span>
                {code.eligibleZones.map((item, idx) => (
                  <span key={idx}>
                    {item.zone} x{item.quantity}
                  </span>
                ))}
              </div>
              <div className="flex flex-row">
                <div className="flex border-l border-gray-300">
                  <div className="flex pl-4 pr-1 text-5xl font-bold text-center items-center justify-center">
                    {code.value + "%"}
                  </div>
                </div>
                <div
                  onClick={() => handleRemove(code.discountId)}
                  className="flex items-center px-2 cursor-pointer hover:bg-gray-100 transition-all duration-300 rounded-r-2xl"
                >
                  <XCircleIcon className="size-5 text-red-500 hover:scale-110 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
