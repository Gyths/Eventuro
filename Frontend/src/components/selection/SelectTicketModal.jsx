import React from "react";
import BaseModal from "../BaseModal";

import useEvent from "../../services/Event/EventContext";
import useOrder from "../../services/Order/OrderContext";
import { useAuth } from "../../services/auth/AuthContext";
import { EventuroApi } from "../../api";

import {
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/solid";
import { number } from "framer-motion";

export default function SelectAllocationModal({ selectedData, onReturn }) {
  const paymentPage = "/pago";

  const { event } = useEvent();
  const { user } = useAuth();
  const { setOrder } = useOrder();

  console.log(selectedData);

  const basePrice = parseInt(selectedData.zoneDates.basePrice);
  const kind = selectedData.zoneDates.kind;
  const currency = selectedData.zoneDates.currency;

  const [values, setValues] = React.useState(Array(100).fill(0));
  const [subtotal, setSubtotal] = React.useState(0);
  const currencies = { PEN: "S/." };

  const handleSubtraction = (i) => {
    const newValues = values.map((value, index) => {
      return (index === i) & (value > 0) ? value - 1 : value;
    });
    setValues(newValues);
  };

  const handleSum = (i) => {
    const newValues = values.map((value, index) => {
      return (index === i) &
        (value <
          parseInt(selectedData.eventZone.allocations[i].remainingQuantity))
        ? value + 1
        : value;
    });
    setValues(newValues);
  };

  const onContinue = async () => {
    console.log(values.every((value) => !value));
    const orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = [];
    values.forEach((value) => {
      value > 0 &&
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: selectedData.eventDateId,
          eventDateZoneId: selectedData.eventZone.eventDateZoneId,
          quantity: value,
        });
    });

    console.log(orderData);

    /* try {
      const response = await EventuroApi({
        endpoint: orderEnpoint,
        method: apiMethod,
        data: orderData,
      });
      setOrder(response);
    } catch (err) {
      console.error("Error al consultar disponbilidad:", err);
      throw err;
    } */

    //navigate(paymentPage);
  };

  React.useEffect(() => {
    if (selectedData) {
      let newSubtotal = 0;

      setSubtotal(newSubtotal);
    }
  }, [values]);

  return (
    <BaseModal>
      <div className="flex flex-col items-stretch w-full max-w-4xl bg-white shadow-2xs rounded-md">
        <div className="flex flex-row items-stretch">
          <div className="flex flex-[4] flex-col">
            {/* Header del modal */}
            <div className="flex flex-row justify-start gap-4 items-center py-4 px-4 border-b border-b-gray-300">
              <ChevronLeftIcon
                onClick={onReturn}
                className="fill-purple-700 shadow-2xl size-8 cursor-pointer hover:scale-105"
              ></ChevronLeftIcon>
              <span className="inline-block font-semibold text-3xl">
                Selecciona tus entradas
              </span>
            </div>
            {/* Sección donde se muestran las entradas */}
            <div className="flex flex-col w-full py-7 px-7">
              <span className="inline-block border-b border-gray-200">
                {selectedData?.eventZone?.name}
              </span>
              {selectedData && kind === "GENERAL" ? (
                <div
                  key={allocation.eventDateZoneAllocationId}
                  className="flex flex-row justify-between gap-4 py-2 px-3"
                >
                  <span>{allocation.audienceName}</span>

                  <span>
                    {currencies[currency] +
                      " " +
                      basePrice *
                        (1 - parseInt(allocation.discountPercent) / 100)}
                  </span>

                  {kind && kind === "SEATED" ? (
                    "Con asientos"
                  ) : (
                    <div className="flex flex-row gap-3 items-center">
                      <MinusIcon
                        onClick={() => handleSubtraction(index)}
                        className="relative select-none size-3.5 bg-gray-100 rounded-lg cursor-pointer"
                      ></MinusIcon>
                      <span className="relative font-semibold">
                        {values[index]}
                      </span>
                      <PlusIcon
                        onClick={() => handleSum(index)}
                        className="relative select-none size-3.5 bg-gray-100 rounded-lg cursor-pointer"
                      ></PlusIcon>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Sección de información del evento */}
          <div className="flex-[2] border-l border-l-gray-100"></div>
        </div>
        <div className="flex flex-row justify-between gap-4 px-5 py-1.5 border-t border-gray-100 items-center">
          <div className="flex flex-row gap-4">
            <span className="inline-block font-semibold">Subtotal: </span>
            <span className="inline-block font-semibold">
              {currencies[currency] + subtotal}
            </span>
          </div>
          <button
            onClick={onContinue}
            className="inline-block bg-purple-600 rounded-lg text-white px-2.5 py-1 cursor-pointer"
          >
            Continuar
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
