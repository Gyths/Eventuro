import { useNavigate } from "react-router-dom";

import StepBadge from "../components/create/StepBadge";
import BotonCTA from "../components/BotonCTA";

import EventBasicsForm from "../components/create/EventBasicsForm";
import ImageRestrictionsPanel from "../components/create/ImageRestrictionsPanel";
import DatesSection from "../components/create/DatesSection";

import useEventForm from "../hooks/useEventForm";

export default function CrearEventoPaso1() {
  const navigate = useNavigate();

  // Estado del formulario (nombre, categoría, desc, extra, restric, imagen)
  const { form, updateForm, updateRestrictions, imagePreview } = useEventForm();

  return (
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10">
      <div className="relative mt-2 rounded-[28px] bg-gray-100 p-6 sm:p-7 lg:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        {/* Encabezado */}
        <div className="mb-3 sm:mb-4 lg:mb-6 flex items-center gap-3">
          <StepBadge number={1} />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Detalles del Evento
          </h1>
        </div>

        {/* GRID principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-10">
          {/* Columna izquierda: datos básicos */}
          <div className="lg:col-span-7">
            <EventBasicsForm form={form} onChange={updateForm} />
          </div>

          {/* Columna derecha: imagen + restricciones */}
          <div className="lg:col-span-5">
            <ImageRestrictionsPanel
              form={form}
              onChange={updateForm}
              restrictions={form.restrictions}
              onChangeRestrictions={updateRestrictions}
              imagePreview={imagePreview}
            />
          </div>
        </div>

        {/* Fechas */}
        <div className="mt-6 border-t border-gray-200 pt-5">
          <DatesSection />
        </div>

        {/* CTA inferior */}
        <div className="mt-8 flex justify-center">
          <BotonCTA variant="pink" onClick={() => navigate("/crear/paso2")}>
            Siguiente
          </BotonCTA>
        </div>
      </div>
    </section>
  );
}
