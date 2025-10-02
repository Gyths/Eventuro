import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PlusIcon,
} from "@heroicons/react/24/outline";

import StepBadge from "../components/create/StepBadge";
import FormField from "../components/create/FormField";
import TextInput from "../components/create/TextInput";
import SelectInput from "../components/create/SelectInput";
import TextArea from "../components/create/TextArea";
import ImageDropzone from "../components/create/ImageDropzone";
import Restrictions from "../components/create/Restrictions";
import DateCard from "../components/create/DateCard";
import BotonCTA from "../components/BotonCTA";

export default function CreateEvent() {
  const navigate = useNavigate();
  // ----- STATE -----
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    extraInfo: "",
    restrictions: {
      general: false,
      withAdult: false,
      adultsOnly: false,
    },
    imageFile: null,
  });

  const [dates, setDates] = useState([
    // item demo para que veas el estilo
    {
      id: crypto.randomUUID(),
      date: new Date(2025, 8, 17), // 17 septiembre 2025 (mes 0-based)
      times: [
        { id: crypto.randomUUID(), label: "Hora de inicio", value: "12:30" },
        { id: crypto.randomUUID(), label: "Hora de inicio", value: "13:32" },
      ],
    },
  ]);

  // ----- HELPERS -----
  const updateForm = (patch) => setForm((f) => ({ ...f, ...patch }));
  const updateRestrictions = (patch) =>
    setForm((f) => ({ ...f, restrictions: { ...f.restrictions, ...patch } }));
  const handleAddDate = () => {
    setDates((ds) => [
      ...ds,
      {
        id: crypto.randomUUID(),
        date: new Date(),
        times: [{ id: crypto.randomUUID(), label: "Hora de inicio", value: "" }],
      },
    ]);
  };
  const handleRemoveDate = (id) => setDates((ds) => ds.filter((d) => d.id !== id));
  const handleCloneDate = (id) =>
    setDates((ds) => {
      const src = ds.find((d) => d.id === id);
      if (!src) return ds;
      const cloned = {
        ...src,
        id: crypto.randomUUID(),
        times: src.times.map((t) => ({ ...t, id: crypto.randomUUID() })),
      };
      return [...ds, cloned];
    });
  const handleUpdateDate = (id, patch) =>
    setDates((ds) => ds.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  // ----- RENDER -----
  return (
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10">
      {/* CARD principal */}
      <div className="relative mt-2 rounded-[28px] bg-gray-100 p-6 sm:p-7 lg:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        {/* Step badge */}
        <div className="mb-3 sm:mb-4 lg:mb-6 flex items-center gap-3">
          <StepBadge number={1} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Detalles del Evento
          </h1>
        </div>

        {/* GRID: campos izquierda / derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-10">
          {/* Columna izquierda */}
          <div className="lg:col-span-7 space-y-6">
            <FormField label="Nombre del Evento*" hint="Recomendación: Ingrese un nombre llamativo y corto">
              <TextInput
                placeholder="Recomendación: Ingrese un nombre llamativo y corto"
                value={form.name}
                onChange={(v) => updateForm({ name: v })}
              />
            </FormField>

            <FormField label="Elige una Categoría">
              <SelectInput
                placeholder="Elige una Categoría para el evento"
                value={form.category}
                onChange={(v) => updateForm({ category: v })}
                options={[
                  { value: "", label: "Elige una Categoría para el evento", disabled: true },
                  { value: "música", label: "Música" },
                  { value: "teatro", label: "Teatro" },
                  { value: "conferencia", label: "Conferencia" },
                  { value: "deportes", label: "Deportes" },
                ]}
              />
            </FormField>

            <FormField label="Descripción del Evento*">
              <TextArea
                placeholder="Escribe un párrafo que describa sobre que trata tu evento."
                value={form.description}
                onChange={(v) => updateForm({ description: v })}
              />
            </FormField>

            <FormField label="Información adicional">
              <TextArea
                placeholder="Escribe un párrafo que describa sobre que trata tu evento."
                value={form.extraInfo}
                onChange={(v) => updateForm({ extraInfo: v })}
              />
            </FormField>
          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-5 space-y-6">
            <FormField label="Imagen * (836 px x 522 px)">
              <ImageDropzone
                file={form.imageFile}
                onFile={(file) => updateForm({ imageFile: file })}
                className="h-[320px] md:h-[360px]"
              />
            </FormField>

            <FormField label="Restricción *">
              <Restrictions
                value={form.restrictions}
                onChange={updateRestrictions}
              />
            </FormField>
          </div>
        </div>

        {/* Sección Fechas */}
        <div className="mt-6 border-t border-gray-200 pt-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-[17px] font-semibold text-gray-800">Fechas</h2>
              <button
                onClick={handleAddDate}
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white p-1.5 hover:bg-gray-50 active:bg-gray-100"
                aria-label="Agregar fecha"
                title="Agregar fecha"
              >
                <PlusIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {dates.map((d) => (
              <DateCard
                key={d.id}
                date={d.date}
                times={d.times}
                onChangeDate={(newDate) => handleUpdateDate(d.id, { date: newDate })}
                onChangeTimes={(newTimes) => handleUpdateDate(d.id, { times: newTimes })}
                onRemove={() => handleRemoveDate(d.id)}
                onClone={() => handleCloneDate(d.id)}
              />
            ))}
          </div>
        </div>

        {/* CTA inferior */}
        <div className="mt-8 flex justify-center">
          <BotonCTA variant="pink" onClick={()=>navigate("/CrearEventoPaso2")}>Siguiente</BotonCTA>
        </div>
      </div>
    </section>
  );
}