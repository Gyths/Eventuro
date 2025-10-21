import React from "react";
import BaseModal from "../BaseModal";

export default function SeatNumberSelectionModal({
  seatMap,
  setNoAllocationSeatedQuantities,
}) {
  //console.log(seatMap);
  const [selectedSeat, setSelectedSeats] = React.useState([]);
  const handleSeatSelection = (seatNum) => {
    let selected = selectedSeat;
    !selected.includes(seatNum) && selected.append(seatNum);
  };

  return (
    <BaseModal>
      <div className="flex flex-col min-w-3/5 max-h-2/3 bg-white rounded py-3 px-7">
        <span className="border-b border-gray-100 py-3">
          *Esto no representa la distribución real de los asientos
        </span>
        <div className="grid grid-cols-10 gap-2 overflow-auto py-4 px-5">
          {seatMap &&
            seatMap.occupiedSeats.map((seat, index) => (
              <div
                key={seat.seatId}
                onClick={() => handleSeatSelection(seat.seatId)}
                className="text-center rounded-xl bg-gray-200"
              >
                {(parseInt(seat.rowNumber) - 1) * parseInt(seatMap.cols) +
                  parseInt(seat.colNumber)}
              </div>
            ))}
        </div>
        <div className="flex flex-row justify-between items-center py-2.5 px-2">
          <div className="flex"></div>
          <button className="flex justify-end items-center rounded-lg py-1 px-2 bg-yellow-500 text-white cursor-pointer">
            Aceptar
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
