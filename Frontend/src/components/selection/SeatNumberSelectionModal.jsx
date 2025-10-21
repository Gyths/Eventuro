import React from "react";
import BaseModal from "../BaseModal";

export default function SeatNumberSelectionModal({ allocations, seatMaps }) {
  return (
    <BaseModal>
      <div className="flex-col bg-white rounded">
        <span>
          *Esto no representa la distribución real de asientos, solo permite ver
          comodamente la lista de asientos con su disponibilidad
        </span>
        <div className="grid grid-cols-10">
          {seatMaps &&
            seatMaps.occupiedSeats.map((seat, index) => <div>{seat}</div>)}
        </div>
      </div>
    </BaseModal>
  );
}
