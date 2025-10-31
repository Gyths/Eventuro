import React from "react";
import LineaDinamica from "./CrearTicketLinea";
import BotonCTA from "./BotonCTA";
import Titulo from "./Titulo";

export default function CrearTicketTajeta({
  items,
  setItems,
  currency,
  setCurrency,
  zoneName,
  setZoneName,
  kind,
  setKind,
}) {
  const handleAddLine = () =>
    setItems([...items, { tipo: "", cantidad: "", monto: "" }]);

  return (
    <div className="flex justify-center w-full p-4">
      <div
        className="rounded-2xl shadow-lg w-full max-w-7xl p-6 flex flex-col gap-4"
        style={{ backgroundColor: "#F8F8F8" }}
      >
        <Titulo>Crear Entradas</Titulo>

        {/* Selector moneda */}
        <div className="flex justify-between items-center gap-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border rounded px-4 py-2 w-100"
          >
            <option value="PEN">Soles</option>
            <option value="USD">Dólares Americanos</option>
          </select>

          <BotonCTA onClick={handleAddLine} variant="primary">
            + Crear Entrada
          </BotonCTA>
        </div>

        {/* Linea de tipos de entrada */}
        <LineaDinamica items={items} setItems={setItems} />
      </div>
    </div>
  );
}
