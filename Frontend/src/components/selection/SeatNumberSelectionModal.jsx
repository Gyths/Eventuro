import React from "react";
import BaseModal from "../BaseModal";

import { XMarkIcon } from "@heroicons/react/24/solid";

export default function SeatNumberSelectionModal({
  setModal,
  seatMap,
  zoneIndex,
  allocationIndex = null,
  notAllocatedSeatedQuantities = [],
  setNotAllocatedSeatedQuantities,
  allocatedSeatedQuantities = [{}],
  setAllocatedSeatedQuantities,
}) {
  //console.log("seatMap: ");
  //console.log(seatMap);
  //console.log("zoneIndex: " + zoneIndex);
  //console.log("allocationIndex: " + allocationIndex);

  const [selectedSeats, setSelectedSeats] = React.useState([]);
  const [allocatedSelectedSeats, setAllocatedSelectedSeats] = React.useState(
    {}
  );
  //console.log("selectedSeats: ");
  //console.log(selectedSeats);
  //console.log("allocatedSelectedSeats: ");
  //console.log(allocatedSelectedSeats);

  const handleSeatSelection = (seatNum) => {
    if (allocationIndex === null) {
      setSelectedSeats(() => {
        let selectedPlaceholder = selectedSeats;
        if (selectedPlaceholder.includes(seatNum)) {
          return selectedPlaceholder.filter((s) => s !== seatNum);
        } else {
          return [...selectedPlaceholder, seatNum];
        }
      });
    } else {
      setAllocatedSelectedSeats((allocatedSelectedSeats) => {
        let selectedPlaceholder = { ...allocatedSelectedSeats };
        if (seatNum in selectedPlaceholder) {
          delete selectedPlaceholder[seatNum];
        } else {
          let globalCopy = allocatedSeatedQuantities.map((zoneSeats) => ({
            ...zoneSeats,
          }));

          globalCopy.forEach((zoneSeats, zIndex) => {
            if (seatNum in zoneSeats) {
              delete zoneSeats[seatNum];
            }
          });

          selectedPlaceholder[seatNum] = allocationIndex;

          const newGlobal = globalCopy.map((zoneSeats, zIndex) =>
            zIndex === zoneIndex ? selectedPlaceholder : zoneSeats
          );
          setAllocatedSeatedQuantities(newGlobal);
        }
        return selectedPlaceholder;
      });
    }
  };

  const handleAccept = () => {
    console.log(notAllocatedSeatedQuantities);
    if (allocationIndex === null) {
      const newQuantities = notAllocatedSeatedQuantities.map(
        (quantitie, index) => {
          return index === zoneIndex ? selectedSeats : quantitie;
        }
      );
      console.log(newQuantities);
      setNotAllocatedSeatedQuantities(newQuantities);
    } else {
      const newAllocationQuantities = allocatedSeatedQuantities.map(
        (seats, index) => {
          return index === zoneIndex ? allocatedSelectedSeats : seats;
        }
      );
      setAllocatedSeatedQuantities(newAllocationQuantities);
    }

    setModal("tickets");
  };

  const handleClose = () => {
    setModal("tickets");
  };

  React.useEffect(() => {
    console.log(selectedSeats);
  }, [selectedSeats]);

  React.useEffect(() => {
    console.log(allocatedSelectedSeats);
  }, [allocatedSelectedSeats]);

  React.useEffect(() => {
    if (
      Array.isArray(notAllocatedSeatedQuantities) &&
      Array.isArray(notAllocatedSeatedQuantities[zoneIndex])
    ) {
      setSelectedSeats(notAllocatedSeatedQuantities[zoneIndex]);
    }

    if (Array.isArray(allocatedSeatedQuantities)) {
      setAllocatedSelectedSeats(allocatedSeatedQuantities[zoneIndex]);
    }
  }, []);

  return (
    <BaseModal>
      <div className="flex flex-col min-w-3/5 max-h-2/3 bg-white rounded py-3 px-7">
        <div className="flex flex-row justify-between border-b border-gray-300 py-2">
          <span className="inline-block font-semibold text-3xl">
            Seleccione sus asientos
          </span>
          <XMarkIcon
            onClick={handleClose}
            className="size-4 cursor-pointer"
          ></XMarkIcon>
        </div>

        <span className=" py-3">
          *Esta no es una distribución real de asientos.
        </span>
        <span>
          Seleccionados (
          {allocationIndex === null
            ? selectedSeats.length
            : Object.values(allocatedSelectedSeats).filter(
                (value) => value === allocationIndex
              ).length}
          )
        </span>
        <div className="grid grid-cols-10 gap-2 overflow-auto py-4 px-5">
          {seatMap &&
            seatMap.occupiedSeats.map((seat) => (
              <div
                key={seat.seatId}
                onClick={() =>
                  seat.status === "AVAILABLE" &&
                  handleSeatSelection(seat.seatId)
                }
                className={`text-center rounded-xl  transition-transform select-none ${
                  selectedSeats.includes(seat.seatId) ||
                  (seat.seatId in allocatedSelectedSeats &&
                    allocatedSelectedSeats[seat.seatId] === allocationIndex)
                    ? "bg-yellow-400 text-white cursor-pointer hover:scale-115"
                    : seat.seatId in allocatedSelectedSeats &&
                      allocatedSelectedSeats[seat.seatId] != allocationIndex
                    ? "bg-orange-500/70 text-white cursor-pointer hover:scale-115"
                    : seat.status === "AVAILABLE"
                    ? "border border-green-800/50 hover:bg-gray-300 cursor-pointer hover:scale-115"
                    : "border border-red-700/80 bg-gray-100"
                }`}
              >
                {(parseInt(seat.rowNumber) - 1) * parseInt(seatMap.cols) +
                  parseInt(seat.colNumber)}
              </div>
            ))}
        </div>
        <div className="flex flex-row justify-between items-center pt-4 px-2">
          <button
            onClick={handleClose}
            className="flex justify-end items-center rounded-lg py-0.5 px-2 bg-red-700/80 text-white cursor-pointer"
          >
            Regresar
          </button>
          <button
            onClick={handleAccept}
            className="flex justify-end items-center rounded-lg py-1 px-2 bg-yellow-500 text-white cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
