import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

export default function UbicacionEvent({ value, onChange }) {
  // si el padre pasa value → controlado; sino, local
  const controlled = !!value;
  const [local, setLocal] = useState(
    value ?? {
      city: "",
      address: "",
      reference: "",
      howToFind: "",
      capacity: "",
    }
  );

  const [esPresencial, setEsPresencial] = useState(
    typeof value?.inPerson === "boolean" ? value.inPerson : null
  );

  // sync cuando el padre cambie
  useEffect(() => {
    if (controlled) setLocal(value);
  }, [controlled, value]);

  useEffect(() => {
    if (typeof value?.inPerson === "boolean") {
      setEsPresencial(value.inPerson);
    }
  }, [value?.inPerson]);

  const update = (patch) => {
    const next = { ...local, ...patch };
    if (!controlled) setLocal(next);
    onChange?.(patch);
  };
  const normalizeIntNoLeadingZeros = (v) => {
    let s = String(v ?? "");
    s = s.replace(/\D/g, "");
    const noLeading = s.replace(/^0+/, "");
    return noLeading === "" && s !== "" ? "0" : noLeading;
  };

  return (
    <section className="rounded-[28px] bg-white p-5 sm:p-6 lg:p-7 shadow-sm border border-gray-200">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          ¿Su evento será presencial o virtual?
        </h3>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              setEsPresencial(true);
              onChange?.({ inPerson: true });
            }}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors border ${
              esPresencial === true
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "border border-pink-500 text-pink-500 hover:bg-pink-50"
            }`}
          >
            Presencial
          </button>

          <button
            type="button"
            onClick={() => {
              setEsPresencial(false);
              onChange?.({ inPerson: false });
            }}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors border ${
              esPresencial === false
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "border border-pink-500 text-pink-500 hover:bg-pink-50"
            }`}
          >
            Virtual
          </button>
        </div>
      </div>

      {esPresencial && (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Ubicación
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8">
            <div className="lg:col-span-7 space-y-6">
              <FormField label="Ciudad*">
                <SelectInput
                  value={local.city}
                  onChange={(v) => update({ city: v })}
                  options={[
                    {
                      value: "",
                      label: "Elije una Ciudad para el evento",
                      disabled: true,
                    },
                    { value: "Cusco", label: "Cusco" },
                    { value: "Lima", label: "Lima" },
                    { value: "Arequipa", label: "Arequipa" },
                  ]}
                  placeholder="Elije una Ciudad para el evento"
                />
              </FormField>

              <FormField
                label="Dirección*"
                hint="Ej. Av. Principal 123, Piso 4"
              >
                <TextInput
                  value={local.address}
                  onChange={(v) => update({ address: v })}
                  placeholder="Ingresa la dirección exacta"
                />
              </FormField>

              <FormField
                label="Referencia"
                hint="Ej. Frente a la gasolinera del centro"
              >
                <TextInput
                  value={local.reference}
                  onChange={(v) => update({ reference: v })}
                  placeholder="Punto de referencia"
                />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField label="Aforo*" hint="Ej. 500">
                  <TextInput
                    value={local.capacity}
                    onChange={(v) =>
                      update({ capacity: normalizeIntNoLeadingZeros(v) })
                    }
                    placeholder="Capacidad máxima del local"
                  />
                </FormField>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 h-64 sm:h-72 flex items-center justify-center text-gray-500 text-sm">
                Mapa se cargará aquí
              </div>
            </div>
          </div>
        </>
      )}

      {esPresencial === false && (
        <p className="text-center text-gray-600 mt-4">
          No se requiere ubicación física para eventos virtuales.
        </p>
      )}
    </section>
  );
}
