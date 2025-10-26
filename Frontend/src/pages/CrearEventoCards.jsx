import { useMemo, useRef, useState } from "react";

import StepBadge from "../components/create/StepBadge";
import EventBasicsForm from "../components/create/EventBasicsForm";
import ImageRestrictionsPanel from "../components/create/ImageRestrictionsPanel";
import DatesSection from "../components/create/DatesSection";
import useEventForm from "../hooks/useEventForm";
import SalesSeasonCard from "../components/create/SalesSeasonCard";

// Paso 2
import CrearTicketCard from "../components/create/CrearTicketCard";
import UbicacionEvent from "../components/create/UbicacionEvent";

//Paso 3
import ReturnsPolicy from "../components/create/ReturnsPolicy";

//Paso 4
import ResumenEvento from "../components/create/ResumenEvento";

// Componentes comunes
import BotonCTA from "../components/BotonCTA";
import DiscountCodesSection from "../components/create/DiscountCodesSection";
import Swal from "sweetalert2";
import { BASE_URL } from "../config.js";

//Copiar Configuracion
import CopyConfigModal from "../components/create/CopyConfigModal";

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
      {/* Botón Anterior */}
      <button
        type="button"
        onClick={onPrev}
        disabled={current === 0}
        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Anterior
      </button>

      {/* Botón Siguiente (solo si no es el último paso) */}
      {current < total - 1 && (
        <button
          type="button"
          onClick={onNext}
          className="rounded-full border border-pink-300 bg-pink-500/90 text-white px-5 py-2 text-sm shadow hover:bg-pink-500"
        >
          Siguiente
        </button>
      )}
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
  const { form, updateForm, updateRestrictions, imagePreview, bannerPreview } = useEventForm();
  const [dates, setDates] = useState([]); // [{id, date: Date|ISO, schedules:[{id,start,end}]}]
  const handlePrev = () => setCurrent((c) => Math.max(0, c - 1));
  const isActive = (i) => current === i;
  const user = JSON.parse(localStorage.getItem("userData"));

  // Paso 2 — Ubicación (estado en el padre)
  const [location, setLocation] = useState({
    inPerson: null,
    city: "",
    address: "",
    reference: "",
    howToFind: "",
    capacity: "",
  });

  // Paso 3 — Tickets (estado en el padre)
  const [tickets, setTickets] = useState({
    currency: "PEN",
    zones: [
      // Changed from 'items' to 'zones'
      {
        zoneName: "",
        quantity: "",
        price: "",
        subtypes: [{ type: "", discount: "" }],
      },
    ],
    endSaleWhen: "termino", // "termino" | "inicio" | "2dias"
    maxPerUser: "10",
    tier: { enabled: false, qty: "", period: "diariamente" }, // toggle
  });

  const resetWizard = () => {
    // Ir al paso 1
    setCurrent(0);

    // Limpiar fechas
    setDates([]);

    // Limpiar ubicación
    setLocation({
      city: "",
      address: "",
      reference: "",
      howToFind: "",
      capacity: "",
    });

    // Limpiar tickets
    setTickets({
      currency: "PEN",
      zones: [
        {
          zoneName: "",
          quantity: "",
          price: "",
          subtypes: [{ type: "", discount: "" }],
        },
      ],
      endSaleWhen: "termino",
      maxPerUser: "10",
      tier: { enabled: false, qty: "", period: "diariamente" },
    });

    // Limpiar fases de venta
    setSalesSeasons({
      seasons: [{
        id: Date.now(),
        name: "", 
        percentage: "10",
        isIncrease: false,
        startDate: "",
        endDate: ""
      }]
    });

    // Limpiar política de devoluciones
    setReturnsPolicy({ text: "", file: null });

    // Limpiar errores
    setErrors({});

    // Limpiar básicos del formulario (usa tu hook)
    updateForm({
      name: "",
      description: "",
      categories: [],
      extraInfo: "",
      imageFile: null,
      bannerFile: null,
      restrictions: [],
    });
    updateRestrictions([]); // según tu hook; si usa objeto, pásale {}.
  };

  //###### GENERADOR DEL JSON PARA POST A LA BD ##########
  const generateAndPostJson = async () => {
    try {
      setPosting(true);

      // ====== construir el JSON (tu mismo código adaptado) ======
      const toYMD = (d) => {
        if (!d) return "";
        if (typeof d === "string") return d.slice(0, 10);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      };

      const to24h = (raw) => {
        if (!raw) return "00:00";
        const s = String(raw).trim();
        const m24 = s.match(/^(\d{2}):(\d{2})$/);
        if (m24) return `${m24[1]}:${m24[2]}`;
        const m12 = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (m12) {
          let hh = parseInt(m12[1], 10);
          const mm = m12[2];
          const ap = m12[3].toUpperCase();
          if (ap === "AM") {
            if (hh === 12) hh = 0;
          } else {
            if (hh !== 12) hh += 12;
          }
          return `${String(hh).padStart(2, "0")}:${mm}`;
        }
        return "00:00";
      };

      const toMin = (hhmm) => {
        const [h, m] = hhmm.split(":").map(Number);
        return h * 60 + m;
      };

      const addDaysYMD = (ymd, days = 1) => {
        const [y, m, d] = ymd.split("-").map(Number);
        const dt = new Date(Date.UTC(y, m - 1, d));
        dt.setUTCDate(dt.getUTCDate() + days);
        const yy = dt.getUTCFullYear();
        const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
        const dd = String(dt.getUTCDate()).padStart(2, "0");
        return `${yy}-${mm}-${dd}`;
      };

      // suma/resta minutos a "HH:mm" devolviendo {hhmm, dayShift}
      const shiftHHMM = (hhmm, deltaMin) => {
        const [h, m] = hhmm.split(":").map(Number);
        let total = h * 60 + m + deltaMin;
        let dayShift = 0;
        while (total < 0) {
          total += 1440;
          dayShift -= 1;
        }
        while (total >= 1440) {
          total -= 1440;
          dayShift += 1;
        }
        const hh = String(Math.floor(total / 60)).padStart(2, "0");
        const mm = String(total % 60).padStart(2, "0");
        return { hhmm: `${hh}:${mm}`, dayShift };
      };

      // ---- CONSTRUCCIÓN (pre-compensación de -05:00 y rollover local) ----
      const LIMA_OFFSET_MIN = 5 * 60; // America/Lima = UTC-05:00

      const eventDates = dates.flatMap((date) =>
        (date.schedules || []).map((s) => {
          // 1) Hora local (según usuario)
          const ymdLocal = toYMD(date.date);
          const startLocal = to24h(s.start);
          const endLocal = to24h(s.end);

          // 2) Rollover local: si start >= end, end es día siguiente (local)
          const endYMDLocal =
            toMin(endLocal) <= toMin(startLocal)
              ? addDaysYMD(ymdLocal, 1)
              : ymdLocal;

          // 3) PRE-COMPENSAR: restamos 5h a ambas horas y ajustamos día si cruza medianoche
          const sShift = shiftHHMM(startLocal, -LIMA_OFFSET_MIN); // -300 min
          const eShift = shiftHHMM(endLocal, -LIMA_OFFSET_MIN);

          const ymdStartShift =
            sShift.dayShift !== 0
              ? addDaysYMD(ymdLocal, sShift.dayShift)
              : ymdLocal;
          const ymdEndShift =
            eShift.dayShift !== 0
              ? addDaysYMD(endYMDLocal, eShift.dayShift)
              : endYMDLocal;

          // 4) Enviamos con offset -05:00; el backend al convertir a UTC “deshará” nuestra pre-compensación
          return {
            startAt: `${ymdStartShift}T${sShift.hhmm}:00-05:00`,
            endAt: `${ymdEndShift}T${eShift.hhmm}:00-05:00`,
          };
        })
      );

      const eventZones = (tickets.zones || []).map((zone) => {
        const allocations = (zone.subtypes || []).map((subtype) => ({
          audienceName: subtype.type || "Entrada General",
          discountPercent: Number(subtype.discount) || 0,
          allocatedQuantity: Number(zone.quantity) || 0,
        }));
        return {
          name: zone.zoneName || "Zona sin nombre",
          kind: "GENERAL", // Prensencial o virtual
          currency: tickets.currency,
          basePrice: Number(zone.price) || 0,
          capacity: Number(zone.quantity) || 0,
          cols: 0,
          rows: 0,
          allocations,
        };
      });

      const salePhases = (salesSeasons.seasons || [])
        .filter(season => season.name && season.startDate && season.endDate) // Solo incluir temporadas completas
        .map(season => {
          // Convertir porcentaje a número con signo según isIncrease
          const percentage = season.isIncrease 
            ? Number(season.percentage) || 0 
            : -(Number(season.percentage) || 0);
          
          // Convertir fechas YYYY-MM-DD a ISO string válido para Date
          const startDateISO = `${season.startDate}T00:00:00.000Z`;
          const endDateISO = `${season.endDate}T23:59:59.999Z`;
          
          return {
            name: season.name,
            startAt: startDateISO,  
            endAt: endDateISO, 
            percentage: percentage
          };
      });

      const finalJson = {
        organizerId: user?.userId,
        title: form.name,
        inPerson: true,
        description: form.description,
        accessPolicy: "E",
        accessPolicyDescription: form.extraInfo,
        venue: {
          city: location.city,
          address: location.address,
          addressUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          reference: location.reference,
          capacity: Number(location.capacity),
        },
        eventCategories: Array.isArray(form.categories)? form.categories.map((id) => Number(id)): [],
        salePhases: salePhases,
        dates: eventDates,
        zones: eventZones,
      };

      const res = await fetch(`${BASE_URL}/eventuro/api/event/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(finalJson),
      });

      const raw = await res.text();
      let payload = null;
      try {
        payload = raw ? JSON.parse(raw) : null;
      } catch {
        payload = raw;
      }

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "¡Evento publicado!",
          text: "Tu evento se creó correctamente.",
          confirmButtonText: "Aceptar",
        });
        // Al cerrar el modal de éxito, reseteamos el formulario/wizard:
        resetWizard();
        return;
      }

      const backendMessage =
        (payload && (payload.message || payload.error)) ||
        (Array.isArray(payload?.errors) ? payload.errors.join("\n") : null) ||
        (typeof payload === "string" ? payload : null) ||
        `Código HTTP: ${res.status}`;

      await Swal.fire({
        icon: "error",
        title: "Error al publicar",
        text: backendMessage,
        confirmButtonText: "Entendido",
      });
    } catch (err) {
      await Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: err?.message || String(err),
        confirmButtonText: "Cerrar",
      });
    } finally {
      setPosting(false);
    }
  };

  // Paso 4 — Política de devoluciones (estado en el padre)
  const [returnsPolicy, setReturnsPolicy] = useState({ text: "", file: null });
  const [errors, setErrors] = useState({});

  const [salesSeasons, setSalesSeasons] = useState({
    seasons: [
      { 
        id: Date.now(),
        name: "", 
        percentage: "10",
        isIncrease: false,
        startDate: "",
        endDate: ""
      }
    ]
  });

  const [showCopyModal, setShowCopyModal] = useState(false);
  // 3. Función para mapear los datos del evento copiado a los estados del wizard
  const handleCopyEvent = (eventData) => {
    // Mapear datos básicos
    updateForm({
      name: eventData.title,
      description: eventData.description,
      categories: eventData.categories,
      extraInfo: eventData.extraInfo,
      restrictions: eventData.restrictions,
      imageFile: null, // No copiamos archivos
    });

    // Mapear ubicación
    setLocation({
      inPerson: true,
      city: eventData.venue.city,
      address: eventData.venue.address,
      reference: eventData.venue.reference,
      howToFind: "",
      capacity: String(eventData.venue.capacity),
    });

    // Mapear fechas y horarios
    const mappedDates = eventData.dates.map((date, idx) => {
      const startDate = new Date(date.startAt);
      const endDate = new Date(date.endAt);
      
      // Formatear horas a HH:mm
      const formatTime = (d) => {
        const h = String(d.getHours()).padStart(2, "0");
        const m = String(d.getMinutes()).padStart(2, "0");
        return `${h}:${m}`;
      };

      return {
        id: Date.now() + idx,
        date: startDate,
        schedules: [{
          id: Date.now() + idx + 1000,
          start: formatTime(startDate),
          end: formatTime(endDate),
        }]
      };
    });
    setDates(mappedDates);

    // Mapear tickets/zonas
    const mappedZones = eventData.zones.map(zone => ({
      zoneName: zone.name,
      quantity: String(zone.capacity),
      price: String(zone.basePrice),
      subtypes: zone.allocations.map(alloc => ({
        type: alloc.audienceName,
        discount: String(alloc.discountPercent),
      })),
    }));

    setTickets(prev => ({
      ...prev,
      currency: eventData.zones[0]?.currency || "PEN",
      zones: mappedZones,
    }));

    // Mapear temporadas de venta
    if (eventData.salePhases && eventData.salePhases.length > 0) {
      const mappedSeasons = eventData.salePhases.map((phase, idx) => {
        const startDate = new Date(phase.startAt);
        const endDate = new Date(phase.endAt);
        
        // Formatear a YYYY-MM-DD
        const formatDate = (d) => {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${y}-${m}-${day}`;
        };

        return {
          id: Date.now() + idx,
          name: phase.name,
          percentage: String(Math.abs(phase.percentage)),
          isIncrease: phase.percentage > 0,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
        };
      });

      setSalesSeasons({ seasons: mappedSeasons });
    }

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: "success",
      title: "Configuración copiada",
      text: "Los datos del evento se han cargado correctamente.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

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

      const selectedCats = Array.isArray(form.categories)
        ? form.categories
        : [];
      if (selectedCats.length === 0) {
        newErrors.category = "Selecciona al menos una categoría.";
      }

      // Ajusta a cómo subes la imagen en tu hook: imageFile / image / imagePreview
      if (!form.imageFile && !imagePreview) {
        newErrors.image = "Debes subir una imagen para el evento.";
      }

      if (!form.bannerFile && !imagePreview) {
        newErrors.image = "Debes subir un banner para el evento.";
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
      const isVirtual = location.inPerson === false;
      if (!isVirtual) {
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
      }

      // === Validación de Tickets/Zonas ===
      const zones = tickets.zones || [];
      const allSubtypes = zones.flatMap((z) => z.subtypes || []);

      if (zones.length === 0) {
        newErrors.tickets = "Debe crear al menos una zona de entrada.";
      } else if (zones.some((z) => !z.zoneName || z.zoneName.trim() === "")) {
        newErrors.tickets = "Completa el nombre de todas las zonas.";
      } else if (
        zones.some(
          (z) =>
            z.subtypes.length === 0 ||
            z.subtypes.some((st) => !st.type || st.type.trim() === "")
        )
      ) {
        newErrors.tickets =
          "Debe crear al menos un tipo de entrada por zona y completar el tipo.";
      } else if (
        zones.some(
          (z) =>
            !z.quantity || isNaN(Number(z.quantity)) || Number(z.quantity) <= 0
        )
      ) {
        newErrors.tickets =
          "La cantidad por zona debe ser un número mayor que 0.";
      } else if (
        zones.some(
          (z) => !z.price || isNaN(Number(z.price)) || Number(z.price) <= 0
        )
      ) {
        newErrors.tickets =
          "El precio por zona debe ser un número mayor que 0.";
      }

      if (tickets?.tier?.enabled) {
        const tierQty = Number(tickets.tier.qty || 0);

        // Calcular cantidad total desde las ZONAS
        const totalTickets = (tickets.zones || []).reduce((sum, z) => {
          const q = Number(z.quantity || 0);
          return sum + (isNaN(q) ? 0 : q);
        }, 0);

        if (!Number.isInteger(tierQty) || tierQty <= 0) {
          newErrors.tierQty =
            "La cantidad habilitada para la venta escalonada debe ser un número mayor que 0.";
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

  const [posting, setPosting] = useState(false);

  return (
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-4 space-y-6">
      <StepProgress steps={steps} current={current} />

      {/* PASO 1 */}
      <div
        ref={(el) => (cardRefs.current[0] = el)}
        className={isActive(0) ? "block" : "hidden"}
        aria-hidden={!isActive(0)}
      >
        <WizardCard
          title="Detalles del Evento"
          subtitle="Nombre, categoría, descripción, imagen y restricciones"
          badge={<StepBadge number={1} />}
        >
          {/* Botón Copiar Configuración */}
          <div className="mb-4 lg:mb-0 lg:absolute lg:top-10 lg:right-10">
            <BotonCTA
              variant="secondary"
              onClick={() => setShowCopyModal(true)}
            >
              Copiar Configuración
            </BotonCTA>
          </div>
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
      <div
        ref={(el) => (cardRefs.current[1] = el)}
        className={isActive(1) ? "block" : "hidden"}
        aria-hidden={!isActive(1)}
      >
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
     <div
        ref={(el) => (cardRefs.current[2] = el)}
        className={isActive(2) ? "block" : "hidden"}
        aria-hidden={!isActive(2)}
      >
        <WizardCard
          title="Temporadas de venta, Descuentos y Devoluciones"
          subtitle="Define tus reglas de reembolso, promociones y precios por temporada"
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
            <SalesSeasonCard value={salesSeasons} onChange={setSalesSeasons} />
            <DiscountCodesSection />
            <ReturnsPolicy value={returnsPolicy} onChange={setReturnsPolicy} />
          </div>
        </WizardCard>
      </div>

      <div
        ref={(el) => (cardRefs.current[3] = el)}
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
            bannerPreview={bannerPreview}
            tickets={tickets}
            returnsPolicy={returnsPolicy}
            location={location}
          />
          <div className="mt-6 flex justify-center">
            <BotonCTA
              variant="pink"
              onClick={generateAndPostJson}
              disabled={posting}
            >
              {posting ? "Publicando..." : "Publicar Evento"}
            </BotonCTA>
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

      <CopyConfigModal
        isOpen={showCopyModal}
        onClose={() => setShowCopyModal(false)}
        onSelectEvent={handleCopyEvent}
        idOrganizer={user?.userId}
      />
    </section>
  );
}
