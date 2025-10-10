import { useMemo, useState } from "react";

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

  // Paso 1
  const { form, updateForm, updateRestrictions, imagePreview } = useEventForm();
  const [dates, setDates] = useState([]); // [{id, date: Date|ISO, schedules:[{id,start,end}]}]
  const handlePrev = () => setCurrent((c) => Math.max(0, c - 1));
  const handleNext = () => setCurrent((c) => Math.min(steps.length - 1, c + 1));
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

  //###### GENERADOR DEL JSON PARA POST A LA BD ##########
  const generateAndPostJson = () => {
    //Extraer fechas
    const eventDates = dates.flatMap(date => 
      date.schedules.map(schedule => ({
        startAt: schedule.start,
        endAt: schedule.end,
      }))
    );

    // 2. Mapeo de tickes a zones, los allocations son dummy, hay que reestructurar la tarjeta de creacion para que lo soporte
    const dummyAllocations = [
      { "audienceName": "General Discount", "discountPercent": 5, "allocatedQuantity": 100 }
    ];

    const eventZones = tickets.items.map((item) => ({
      name: item.name || "Ticket Zone", // Asumo que el ítem tiene un campo 'name'
      kind: item.type === 'SEATED' ? "SEATED" : "GENERAL",
      basePrice: Number(item.price),
      capacity: Number(item.quantity),
      currency: tickets.currency,
      // Placeholders, no estamos trabajando en asientos numerados aun
      cols: 0, 
      rows: 0,
      allocations: dummyAllocations, 
    }));

    // 3. Construir el objeto JSON final
    const finalJson = {
      // Campos básicos
      organizerId: 1, // Hardcoded, debe venir del contexto de usuario
      title: form.name,
      inPerson: true, // Aun no implementado
      description: form.description,
      // Asumiendo que 'form' contiene estos campos
      accessPolicy: "E", 
      accessPolicyDescription: form.extraInfo, 

      // Ubicación (venue)
      venue: {
        city: location.city,
        address: location.address,
        addressUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Extraer la url del mapa (google maps)
        reference: location.reference,
        capacity: Number(location.capacity),
      },
      // Categorías
      eventCategories: form.category, // Ordenar por pildoras las categorias

      //Fases de venta (No implementado, Falta la tarjeta) descomentar cuando se implemente
      //salePhases: dummySalePhases,

      // Fechas y horarios
      dates: eventDates,

      // Zonas/Tickets
      zones: eventZones,
    };

    //Prueba desde la consola del navegador del JSON
    console.log("JSON generado para POST a la BD:", finalJson);
    //LLamada a la api para POST, Va a fallar por las fechas si no estan en ISO
  };

  // Paso 4 — Política de devoluciones (estado en el padre)
  const [returnsPolicy, setReturnsPolicy] = useState({ text: "", file: null });

  return (
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-4 space-y-6">
      <StepProgress steps={steps} current={current} />

      {/* PASO 1 (siempre montado, solo oculto/visible) */}
      <div
        className={isActive(0) ? "block" : "hidden"}
        aria-hidden={!isActive(0)}
      >
        <WizardCard
          title="Detalles del Evento"
          subtitle="Nombre, categoría, descripción, imagen y restricciones"
          badge={<StepBadge number={1} />}
        >
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

      {/* PASO 2 (siempre montado) */}
      <div
        className={isActive(1) ? "block" : "hidden"}
        aria-hidden={!isActive(1)}
      >
        <WizardCard
          title="Ubicación y Tickets"
          subtitle="Configura la sede del evento y los tipos de entrada"
          badge={<StepBadge number={2} />}
        >
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
      <div
        className={isActive(2) ? "block" : "hidden"}
        aria-hidden={!isActive(2)}
      >
        <WizardCard
          title="Política de devoluciones Y Códigos de descuento"
          subtitle="Define tus reglas de reembolso y promociones"
          badge={<StepBadge number={3} />}
        >
          <div className="space-y-8">
            <DiscountCodesSection />
            <ReturnsPolicy
              value={returnsPolicy}
              onChange={setReturnsPolicy}
            />
          </div>
        </WizardCard>
      </div>

      <div
        className={isActive(3) ? "block" : "hidden"}
        aria-hidden={!isActive(3)}
      >
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
            <BotonCTA variant="pink" onClick={generateAndPostJson}>Publicar Evento</BotonCTA>
          </div>
        </WizardCard>
      </div>

      {/* Controles globales */}
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
