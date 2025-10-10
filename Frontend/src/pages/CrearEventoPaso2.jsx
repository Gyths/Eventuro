import React from "react";
import { useNavigate } from "react-router-dom";

import CrearTicketTarjeta from "../components/CrearTicketTajeta";
import UbicacionEvento from "../components/UbicacionEvento";
import BotonCTA from "../components/BotonCTA";

export default function CrearEventoPaso2() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 p-6">
      <UbicacionEvento/>
      <CrearTicketTarjeta />
      <div className="flex justify-center">
          <BotonCTA variant="pink" onClick={()=>navigate("/crear/paso3")}>Siguiente</BotonCTA>
      </div>
    </div>
  );
}
