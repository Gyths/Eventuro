import React, { useEffect, useState } from "react";
import BotonCTA from "../BotonCTA";
import FormField from "./FormField";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import CrearTicketLine from "./CrearTicketLine";

export default function CrearTicketCard({ value, onChange }) {
  const controlled = !!value;
  const [state, setState] = useState(
    value ?? {
      currency: "PEN",
      items: [{ type: "", quantity: "", price: "" }],
      endSaleWhen: "termino",
      maxPerUser: "10",
      tier: { enabled: false, qty: "", period: "diariamente" },
    }
  );

  // sync con el padre
  useEffect(() => { if (controlled) setState(value); }, [controlled, value]);

  const set = (patch) => {
    const next = typeof patch === "function" ? patch(state) : { ...state, ...patch };
    if (!controlled) setState(next);
    onChange?.(next);
  };

  // sanitizadores para tus TextInput (solo value/onChange/placeholder)
  const sanitizeInt = (v) => v.replace(/\D+/g, "");
  const sanitizeMoney = (v) => {
    let cleaned = v.replace(/[^0-9.]/g, "");
    const [intPart = "", decRest = ""] = cleaned.split(".");
    const dec = decRest.replace(/\./g, "").slice(0, 2);
    return decRest.length ? `${intPart}.${dec}` : intPart;
  };

  const toggleTier = () => set({
    ...state,
    tier: { ...state.tier, enabled: !state.tier.enabled }
  });

  return (
    <section className="rounded-[28px] bg-white p-5 sm:p-6 lg:p-7 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Crear Entradas</h3>

      {/* Moneda + botón crear entrada (morado) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
        <div className="sm:w-64">
          <FormField label="Moneda">
            <SelectInput
              value={state.currency}
              onChange={(v) => set({ ...state, currency: v })}
              options={[
                { value: "PEN", label: "Soles (PEN)" }
              ]}
              placeholder="Selecciona moneda"
            />
          </FormField>
        </div>
        <div className="flex-1" />
        <BotonCTA
          onClick={() => set({ ...state, items: [...state.items, { type: "", quantity: "", price: "" }] })}
          variant="primary"
        >
          + Crear entrada
        </BotonCTA>
      </div>

      {/* Líneas */}
      <CrearTicketLine
        items={state.items}
        setItems={(items) => set({ ...state, items })}
        currency={state.currency}
        sanitizeInt={sanitizeInt}
        sanitizeMoney={sanitizeMoney}
      />

      {/* Opciones */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField label="¿Hasta cuándo se venden las entradas?">
          <SelectInput
            value={state.endSaleWhen}
            onChange={(v) => set({ ...state, endSaleWhen: v })}
            options={[
              { value: "termino", label: "Hasta que termine el evento" },
              { value: "2dias", label: "2 días antes del evento" },
              { value: "inicio", label: "Hasta el inicio del evento" },
            ]}
          />
        </FormField>

        <FormField label="Entradas máximas por usuario">
          <SelectInput
            value={state.maxPerUser}
            onChange={(v) => set({ ...state, maxPerUser: v })}
            options={[
              { value: "10", label: "10" },
              { value: "20", label: "20" },
              { value: "30", label: "30" },
            ]}
          />
        </FormField>
      </div>

      {/* Toggle Venta escalonada: OFF borde morado, ON lleno morado */}
      <div className="mt-6">
        <button
          type="button"
          onClick={toggleTier}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors border
            ${state.tier.enabled
              ? "bg-purple-600 text-white border-purple-600 shadow"
              : "bg-white text-purple-700 border-purple-500 hover:bg-purple-50"}`}
        >
          Venta Escalonada
        </button>

        {state.tier.enabled && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FormField label="Habilitar cantidad">
              <TextInput
                placeholder="Ej. 50"
                value={state.tier.qty}
                onChange={(v) => set({ ...state, tier: { ...state.tier, qty: sanitizeInt(v) } })}
              />
            </FormField>

            <FormField label="Periodo">
              <SelectInput
                value={state.tier.period}
                onChange={(v) => set({ ...state, tier: { ...state.tier, period: v } })}
                options={[
                  { value: "diariamente", label: "Diariamente" },
                  { value: "semanalmente", label: "Semanalmente" },
                  { value: "mensualmente", label: "Mensualmente" },
                ]}
              />
            </FormField>
          </div>
        )}
      </div>
    </section>
  );
}
