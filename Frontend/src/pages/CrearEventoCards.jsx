import { useMemo, useRef, useState } from "react";

import StepBadge from "../components/create/StepBadge";
import EventBasicsForm from "../components/create/EventBasicsForm";
import ImageRestrictionsPanel from "../components/create/ImageRestrictionsPanel";
import DatesSection from "../components/create/DatesSection";
import useEventForm from "../hooks/useEventForm";

// Paso 2
import UbicacionEvento from "../components/UbicacionEvento";
import CrearTicketCard from "../components/create/CrearTicketCard";
import CrearTicketLine from "../components/create/CrearTicketLine";
import UbicacionEvent from "../components/create/UbicacionEvent";

//Paso 3
import ReturnsPolicy from "../components/create/ReturnsPolicy";

//Paso 4
import ResumenEvento from "../components/create/ResumenEvento";

// Componentes comunes
import BotonCTA from "../components/BotonCTA";
import { DiscountCodeCard } from "../components/create/DiscountCodeCard";
import DiscountCodesSection from "../components/create/DiscountCodesSection";

function WizardCard({ title, subtitle, badge, children }) {
  return (
    <div className="relative rounded-[28px] bg-gray-100 p-6 sm:p-7 lg:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="mb-3 sm:mb-4 lg:mb-6 flex items-center gap-3">
        {badge}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}


function StepProgress({ steps, current }) {
  const pct = useMemo(
    () => ((current + 1) / steps.length) * 100,
    [current, steps.length]
  );
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-700">
          Paso <span className="font-semibold">{current + 1}</span> de{" "}
          {steps.length}
        </div>
        <div className="text-xs text-gray-500">{Math.round(pct)}%</div>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full bg-pink-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function WizardControls({ current, total, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onPrev}
        disabled={current === 0}
        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Anterior
      </button>

      <button
        type="button"
        onClick={onNext}
        className="rounded-full border border-pink-300 bg-pink-500/90 text-white px-5 py-2 text-sm shadow hover:bg-pink-500"
      >
        {current === total - 1 ? "Finalizar" : "Siguiente"}
      </button>
    </div>
  );
}

// --- PÁGINA PRINCIPAL (KEEP-MOUNTED) ---
export default function CrearEventoCards() {
  const steps = [
    "Detalles",
    "Ubicación/Tickets",
    "Políticas & Descuentos",
    "Resumen",
  ];
  const [current, setCurrent] = useState(0);
  const cardRefs = useRef([]);

  const scrollToCurrentCardTop = () => {
    const el = cardRefs.current[current];
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // Fallback: scroll a tope de página
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };



  // Paso 1
  const { form, updateForm, updateRestrictions, imagePreview } = useEventForm();
  const [dates, setDates] = useState([]); // [{id, date: Date|ISO, schedules:[{id,start,end}]}]
  const handlePrev = () => setCurrent((c) => Math.max(0, c - 1));
  const isActive = (i) => current === i;
  // Paso 2 — Ubicación (estado en el padre)
  const [location, setLocation] = useState({
    city: "",
    address: "",
    reference: "",
    howToFind: "",
    capacity: "",
  });

  // Paso 3 — Tickets (estado en el padre)
  const [tickets, setTickets] = useState({
    currency: "PEN",
    items: [{ type: "", quantity: "", price: "" }],
    endSaleWhen: "termino", // "termino" | "inicio" | "2dias"
    maxPerUser: "10",
    tier: { enabled: false, qty: "", period: "diariamente" }, // toggle
  });

  // Paso 4 — Política de devoluciones (estado en el padre)
  const [returnsPolicy, setReturnsPolicy] = useState({ text: "", file: null });
  const [errors, setErrors] = useState({});

  //Validaciones
  const validateStep = (stepIndex) => {
    const newErrors = {};

    if (stepIndex === 0) {
      const name = (form.name ?? "").trim(); // <-- usar form.name
      if (!name) {
        newErrors.name = "El nombre del evento es obligatorio.";
      } else if (name.length > 30) {
        newErrors.name = "El nombre no puede tener más de 30 caracteres.";
      } else if (name.length < 5) {
        newErrors.name = "El nombre es muy corto.";
      }
      const description = (form.description ?? "").trim();
      if (!description) {
        newErrors.description = "La descripción es obligatoria.";
      } else if (description.length > 300) {
        newErrors.description =
          "La descripción no puede tener más de 300 caracteres.";
      }
      if (!form.imageFile)
        newErrors.image = "Debes subir una imagen para el evento.";

      if (!form.category) newErrors.category = "Selecciona una categoría.";

      // Ajusta a cómo subes la imagen en tu hook: imageFile / image / imagePreview
      if (!form.imageFile && !imagePreview) {
        newErrors.image = "Debes subir una imagen para el evento.";
      }

      const restrictionsCount = Array.isArray(form.restrictions)
        ? form.restrictions.length
        : Object.values(form.restrictions || {}).filter(Boolean).length;

      if (restrictionsCount === 0) {
        newErrors.restrictions = "Selecciona al menos una restricción.";
      }
      if (dates.length === 0) {
        newErrors.dates = "Agrega al menos una fecha para el evento.";
      } else {
        const isHHMM = (t) => /^\d{2}:\d{2}$/.test(t);

        // Recorre cada fecha
        const invalidDate = dates.some((d) => {
          const scheds = Array.isArray(d.schedules) ? d.schedules : [];
          if (scheds.length === 0) return true;

          return scheds.some((s) => {
            const startOk = isHHMM(s.start || "");
            const endOk = isHHMM(s.end || "");
            return !startOk || !endOk;
          });
        });

        if (invalidDate) {
          newErrors.dates = "Cada fecha debe tener al menos un horario válido.";
        }
      }
    }

    if (stepIndex === 1) {
      if (!location.city) {
        newErrors.city = "La ciudad es obligatoria.";
      }
      if (!location.address || location.address.trim() === "") {
        newErrors.address = "La dirección es obligatoria.";
      } else if (location.address.length < 5) {
        newErrors.address = "La dirección es muy corta.";
      } else if (location.address.length > 150) {
        newErrors.address =
          "La dirección no puede tener más de 150 caracteres.";
      }
      if (
        Number(location.capacity) > 200000 ||
        Number(location.capacity) <= 0
      ) {
        newErrors.capacity =
          "La capacidad debe ser un número válido (entre 0 y 200,000).";
      }
      if (!tickets.items || tickets.items.length === 0) {
        newErrors.tickets = "Debe crear al menos un tipo de entrada.";
      } else if (
        tickets.items.some((t) => !t.type || !t.price || !t.quantity)
      ) {
        newErrors.tickets = "Completa todos los campos de cada entrada.";
      } else if (
        tickets.items.some((t) => isNaN(t.quantity) || t.quantity == 0)
      ) {
        newErrors.tickets = "Cantidad de entradas inválida.";
      }

      if (tickets?.tier?.enabled) {
        const tierQty = Number(tickets.tier.qty || 0);

        // Calcular cantidad total de todas las entradas
        const totalTickets = (tickets.items || []).reduce((sum, it) => {
          const q = Number(it.quantity || 0);
          return sum + (isNaN(q) ? 0 : q);
        }, 0);

        if (!Number.isInteger(tierQty) || tierQty <= 0) {
          newErrors.tierQty =
            "La cantidad habilitada para la venta escalonada debe ser un número entero mayor que 0.";
        } else if (tierQty > totalTickets) {
          newErrors.tierQty = `La cantidad habilitada para la venta escalonada (${tierQty}) debe ser menor que la cantidad total (${totalTickets}).`;
        }
      }
    }

    if (stepIndex === 2) {
      const txt = (returnsPolicy?.text ?? "").trim();
      if (!txt && !returnsPolicy?.file) {
        newErrors.returnsPolicy =
          "Debe escribir o subir una política de devoluciones.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const ok = validateStep(current);
    if (ok) {
      setCurrent((c) => Math.min(steps.length - 1, c + 1));
    } else {
      scrollToCurrentCardTop();
    }
  };

  return (
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-4 space-y-6">
      <StepProgress steps={steps} current={current} />

      {/* PASO 1 */}
      <div ref={el => (cardRefs.current[0] = el)} className={isActive(0) ? "block" : "hidden"} aria-hidden={!isActive(0)}>
        <WizardCard
          title="Detalles del Evento"
          subtitle="Nombre, categoría, descripción, imagen y restricciones"
          badge={<StepBadge number={1} />}
        >
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 rounded-lg bg-red-100 text-red-800 p-3 text-sm">
              {Object.values(errors).map((err, i) => (
                <div key={i}>• {err}</div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-10">
            <div className="lg:col-span-7">
              <EventBasicsForm form={form} onChange={updateForm} />
            </div>
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

          <div className="mt-6 border-t border-gray-200 pt-5">
            <DatesSection value={dates} onChange={setDates} />
          </div>
        </WizardCard>
      </div>

      {/* PASO 2 */}
      <div ref={el => (cardRefs.current[1] = el)} className={isActive(1) ? "block" : "hidden"} aria-hidden={!isActive(1)}>
        <WizardCard
          title="Ubicación y Tickets"
          subtitle="Configura la sede del evento y los tipos de entrada"
          badge={<StepBadge number={2} />}
        >
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 rounded-lg bg-red-100 text-red-800 p-3 text-sm">
              {Object.values(errors).map((err, i) => (
                <div key={i}>• {err}</div>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-6 p-2 sm:p-0">
            <UbicacionEvent
              value={location}
              onChange={(patch) =>
                setLocation((prev) => ({ ...prev, ...patch }))
              }
            />
            <CrearTicketCard value={tickets} onChange={setTickets} />
          </div>
        </WizardCard>
      </div>

      {/* ======== PASO 3 ======== */}
      <div ref={el => (cardRefs.current[2] = el)} className={isActive(2) ? "block" : "hidden"} aria-hidden={!isActive(2)}>
        <WizardCard
          title="Política de devoluciones Y Códigos de descuento"
          subtitle="Define tus reglas de reembolso y promociones"
          badge={<StepBadge number={3} />}
        >
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 rounded-lg bg-red-100 text-red-800 p-3 text-sm">
              {Object.values(errors).map((err, i) => (
                <div key={i}>• {err}</div>
              ))}
            </div>
          )}
          <div className="space-y-8">
            <DiscountCodesSection />
            <ReturnsPolicy value={returnsPolicy} onChange={setReturnsPolicy} />
          </div>
        </WizardCard>
      </div>

      <div ref={el => (cardRefs.current[3] = el)} className={isActive(3) ? "block" : "hidden"} aria-hidden={!isActive(3)}>
        <WizardCard
          title="Resumen del evento"
          subtitle="Revisa antes de publicar"
          badge={<StepBadge number={4} />}
        >
          <ResumenEvento
            basics={form}
            dates={dates}
            imagePreview={imagePreview}
            tickets={tickets}
            returnsPolicy={returnsPolicy}
            location={location}
          />
          <div className="mt-6 flex justify-center">
            <BotonCTA variant="pink">Publicar Evento</BotonCTA>
          </div>
        </WizardCard>
      </div>

      <div className="sticky bottom-3 z-10">
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-3 sm:p-4 shadow-lg">
          <WizardControls
            current={current}
            total={steps.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </div>
      </div>
    </section>
  );
}
