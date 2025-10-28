import React, { useState, useEffect } from "react";
import { BanknotesIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const EVENTS_API_URL = "http://localhost:4000/eventuro/api/event/list";
const FEE_API_URL = "http://localhost:4000/eventuro/api/event";

export default function EventCommissionsCard() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commissionInputs, setCommissionInputs] = useState({});
  const [savingEventId, setSavingEventId] = useState(null);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(EVENTS_API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const parsedEvents = (data || []).map((event) => ({
        id: event.eventId,
        title: event.title || "Evento sin título",
        description: event.description || "Sin descripción.",
        categories: (event.categories || []).map(
          (cat) => cat.category.description
        ),
      }));
      setEvents(parsedEvents);
    } catch (err) {
      setError(err.message || "No se pudieron cargar los eventos");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);
  const handleSaveCommission = async (eventId) => {
    const commissionValue = commissionInputs[eventId] || "";
    const percentage = parseFloat(commissionValue);
    if (isNaN(percentage) || percentage < 0) {
      Swal.fire(
        "Valor inválido",
        "Ingresa un número de comisión válido (ej. 5.5).",
        "error"
      );
      return;
    }
    setSavingEventId(eventId);
    const jsonBody = {
      percentage: percentage,
    };
    try {
      const response = await fetch(`${FEE_API_URL}/${eventId}/fee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(jsonBody),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
      }
      await Swal.fire({
        icon: "success",
        title: "¡Comisión Guardada!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      await Swal.fire("Error", err.message, "error");
    } finally {
      setSavingEventId(null);
    }
  };
  const handleInputChange = (eventId, value) => {
    const sanitizedValue = value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setCommissionInputs((prev) => ({
      ...prev,
      [eventId]: sanitizedValue,
    }));
  };
  // --- FIN DE LA LÓGICA ---

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm max-w-4xl mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-md">
      <div className="border-b border-gray-200 p-6 sm:p-8 bg-gray-50/70">
        <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
          <BanknotesIcon className="h-9 w-9 text-purple-600" />
          Comisiones por Evento
        </h3>
        <p className="mt-2 text-base text-gray-600">
          Define el porcentaje de comisión para cada evento publicado.
        </p>
      </div>

      <div className="p-4 sm:p-5">
        {isLoading && (
          <div className="text-center p-4">Cargando eventos...</div>
        )}
        {error && (
          <div className="text-center p-4 text-red-600">Error: {error}</div>
        )}

        {!isLoading && !error && (
          <div className="divide-y divide-gray-200 rounded-lg border">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 transition-colors hover:bg-purple-50/50"
              >
                {/* Info del Evento */}
                <div className="flex-grow">
                  <h4 className="font-semibold text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 truncate">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {event.categories.map((catName) => (
                      <span
                        key={catName}
                        className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-medium text-xs"
                      >
                        {catName}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Input y Botón */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-28">
                    <input
                      type="text"
                      value={commissionInputs[event.id] || ""}
                      onChange={(e) =>
                        handleInputChange(event.id, e.target.value)
                      }
                      placeholder="Ej. 5.5"
                      className="w-full rounded-lg border border-gray-300 p-2 text-sm shadow-sm pr-7"
                    />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                      %
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSaveCommission(event.id)}
                    disabled={savingEventId === event.id}
                    className="flex justify-center items-center px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors shadow-sm disabled:bg-gray-400 w-28"
                  >
                    {savingEventId === event.id ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Guardar"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
