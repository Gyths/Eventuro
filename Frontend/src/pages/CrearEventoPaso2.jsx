import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CrearTicketTarjeta from "../components/CrearTicketTajeta";
import UbicacionEvento from "../components/UbicacionEvento";
import BotonCTA from "../components/BotonCTA";

export default function CrearEventoPaso2() {
  const navigate = useNavigate();

  // shared state for the ticket card
  const [items, setItems] = useState([{ tipo: "", cantidad: "", monto: "" }]);
  const [currency, setCurrency] = useState("PEN");
  const [zoneName, setZoneName] = useState("General");
  const [kind, setKind] = useState("GENERAL");

  const handleNext = () => {
    // Construct payload using the same logic
    const zonePayload = {
      zones: [
        {
          name: zoneName,
          kind,
          currency,
          basePrice: Number(items[0]?.monto || 0),
          capacity: Number(items[0]?.cantidad || 0),
          allocations: items.map((item) => ({
            audienceName: item.tipo,
            discountPercent: 0,
            allocatedQuantity: Number(item.cantidad),
          })),
        },
      ],
    };

    console.log("Payload to send:", JSON.stringify(zonePayload, null, 2));

    navigate("/crear/paso3");
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <UbicacionEvento />

      <CrearTicketTarjeta
        items={items}
        setItems={setItems}
        currency={currency}
        setCurrency={setCurrency}
        zoneName={zoneName}
        setZoneName={setZoneName}
        kind={kind}
        setKind={setKind}
      />

      <div className="flex justify-center">
        <BotonCTA variant="pink" onClick={handleNext}>
          Siguiente
        </BotonCTA>
      </div>
    </div>
  );
}
