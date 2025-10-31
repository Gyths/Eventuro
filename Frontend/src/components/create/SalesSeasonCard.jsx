import React, { useEffect, useState } from "react";
import BotonCTA from "../BotonCTA";
import FormField from "./FormField";
import TextInput from "./TextInput";
import BotonEliminar from "../BotonEliminar";

export default function SalesSeasonCard({ value, onChange }) {
  const controlled = !!value;

  const [state, setState] = useState(
    value ?? {
      seasons: [
        {
          id: Date.now(),
          name: "",
          percentage: "10",
          isIncrease: false, // false = descuento, true = aumento
          startDate: "",
          endDate: "",
          ticketLimit: "",
        },
      ],
    }
  );

  // Sync with parent component
  useEffect(() => {
    if (controlled) setState(value);
  }, [controlled, value]);

  // Generic update handler
  const set = (patch) => {
    const next =
      typeof patch === "function" ? patch(state) : { ...state, ...patch };
    if (!controlled) setState(next);
    onChange?.(next);
  };

  const sanitizeInt = (v) => v.replace(/\D+/g, "");

  // Add new season
  const handleAddSeason = () => {
    const newSeason = {
      id: Date.now(),
      name: "",
      percentage: "10",
      isIncrease: false,
      startDate: "",
      endDate: "",
      ticketLimit: "",
    };
    set((currentState) => ({
      ...currentState,
      seasons: [...currentState.seasons, newSeason],
    }));
  };

  // Delete season
  const handleDeleteSeason = (id) => {
    set((currentState) => ({
      ...currentState,
      seasons: currentState.seasons.filter((s) => s.id !== id),
    }));
  };

  // Update specific season
  const updateSeason = (id, field, value) => {
    set((currentState) => ({
      ...currentState,
      seasons: currentState.seasons.map((s) =>
        s.id === id ? { ...s, [field]: value } : s
      ),
    }));
  };

  // Toggle between increase/decrease
  const toggleSeasonType = (id) => {
    set((currentState) => ({
      ...currentState,
      seasons: currentState.seasons.map((s) =>
        s.id === id ? { ...s, isIncrease: !s.isIncrease } : s
      ),
    }));
  };

  return (
    <section className="rounded-[28px] bg-white p-5 sm:p-6 lg:p-7 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800">
          Temporadas de Venta
        </h3>
        <BotonCTA onClick={handleAddSeason} variant="primary">
          + Nueva Temporada
        </BotonCTA>
      </div>

      <div className="space-y-4">
        {state.seasons.map((season, idx) => (
          <div
            key={season.id}
            className="rounded-2xl bg-white shadow-md p-4 sm:p-5 border border-gray-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
              {/* Season Name */}
              <div className="lg:col-span-3">
                <FormField label="Nombre de temporada">
                  <TextInput
                    placeholder="Ej. Preventa"
                    value={season.name}
                    onChange={(v) => updateSeason(season.id, "name", v)}
                  />
                </FormField>
              </div>

              {/* Percentage with +/- toggle */}
              <div className="lg:col-span-3">
                <FormField label="Porcentaje">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSeasonType(season.id)}
                      className={`flex-shrink-0 w-10 h-10 rounded-lg font-bold text-lg transition-colors ${
                        season.isIncrease
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                      title={season.isIncrease ? "Aumento" : "Descuento"}
                    >
                      {season.isIncrease ? "+" : "-"}
                    </button>
                    <div className="flex-1 relative">
                      <TextInput
                        placeholder="10"
                        value={season.percentage}
                        onChange={(v) =>
                          updateSeason(season.id, "percentage", sanitizeInt(v))
                        }
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                        %
                      </span>
                    </div>
                  </div>
                </FormField>
              </div>

              {/* Start Date */}
              <div className="lg:col-span-2">
                <FormField label="Fecha inicio">
                  <input
                    type="date"
                    value={season.startDate}
                    onChange={(e) =>
                      updateSeason(season.id, "startDate", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </FormField>
              </div>

              {/* End Date */}
              <div className="lg:col-span-2">
                <FormField label="Fecha fin">
                  <input
                    type="date"
                    value={season.endDate}
                    onChange={(e) =>
                      updateSeason(season.id, "endDate", e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </FormField>
              </div>

              {/* Límite de Tickets */}
              <div className="lg:col-span-2">
                <FormField label="Límite Tickets">
                  <TextInput
                    type="number"
                    placeholder="Ej. 100"
                    value={season.ticketLimit}
                    onChange={(v) =>
                      updateSeason(season.id, "ticketLimit", sanitizeInt(v))
                    }
                  />
                </FormField>
              </div>

              {/* Delete Button */}
              <div className="lg:col-span-2 flex items-end justify-center lg:justify-start pb-1.5">
                <BotonEliminar onClick={() => handleDeleteSeason(season.id)} />
              </div>
            </div>

            {/* Season indicator */}
            <div className="mt-3 text-xs text-gray-600">
              <span className="font-medium">Temporada {idx + 1}:</span>{" "}
              <span
                className={
                  season.isIncrease ? "text-red-600" : "text-green-600"
                }
              >
                {season.isIncrease ? "+" : "-"}
                {season.percentage || "0"}%
              </span>{" "}
              {season.name && `(${season.name})`}{" "}
              {season.ticketLimit && (
                <span className="text-blue-600">
                  (Límite: {season.ticketLimit} tickets)
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {state.seasons.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay temporadas configuradas. Haz clic en "+ Nueva Temporada" para
          agregar una.
        </div>
      )}
    </section>
  );
}
