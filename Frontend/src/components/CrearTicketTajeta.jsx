import React, { useState } from "react";
import LineaDinamica from "./CrearTicketLinea";
import BotonCTA from "./BotonCTA";
import Titulo from "./Titulo";

export default function CrearTicketTajeta() {
  const [currency, setCurrency] = useState("PEN");
  const [items, setItems] = useState([{ name: "", price: "", amount: "" }]);
  const [perPerson, setPerPerson] = useState("10");
  const [date, setDate] = useState("");
  const [toggle, setToggle] = useState(false);
  const [howMany, setHowMany] = useState("");
  const [timePeriod, setTimePeriod] = useState("Daily");

  const handleAddLine = () =>
    setItems([...items, { name: "", price: "", amount: "" }]);

  return (
    <div className="flex justify-center w-full p-4">
      <div
        className="rounded-2xl shadow-lg w-full max-w-7xl p-6 flex flex-col gap-4"
        style={{ backgroundColor: "#F8F8F8" }}
      >
        <div>
          <Titulo>Crear Entradas</Titulo>
          {/* Rest of your page */}
        </div>

        {/* Selector + Add button row */}
        <div className="flex justify-between items-center gap-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border rounded px-4 py-2 w-100"
          >
            <option value="PEN">Soles</option>
            <option value="USD">Dolares Americanos</option>
          </select>

          {/* CTA Add Line button */}
          <BotonCTA onClick={handleAddLine}>+ Crear Entrada</BotonCTA>
        </div>

        {/* White dynamic card */}
        <LineaDinamica items={items} setItems={setItems} />

        {/* Inputs row: Date + How many per person side by side */}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mt-1">
          {/* Date input */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold">
              Hasta qué momento desea vender las entradas:
            </span>
            <input
              type="text"
              placeholder="YYYY-MM-DD"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded px-3 py-2 w-100"
            />
          </div>

          {/* How many per person */}
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Entradas máximas por usuario:</span>
            <select
              value={perPerson}
              onChange={(e) => setPerPerson(e.target.value)}
              className="border rounded px-4 py-2 w-32"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          {/* CTA Edit Options button */}
          <BotonCTA onClick={() => setToggle(!toggle)}>
            Venta Escalonada
          </BotonCTA>

          {/* Spacing between button and inputs */}
          {toggle && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-3">
              <div className="flex items-center gap-4">
                <span>Habilitar</span>
                <input
                  type="number"
                  value={howMany}
                  onChange={(e) => setHowMany(e.target.value)}
                  className="border rounded px-2 py-1 w-24"
                />

                <span>entradas</span>
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="border rounded px-3 py-1 w-48"
                >
                  <option>diariamente</option>
                  <option>semanalmente</option>
                  <option>mensualmente</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
