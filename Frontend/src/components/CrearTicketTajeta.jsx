import React, { useState } from "react";
import LineaDinamica from "./CrearTicketLinea";
import BotonCTA from "./BotonCTA";
import Titulo from "./Titulo";

export default function CrearTicketTajeta() {
  const [currency, setCurrency] = useState("PEN");
  const [items, setItems] = useState([{ name: "", price: "", amount: "" }]);
  const [finVenta, setfinVenta] = useState("termino");
  const [perPerson, setPerPerson] = useState("10");
  const [toggle, setToggle] = useState(false);
  const [howMany, setHowMany] = useState("");
  const [timePeriod, setTimePeriod] = useState("Daily");

  const handleAddLine = () =>
    setItems([...items, { name: "", price: "", amount: "" }]);

  return (
    <div className="flex justify-center w-full p-4">
      <div className="rounded-2xl shadow-lg w-full max-w-7xl p-6 flex flex-col gap-4"
        style={{ backgroundColor: "#F8F8F8" }}>
       <div>
          <Titulo>Crear Entradas</Titulo>
        </div>

        {/* Selector moneda */}
        <div className="flex justify-between items-center gap-4">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="border rounded px-4 py-2 w-100"
          >
            <option value="PEN">Soles</option>
            <option value="USD">Dolares Americanos</option>
          </select>

          <BotonCTA onClick={handleAddLine} variant="primary">+ Crear Entrada</BotonCTA>
        </div>

        {/* Linea de tipos de entrada */}
        <LineaDinamica items={items} setItems={setItems} />

        {/* Opciones de venta*/}
        <div className="flex flex-col md:flex-row items-start md:items-end gap-4 mt-1">
           
           {/* Hasta cuando se vende*/}
            <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
              <span className="font-semibold">Hasta qué momento desea vender las entradas:</span>
              <select
                value={finVenta}
                onChange={(e) => setfinVenta(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              >
                <option value="termino">Hasta que termine el evento</option>
                <option value="2 dias antes">2 dias antes del evento</option>
                <option value="inicio">Hasta el inicio del evento</option>
              </select>
            </div>

            {/* Maximo por usuario */}
            <div className="flex flex-col gap-1 flex-1 min-w-[120px]">
              <span className="font-semibold">Entradas máximas por usuario:</span>
              <select
                value={perPerson}
                onChange={(e) => setPerPerson(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </div>

        
        </div>

        <div className="mt-4">
          <BotonCTA onClick={() => setToggle(!toggle)} variant="secondary">
            Venta Escalonada
          </BotonCTA>

          {/* Opciones de venta escalonada, no se muestran sin el toggle */}
          {toggle && (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-3">
              <div className="flex items-center gap-4 flex-wrap">
                <span>Habilitar</span>
                <input
                  type="number"
                  value={howMany}
                  onChange={(e) => setHowMany(e.target.value)}
                  className="border rounded px-2 py-1 flex-1 min-w-[60px]"
                />

                <span>entradas</span>
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="border rounded px-3 py-1 flex-1 min-w-[120px]"
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
