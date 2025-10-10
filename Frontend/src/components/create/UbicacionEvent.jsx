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

  // sync cuando el padre cambie
  useEffect(() => {
    if (controlled) setLocal(value);
  }, [controlled, value]);

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
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ubicación</h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-8">
        <div className="lg:col-span-7 space-y-6">
          <FormField label="Ciudad*">
            <SelectInput
              value={local.city}
              onChange={(v) => update({ city: v })}
              options={[
                { value: "", label: "Elije una Ciudad para el evento", disabled: true },
                { value: "Cusco", label: "Cusco" },
                { value: "Lima", label: "Lima" },
                { value: "Arequipa", label: "Arequipa" },
              ]}
              placeholder="Elije una Ciudad para el evento"
            />
          </FormField>

          <FormField label="Dirección*" hint="Ej. Av. Principal 123, Piso 4">
            <TextInput
              value={local.address}
              onChange={(v) => update({ address: v })}
              placeholder="Ingresa la dirección exacta"
            />
          </FormField>

          <FormField label="Referencia" hint="Ej. Frente a la gasolinera del centro">
            <TextInput
              value={local.reference}
              onChange={(v) => update({ reference: v })}
              placeholder="Punto de referencia"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField label="¿Cómo encontrarnos?" hint="Ej. Stand N° 325">
              <TextInput
                value={local.howToFind}
                onChange={(v) => update({ howToFind: v })}
                placeholder="Detalle dentro del recinto"
            />
            </FormField>

            <FormField label="Aforo*" hint="Ej. 500">
              <TextInput
                value={local.capacity}
                onChange={(v) => update({ capacity: normalizeIntNoLeadingZeros(v) })}
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
    </section>
  );
}
