import { useState, useEffect } from "react";
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
import AddDateModal from "../components/create/AddDateModal";

export default function CrearEventoPaso1() {
  // navegación
  const navigate = useNavigate();
  // ----- STATE -----
  // modal de agregar fechas
  const [addOpen, setAddOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "clone"
  const [clonePreset, setClonePreset] = useState([]); // [{start,end}] // para preset de clonación
  const [editTargetId, setEditTargetId] = useState(null); // para edición de fecha
  // formulario principal
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

  // preview de imagen
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    if (form.imageFile) {
      const url = URL.createObjectURL(form.imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreview(null);
  }, [form.imageFile]);

  // fechas con horarios
  // [{id, date: Date, schedules: [{id, start:"HH:MM", end:"HH:MM"}]}]
  const [dates, setDates] = useState([]);

  // actualizar campos simples
  const updateForm = (patch) => setForm((f) => ({ ...f, ...patch }));

  // actualizar restricciones anidadas
  const updateRestrictions = (patch) =>
    setForm((f) => ({ ...f, restrictions: { ...f.restrictions, ...patch } }));
  
  const sameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

  // agregar múltiples fechas (desde modal)
  const handleBulkAddDates = ({ dates: pickedDates, schedules }) => {
    // Schedules llega como [{start:"HH:MM", end:"HH:MM"}]
    setDates((current) => {
      const next = [...current];
      for (const d of pickedDates) {
        const idx = next.findIndex(x => sameDay(x.date, d));
        const schedsWithIds = schedules.map(s => ({ id: crypto.randomUUID(), ...s }));
        if (idx >= 0) {
          // Si ya existe la fecha, mergear horarios al final
          next[idx] = {
            ...next[idx],
            schedules: [...next[idx].schedules, ...schedsWithIds],
          };
        } else {
          next.push({
            id: crypto.randomUUID(),
            date: new Date(d),
            schedules: schedsWithIds,
          });
        }
      }
      // ordenar por fecha asc
      next.sort((a,b)=> a.date - b.date);
      return next;
    });
  };

  // confirmar modal (add / clone / edit)
  const handleModalConfirm = ({ dates: pickedDates, schedules }) => {
    if (modalMode === "edit" && editTargetId) {
      const newDate = pickedDates[0]; // una sola
      setDates(ds =>
        ds
          .map(d => (d.id === editTargetId ? { ...d, date: new Date(newDate) } : d))
          .sort((a,b) => a.date - b.date)
      );
      setEditTargetId(null);
      return;
    }
    // add / clone
    handleBulkAddDates({ dates: pickedDates, schedules });
  };

  // eliminar fecha
  const handleRemoveDate = (id) => setDates((ds) => ds.filter((d) => d.id !== id));
  
  // actualizar fecha
  const handleUpdateDate = (id, patch) =>
    setDates((ds) => ds.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  // agregar horario a fecha
  const handleAddSchedule = (dateId) =>
    setDates((ds) =>
      ds.map((d) =>
      d.id === dateId
        ? {
            ...d,
            schedules: [
              ...d.schedules,
              { id: crypto.randomUUID(), start: "", end: "" },
            ],
          }
        : d
    )
  );

  // actualizar horario
  const handleUpdateSchedule = (dateId, schedId, patch) =>
    setDates((ds) =>
      ds.map((d) =>
        d.id === dateId
          ? {
              ...d,
              schedules: d.schedules.map((s) =>
                s.id === schedId ? { ...s, ...patch } : s
              ),
            }
          : d
      )
  );

  // eliminar horario
  const handleDeleteSchedule = (dateId, schedId) =>
  setDates((ds) =>
    ds.map((d) =>
      d.id === dateId
        ? { ...d, schedules: d.schedules.filter((s) => s.id !== schedId) }
        : d
    )
  );

  // abrir modal en modo add
  function openAddDatesModal() {
    setModalMode("add");
    setClonePreset([]);
    setClonePreset([]);
    setEditTargetId(null);
    setAddOpen(true);
  }

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
                onClick={openAddDatesModal}
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
            {dates.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-7 text-center">
                <p className="text-sm text-gray-600">
                  No hay fechas asignadas a este evento. Agrega una o más fechas y horarios.
                </p>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={openAddDatesModal}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                    title="Agregar fecha"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/></svg>
                    Agregar fecha
                  </button>
                </div>
              </div>
            ) : (
              dates.map((d) => (
                <DateCard
                  key={d.id}
                  date={d.date}
                  schedules={d.schedules}
                  cloneDisabled={d.schedules.length === 0}
                  onChangeDate={(newDate) => handleUpdateDate(d.id, { date: newDate })}
                  onRequestEditDate={() => {
                    setModalMode("edit");
                    setEditTargetId(d.id);
                    setAddOpen(true);
                  }}
                  onAddSchedule={() => handleAddSchedule(d.id)}
                  onUpdateSchedule={(schedId, patch) => handleUpdateSchedule(d.id, schedId, patch)}
                  onDeleteSchedule={(schedId) => handleDeleteSchedule(d.id, schedId)}
                  onRemove={() => handleRemoveDate(d.id)}
                  onClone={() => {
                    if (d.schedules.length === 0) return;
                    setModalMode("clone");
                    setClonePreset(d.schedules.map(({start,end}) => ({start, end})));
                    setAddOpen(true);
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* CTA inferior */}
        <div className="mt-8 flex justify-center">
          <BotonCTA variant="pink" onClick={()=>navigate("/CrearEventoPaso2")}>Siguiente</BotonCTA>
        </div>
      </div>
      <AddDateModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onConfirm={handleModalConfirm}
        disabledDates={dates.map(d => d.date)}  // incluye también la fecha actual
        mode={modalMode}
        presetSchedules={clonePreset}
      />
    </section>
  );
}