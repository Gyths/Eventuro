import React from "react";
import BaseModal from "../BaseModal";
import { useNavigate } from "react-router-dom";
import {
  TICKET_SELECTION_TEXTS,
  EVENT_INFORMATION_TEXTS,
  ERROR_MODAL_TEXTS,
} from "../payment/texts";
import ArrowButton from "../../components/ArrowButton";
import Swal from "sweetalert2";

import useEvent from "../../services/Event/EventContext";
import useOrder from "../../services/Order/OrderContext";
import { useAuth } from "../../services/auth/AuthContext";
import { EventuroApi } from "../../api";

import SeatNumberSelectionModal from "./SeatNumberSelectionModal";
import AlertMessage from "../AlertMessage";

import { AnimatePresence } from "framer-motion";
import {
  PlusIcon,
  MinusIcon,
  ClockIcon,
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export default function SelectAllocationModal({
  eventDateId,
  modal,
  setModal,
  onClose,
  onReturn,
}) {
  const paymentPage = "/pago";
  const orderEndpoint = "/orders";
  const apiMethod = "POST";

  const navigate = useNavigate();

  const { event, setEvent } = useEvent();
  const { user } = useAuth();
  const { order, setOrder } = useOrder();

  const [showAlertMessage, setShowAlertMessage] = React.useState(false);
  const [zonesInfo, setZonesInfo] = React.useState([]);
  const [isModalLoading, setIsModalLoading] = React.useState(true);
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

  // States para el manejo de las cantidad de entradas seleccionadas
  const [notAllocatedGeneralQuantities, setNotAllocatedGeneralQuantities] =
    React.useState([]);

  // CAMBIO: evitar fill([]) que comparte la misma referencia
  const [notAllocatedSeatedQuantities, setNotAllocatedSeatedQuantities] =
    React.useState([]);

  const [allocatedGeneralQuantities, setAllocatedGeneralQuantities] =
    React.useState([]);

  // CAMBIO: evitar fill({}) que comparte la misma referencia
  const [allocatedSeatedQuantities, setAllocatedSeatedQuantities] =
    React.useState([]);

  function verifyQuantityError(zonesResponse) {
    if (zonesResponse[0]?.capacityRemaining === 0) return 1;
    if (zonesResponse[0]?.remainingSalePhaseQuantity === 0) return 2;
    if (
      parseInt(event?.ticketLimitPerUser) -
        parseInt(zonesResponse[0].user.ticketCount) ===
      0
    )
      return 3;
    return 0;
  }

  React.useEffect(() => {
    async function getZones() {
      try {
        const response = await EventuroApi({
          endpoint: `/event/${user.userId}/${event.eventId}/${eventDateId}/zones`,
          method: "GET",
        });
        setZonesInfo(response);

        const ticketsErrorCode = verifyQuantityError(response);
        if (ticketsErrorCode !== 0) {
          onClose();
          Swal.fire({
            icon: "error",
            title: ERROR_MODAL_TEXTS.title,
            text: ERROR_MODAL_TEXTS.text[ticketsErrorCode],
          });
        }

        setNotAllocatedGeneralQuantities(
          Array(response[0]?.zoneDates.length).fill(0)
        );

        setNotAllocatedSeatedQuantities(() =>
          response[0]?.zoneDates.map(() => [])
        );

        setAllocatedGeneralQuantities(
          response[0]?.zoneDates.map((zone) => {
            return zone.allocations.length > 0
              ? Array(zone.allocations.length).fill(0)
              : "";
          })
        );

        setAllocatedSeatedQuantities(() =>
          response[0]?.zoneDates.map(() => ({}))
        );

        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (err) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        Swal.fire({
          icon: "error",
          title: "¡Lo sentimos!",
          text: "Ocurrió un error inesperado",
        });
      } finally {
        setIsModalLoading(false);
      }
    }
    getZones();
  }, []);

  const [errorCode, setErrorCode] = React.useState("");
  const [subtotal, setSubtotal] = React.useState(0);
  const [seatMap, setSeatMap] = React.useState(null);
  const [zoneIndex, setZoneIndex] = React.useState(null);
  const [allocationIndex, setAllocationIndex] = React.useState(null);

  function getCap() {
    let cap = 0;
    if (event && zonesInfo)
      cap = Math.min(
        parseInt(event?.ticketLimitPerUser) -
          parseInt(zonesInfo[0].user.ticketCount),
        zonesInfo[0]?.remainingSalePhaseQuantity
      );
    console.log(zonesInfo[0]);
    console.log(event?.ticketLimitPerUser);
    console.log(zonesInfo[0].user.ticketCount);

    return cap;
  }

  const currencies = { PEN: "S/." };

  // Manejo de suma y resta de entradas sin allocation
  const handleNoAllocationGeneralSubtraction = (zoneIndex) => {
    // CAMBIO: usar && en vez de &
    const newValues = notAllocatedGeneralQuantities.map((value, index) =>
      index === zoneIndex && value > 0 ? value - 1 : value
    );
    setNotAllocatedGeneralQuantities(newValues);
  };

  const handleNoAllocationGeneralSum = (zoneIndex) => {
    // CAMBIO: usar && y Number para límites
    const cap = Math.min(
      parseInt(event?.ticketLimitPerUser) -
        parseInt(zonesInfo[0].user.ticketCount),
      zonesInfo[0]?.remainingSalePhaseQuantity,
      parseInt(zone.capacityRemaining)
    );

    const newValues = notAllocatedGeneralQuantities.map((value, index) =>
      index === zoneIndex && value < cap ? value + 1 : value
    );
    setNotAllocatedGeneralQuantities(newValues);
    setShowAlertMessage(false);
  };

  // Manejo de entradas con sitio pero sin allocation
  const handleNotAllocatedSeated = (zoneIndex) => {
    setSeatMap(zonesInfo[0]?.zoneDates[zoneIndex].seatMap);
    setZoneIndex(zoneIndex);
    setAllocationIndex(null);
    setModal("seats");
  };

  // Manejo de suma y resta de entradas con allocation
  const handleAllocatedGeneralSubtraction = (zoneI, allocationI) => {
    const newValues = allocatedGeneralQuantities.map(
      (allocation, zoneIndex) => {
        return zoneI === zoneIndex
          ? allocation.map((quantity, allocationIndex) => {
              return allocationI === allocationIndex && quantity > 0
                ? quantity - 1
                : quantity;
            })
          : allocation;
      }
    );
    setAllocatedGeneralQuantities(newValues);
  };

  const handleAllocatedGeneralSum = (zoneI, allocationI) => {
    const rem = Number(
      zonesInfo[0]?.zoneDates[zoneI].allocations[allocationI]
        .remainingQuantity || 0
    );
    const newValues = allocatedGeneralQuantities.map(
      (allocation, zoneIndex) => {
        if (zoneI !== zoneIndex) return allocation;
        const zone = zonesInfo[0]?.zoneDates[zoneIndex];
        const totalSelectedInZone = allocation.reduce(
          (sum, q) => sum + parseInt(q || 0),
          0
        );

        const cap = Math.min(
          parseInt(event?.ticketLimitPerUser) -
            parseInt(zonesInfo[0].user.ticketCount),
          zonesInfo[0]?.remainingSalePhaseQuantity,
          parseInt(zone.capacityRemaining)
        );

        if (totalSelectedInZone >= cap) {
          setShowAlertMessage(false);
          return allocation;
        }
        return allocation.map((quantity, allocationIndex) => {
          return allocationIndex === allocationI ? quantity + 1 : quantity;
        });
      }
    );
    setAllocatedGeneralQuantities(newValues);
  };

  // Manejo de entradas con sitio y con allocation
  const handleAllocatedSeated = (zoneIndex, allocationIndex) => {
    setSeatMap(zonesInfo[0]?.zoneDates[zoneIndex].seatMap);
    setZoneIndex(zoneIndex);
    setAllocationIndex(allocationIndex);
    setModal("seats");
  };

  // Calculo del subtotal resultado de entradas sin allocation ni sitios
  React.useEffect(() => {
    if (zonesInfo[0] && notAllocatedGeneralQuantities.length > 0) {
      let newSubtotal = 0;
      for (let i = 0; i < zonesInfo[0]?.zoneDates.length; i++) {
        // CAMBIO: Number/parseFloat para decimales
        newSubtotal +=
          Number(notAllocatedGeneralQuantities[i]) *
          parseFloat(zonesInfo[0]?.zoneDates[i].basePrice || 0);
      }
      setSubtotal(newSubtotal);
    }
  }, [notAllocatedGeneralQuantities, zonesInfo[0]]);

  // Calculo del subtotal resultado de entradas sin allocation pero con sitios
  React.useEffect(() => {
    if (zonesInfo[0] && notAllocatedSeatedQuantities.length > 0) {
      let newSubtotal = 0;
      for (let i = 0; i < zonesInfo[0]?.zoneDates.length; i++) {
        newSubtotal +=
          Number(notAllocatedSeatedQuantities[i].length) *
          parseFloat(zonesInfo[0]?.zoneDates[i].basePrice || 0);
      }
      setSubtotal(newSubtotal);
    }
  }, [notAllocatedSeatedQuantities, zonesInfo[0]]);

  // Calculo del subtotal resultado de entradas con allocation pero sin sitios
  React.useEffect(() => {
    if (zonesInfo[0] && allocatedGeneralQuantities.length > 0) {
      let newSubtotal = 0;

      zonesInfo[0]?.zoneDates.forEach((zone, zoneIndex) => {
        zone.allocations.forEach((allocation, allocationIndex) => {
          newSubtotal +=
            Number(allocatedGeneralQuantities[zoneIndex][allocationIndex]) *
            parseFloat(allocation.price);
        });
      });
      setSubtotal(newSubtotal);
    }
  }, [allocatedGeneralQuantities, zonesInfo[0]]);

  // Calculo del subtotal resultado de entradas con allocations y sitios
  React.useEffect(() => {
    if (zonesInfo[0] && allocatedSeatedQuantities.length > 0) {
      let newSubtotal = 0;
      zonesInfo[0]?.zoneDates.forEach((zone, zoneIndex) => {
        for (const seat in allocatedSeatedQuantities[zoneIndex]) {
          newSubtotal +=
            parseFloat(zone.basePrice || 0) *
            (1 -
              Number(
                zone.allocations[allocatedSeatedQuantities[zoneIndex][seat]]
                  .discountPercent || 0
              ) /
                100);
        }
      });
      setSubtotal(newSubtotal);
    }
  }, [allocatedSeatedQuantities, zonesInfo[0]]);

  // Función para manejar enviar la orden a la bd
  const onContinue = async () => {
    setShowAlertMessage(false);

    let shoppingCart = {};
    const orderData = {};
    orderData.buyerUserId = user.userId;
    orderData.currency = "PEN";
    orderData.items = [];

    //Se añaden las entradas sin allocation ni sitio
    notAllocatedGeneralQuantities.map((quantity, index) => {
      if (quantity > 0) {
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: eventDateId,
          eventDateZoneId: zonesInfo[0]?.zoneDates[index].eventDateZoneId,
          quantity: quantity,
        });
      }
    });

    //Se añaden las entradas sin allocation pero con sitio
    notAllocatedSeatedQuantities.map((seats, index) => {
      if (seats.length > 0) {
        seats.map((seat) => {
          orderData.items.push({
            eventId: event.eventId,
            eventDateId: eventDateId,
            eventDateZoneId: zonesInfo[0]?.zoneDates[index].eventDateZoneId,
            quantity: 1,
            seatId: seat,
          });
        });
      }
    });

    //Se añaden las entradas con allocation pero sin sitio
    allocatedGeneralQuantities.map((quantitiesZone, zoneIndex) => {
      if (quantitiesZone != "") {
        const zone = zonesInfo[0]?.zoneDates[zoneIndex];

        quantitiesZone.map((quantity, allocationIndex) => {
          if (quantity > 0) {
            orderData.items.push({
              eventId: event.eventId,
              eventDateId: eventDateId,
              eventDateZoneId: zone.eventDateZoneId,
              eventDateZoneAllocationId:
                zone.allocations[allocationIndex].eventDateZoneAllocationId,
              quantity: quantity,
            });
          }
        });
      }
    });

    //Se añaden las entradas con allocation y con sitio
    allocatedSeatedQuantities.map((seats, zoneIndex) => {
      const zone = zonesInfo[0]?.zoneDates[zoneIndex];

      for (const seatId in seats) {
        orderData.items.push({
          eventId: event.eventId,
          eventDateId: eventDateId,
          eventDateZoneId: zone.eventDateZoneId,
          eventDateZoneAllocationId:
            zone.allocations[seats[seatId]].eventDateZoneAllocationId,
          quantity: 1,
          seatId: seatId,
        });
      }
    });

    try {
      setIsButtonLoading(true);
      const response = await EventuroApi({
        endpoint: orderEndpoint,
        method: apiMethod,
        data: orderData,
      });
      setOrder({
        ...response,
      });

      let shoppingCart = {};

      response.items.forEach((item) => {
        const { zoneName, allocationName, quantity, unitPrice, finalPrice } =
          item;

        if (!shoppingCart[zoneName]) {
          shoppingCart[zoneName] = {
            totalQuantity: 0,
            totalZonePrice: 0,
          };
        }

        if (!shoppingCart[zoneName][allocationName]) {
          shoppingCart[zoneName][allocationName] = [];
        }

        shoppingCart[zoneName][allocationName].push({
          quantity,
          unitPrice,
        });

        shoppingCart[zoneName].totalQuantity += Number(quantity);
        shoppingCart[zoneName].totalZonePrice += Number(
          finalPrice ?? unitPrice * quantity
        );
      });

      // Actualizar el evento con el carrito completo
      setEvent({
        ...event,
        selectedDate: zonesInfo[0]?.date[0]?.startDate,
        selectedSchedule:
          zonesInfo[0]?.date[0]?.startHour +
          " - " +
          zonesInfo[0]?.date[0]?.endHour,
        shoppingCart,
      });

      await new Promise((res) => setTimeout(res, 300));
      navigate(paymentPage);
    } catch (err) {
      await new Promise((res) => setTimeout(res, 300));
      if (err.code === 1) navigate("/login");
      if (err.code === 0) {
        //onClose();
        Swal.fire({
          icon: "error",
          title: "¡Lo sentimos!",
          text: "Ocurrió un error inesperado",
        });
      }

      setErrorCode(err.code || 0);
      setShowAlertMessage(true);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <>
      <BaseModal>
        {isModalLoading ? (
          <div className="flex flex-col items-center justify-center h-[55vh] w-[50vw] bg-white rounded-md shadow-lg">
            <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mb-3"></div>
            <span className="text-gray-500">Cargando fechas...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col rounded-xl justify-between w-full max-w-6xl h-auto  bg-white shadow-2xs ">
              <div className="flex flex-wrap h-[60vh] rounded-xl">
                <div className="flex flex-[4] rounded-xl items-stretch h-full flex-col border-r border-gray-300/60">
                  {/* Header del modal */}
                  <div className="flex flex-row rounded-l-xl rounded-b-none shadow-sm border-b justify-start gap-4 items-center py-4 px-4 border-b-gray-300 bg-gray-200">
                    <ArrowButton onClick={onReturn} />
                    <span className="inline-block font-semibold text-3xl">
                      Selecciona tus entradas
                    </span>
                  </div>

                  {/* Sección donde se muestran las entradas */}
                  <div className="flex overflow-auto flex-col h-full w-full px-7 pb-5 gap-2.5">
                    {showAlertMessage && (
                      <div className="flex pt-5 pb-1">
                        <AlertMessage id={zoneIndex}>
                          {TICKET_SELECTION_TEXTS.alerts[errorCode]}
                        </AlertMessage>
                      </div>
                    )}
                    <div className="flex mt-4 mb-1.5">
                      <span className="inline-block text-gray-800">
                        Puedes seleccionar hasta un máximo de {getCap()}{" "}
                        entradas.
                      </span>
                    </div>

                    {zonesInfo[0] &&
                      zonesInfo[0]?.zoneDates.map((zone, zoneIndex) => (
                        <div key={zoneIndex} className="gap-none">
                          {zone.allocations.length === 0 && (
                            <div className="flex flex-row gap-2 items-center mb-2">
                              {zone.capacityRemaining > 0 ? (
                                <CheckCircleIcon
                                  className={`size-5 ${
                                    parseFloat(
                                      zone.capacityRemaining / zone.capacity
                                    ) > 0.5
                                      ? "text-green-400"
                                      : "text-orange-400"
                                  }`}
                                ></CheckCircleIcon>
                              ) : (
                                <XCircleIcon className="size-5 text-red-500"></XCircleIcon>
                              )}
                              <span>
                                Hay {zone.capacityRemaining} entradas restantes
                              </span>
                            </div>
                          )}

                          <div className="grid grid-cols-[1fr_1fr_auto] justify-between items-center py-3 border border-gray-400 shadow-xl rounded-lg px-5">
                            <span>{zone.name}</span>
                            {/* Zonas */}
                            {zone.allocations.length === 0 ? (
                              <>
                                <span>{currencies.PEN + zone.basePrice}</span>

                                {zone.kind != "SEATED" ? (
                                  <div
                                    key={zoneIndex}
                                    className="select-none grid grid-cols-[1fr_1fr_auto] justify-between items-center gap-4"
                                  >
                                    <MinusIcon
                                      onClick={() =>
                                        handleNoAllocationGeneralSubtraction(
                                          zoneIndex
                                        )
                                      }
                                      className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                    ></MinusIcon>
                                    <span>
                                      {notAllocatedGeneralQuantities[zoneIndex]}
                                    </span>
                                    <PlusIcon
                                      onClick={() =>
                                        handleNoAllocationGeneralSum(zoneIndex)
                                      }
                                      className="select-none size-3 cursor-pointer rounded-xl bg-gray-300"
                                    ></PlusIcon>
                                  </div>
                                ) : (
                                  <div className="flex flex-row gap-4">
                                    <button
                                      onClick={() =>
                                        handleNotAllocatedSeated(zoneIndex)
                                      }
                                      className="bg-yellow-400 text-white px-2 rounded-md cursor-pointer hover:bg-yellow-500 hover:scale-105 transition-transform"
                                    >
                                      Elegir
                                    </button>
                                    (
                                    {
                                      notAllocatedSeatedQuantities[zoneIndex]
                                        .length
                                    }
                                    )
                                  </div>
                                )}
                              </>
                            ) : (
                              <div className="flex flex-row gap-2 justify-end items-center">
                                {zone.capacityRemaining > 0 ? (
                                  <CheckCircleIcon
                                    className={`size-5 ${
                                      parseFloat(
                                        zone.capacityRemaining / zone.capacity
                                      ) > 0.5
                                        ? "text-green-400"
                                        : "text-orange-400"
                                    }`}
                                  ></CheckCircleIcon>
                                ) : (
                                  <XCircleIcon className="size-5 text-red-500"></XCircleIcon>
                                )}
                                <span className="flex justify-end text-center">
                                  Quedan {zone.capacityRemaining} entradas
                                </span>
                              </div>
                            )}
                          </div>
                          {/* Allocations */}
                          <div className="px-2">
                            <div className="rounded-b-2xl border-b border-x border-gray-300 bg-gray-100 shadow-md">
                              {zone.allocations.length > 0 &&
                                zone.allocations.map(
                                  (allocation, allocationIndex) => (
                                    <div
                                      key={allocationIndex}
                                      className="flex flex-col rounded-2xl  bg-gray-100"
                                    >
                                      <div className="select-none grid grid-cols-[1fr_1fr_auto] gap-4 items-center bg-gray-100 py-2.5 pl-3.5 pr-2 rounded-2xl">
                                        <span className=" w-auto">
                                          {allocation.audienceName}
                                        </span>
                                        <span>
                                          {currencies.PEN +
                                            " " +
                                            parseFloat(
                                              allocation.price
                                            ).toFixed(2)}
                                        </span>
                                        {zone.kind != "SEATED" ? (
                                          <div
                                            key={allocationIndex}
                                            className="grid grid-cols-3 justify-between items-center gap-3.5"
                                          >
                                            <div
                                              onClick={() =>
                                                handleAllocatedGeneralSubtraction(
                                                  zoneIndex,
                                                  allocationIndex
                                                )
                                              }
                                              className="flex select-none py-0.5 cursor-pointer transition-all hover:scale-110"
                                            >
                                              <div className="flex cursor-pointer rounded-xl bg-gray-300 justify-center items-center hover:bg-gray-400/60 transition-all hover:scale-101">
                                                <MinusIcon className="select-none size-3.5 m-0.5" />
                                              </div>
                                            </div>

                                            <span className="text-center">
                                              {allocatedGeneralQuantities[
                                                zoneIndex
                                              ] &&
                                                allocatedGeneralQuantities[
                                                  zoneIndex
                                                ][allocationIndex]}
                                            </span>
                                            <div
                                              onClick={() =>
                                                handleAllocatedGeneralSum(
                                                  zoneIndex,
                                                  allocationIndex
                                                )
                                              }
                                              className="flex select-none py-0.5 cursor-pointer  transition-all hover:scale-110"
                                            >
                                              <div className="flex cursor-pointer rounded-xl bg-gray-300 justify-center items-center hover:bg-gray-400/60 transition-all hover:scale-101">
                                                <PlusIcon className="select-none size-3.5 m-0.5 " />
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          <div className="flex flex-row gap-3">
                                            <button
                                              onClick={() =>
                                                handleAllocatedSeated(
                                                  zoneIndex,
                                                  allocationIndex
                                                )
                                              }
                                              className="bg-yellow-400 text-white px-2 rounded-md cursor-pointer hover:bg-yellow-500 hover:scale-105 transition-transform"
                                            >
                                              Elegir
                                            </button>
                                            (
                                            {
                                              Object.values(
                                                allocatedSeatedQuantities[
                                                  zoneIndex
                                                ]
                                              ).filter(
                                                (value) =>
                                                  value === allocationIndex
                                              ).length
                                            }
                                            )
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Sección de información del evento */}
                <div className="flex-[2] rounded-r overflow-auto h-full">
                  <div className="flex flex-col rounded-r py-6 px-6 gap-3 justify-start">
                    <img src={event?.image} className="rounded-lg "></img>
                    <span className="inline-block text-start font-semibold text-2xl">
                      {event?.title}
                    </span>
                    <div className="flex flex-1 flex-row justify-start items-center gap-2">
                      <MapPinIcon className="inline-block size-5 text-purple-600"></MapPinIcon>
                      {event?.inPerson ? (
                        <span className="flex text-start">
                          {event?.venue?.address}
                        </span>
                      ) : (
                        <span>Modalidad Virtual</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-row justify-start items-center gap-2">
                      <UserGroupIcon className="flex size-5 text-purple-600"></UserGroupIcon>
                      <p className="inline-block text-start">
                        {event &&
                          EVENT_INFORMATION_TEXTS?.access_policy[
                            event?.accessPolicy
                          ]}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-row  justify-start items-center gap-2">
                      <CalendarIcon className="size-5 text-purple-600"></CalendarIcon>
                      <span className="inline-block">
                        {zonesInfo[0]?.date[0].startDate}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-row  justify-start items-center gap-2">
                      <ClockIcon className="size-5 text-purple-600"></ClockIcon>
                      <span className="inline-block">
                        {zonesInfo[0]?.date[0].startHour +
                          " - " +
                          zonesInfo[0]?.date[0].endHour}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Subtotal seleccionado */}
              <div className="flex flex-row h-auto py-3 px-3.5 justify-between gap-4 border-t border-gray-300/60 items-center">
                <div className="flex flex-row gap-4">
                  <span className="inline-block font-semibold">Subtotal: </span>
                  <span className="inline-block font-semibold">
                    {currencies.PEN + " " + subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={onContinue}
                    className={`inline-block border-0 w-auto rounded-lg text-white px-2.5 py-1 ${
                      !isButtonLoading
                        ? "bg-purple-600 hover:bg-yellow-500/70 hover:scale-104  cursor-pointer"
                        : "bg-purple-700"
                    } transition-all duration-200`}
                  >
                    {isButtonLoading ? (
                      <div className="size-3 mx-7 my-1.5 justify-center items-center text-center border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    ) : (
                      "Continuar "
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </BaseModal>
      {modal === "seats" && (
        <AnimatePresence>
          <SeatNumberSelectionModal
            setModal={setModal}
            seatMap={seatMap}
            zoneIndex={zoneIndex}
            capacityRemaining={zonesInfo[0][zoneIndex].capacityRemaining}
            allocationIndex={allocationIndex}
            notAllocatedSeatedQuantities={notAllocatedSeatedQuantities}
            setNotAllocatedSeatedQuantities={setNotAllocatedSeatedQuantities}
            allocatedSeatedQuantities={allocatedSeatedQuantities}
            setAllocatedSeatedQuantities={setAllocatedSeatedQuantities}
          />
        </AnimatePresence>
      )}
    </>
  );
}
