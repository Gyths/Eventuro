import React, { useState } from "react";
import "../styles/UbicacionEvento.css";
import BotonCTA from "./BotonCTA";
import Titulo from "./Titulo";

function UbicacionEvento() {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [howToFind, setHowToFind] = useState("");
  const [capacity, setCapacity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      city,
      address,
      reference,
      howToFind,
      capacity,
    });
  };

  return (
    <div className="flex justify-center w-full p-4">
      <div
        className="rounded-2xl shadow-lg w-full max-w-7xl p-6 flex flex-col gap-4 md:flex-row"
        style={{ backgroundColor: "#F8F8F8" }}
      >
        <div className="w-full md:w-2/3 space-y-4">
          <div>
            <Titulo>Ubicación</Titulo>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                Ciudad*
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded px-4 py-2 w-full"
              >
                <option value="">Elije una Ciudad para el evento</option>
                <option value="cusco">Cusco</option>
                <option value="lima">Lima</option>
                <option value="arequipa">Arequipa</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Recomendación: Ingrese un nombre llamativo y corto"
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="reference"
                className="block text-sm font-medium text-gray-700"
              >
                Referencia
              </label>
              <input
                type="text"
                id="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="Ej. Al frente de la gasolinera del centro"
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="space-y-2 w-full md:w-1/2">
                <label
                  htmlFor="how-to-find"
                  className="block text-sm font-medium text-gray-700"
                >
                  ¿Cómo encontrarnos?
                </label>
                <input
                  type="text"
                  id="how-to-find"
                  value={howToFind}
                  onChange={(e) => setHowToFind(e.target.value)}
                  placeholder="Ej. Stand N° 325"
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
              <div className="space-y-2 w-full md:w-1/2">
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Aforo
                </label>
                <input
                  type="number"
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="border rounded px-4 py-2 w-full"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/3 ml-4">
          <div className="map-container">
            <div className="map-placeholder">Mapa se cargará aquí</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UbicacionEvento;
