// src/pages/LibroReclamos.jsx
import { useMemo, useRef, useState } from "react";
import ClaimSuccessModal from "../components/ClaimSuccessModal.jsx";
import { EventuroApi } from "../api";
import toast from "react-hot-toast";

/* ======================= Constantes ======================= */
// itemType sigue existiendo para Prisma, pero no lo mostramos en UI
const ITEM_TYPES = [
  { value: "PRODUCT", label: "Producto" },
  { value: "SERVICE", label: "Servicio" },
];

// Enum COMPLAINT_TYPE (frontend)
const COMPLAINT_TYPES = [
  { value: "CLAIM", label: "Reclamo (por un bien o servicio)" },
  { value: "COMPLAINT", label: "Queja (sobre el trato o servicio)" },
];

// Enum COMPLAINT_TARGET (frontend)
const TARGET_TYPES = [
  { value: "PAGE", label: "Plataforma Eventuro" },
  { value: "ORGANIZER", label: "Organizador del evento" },
  { value: "EVENT", label: "Evento específico" },
  { value: "OTHERS", label: "Otros" },
];

/* ======================= Inputs reutilizables ======================= */
function Input({
  label,
  name,
  value,
  onChange,
  required,
  type = "text",
  className = "",
  placeholder,
  autoComplete,
  error,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-600 mb-1">
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full rounded-lg border px-3 py-2 ${className} ${
          error ? "border-rose-400" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  required,
  rows = 4,
  className = "",
  placeholder,
  error,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-600 mb-1">
        {label}
        {required && " *"}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 resize-y ${className} ${
          error ? "border-rose-400" : "border-gray-300"
        }`}
      />
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  required,
  options = [],
  className = "",
  error,
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-600 mb-1">
        {label}
        {required && " *"}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full rounded-lg border px-3 py-2 ${className} ${
          error ? "border-rose-400" : "border-gray-300"
        }`}
      >
        <option value="">Sin seleccionar</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );
}

/* ======================= UI helpers ======================= */
function StepBadge({ number }) {
  return (
    <div className="h-9 w-9 rounded-full bg-amber-400 text-white grid place-items-center font-bold shadow">
      {number}
    </div>
  );
}
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
        <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
function WizardControls({
  current,
  total,
  onPrev,
  onNext,
  onSubmit,
  submitting,
}) {
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

      {current < total - 1 ? (
        <button
          type="button"
          onClick={onNext}
          className="rounded-full border border-amber-300 bg-amber-400 text-white px-5 py-2 text-sm shadow hover:bg-amber-500"
        >
          Siguiente
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="rounded-full bg-amber-500 text-white px-5 py-2 text-sm shadow hover:bg-amber-600 disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar"}
        </button>
      )}
    </div>
  );
}

/* ======================= Estado inicial ======================= */
const initialCliente = {
  fullName: "",
  dni: "",
  phone: "",
  email: "",
  address: "",
};

const initialDetalle = {
  eventName: "",
  ticketNum: "",
  // itemType se usa solo para Prisma, no para la UI
  itemType: "SERVICE",
  target: "",
  itemDescription: "",
  amountClaimed: "",
  type: "",
  problemDescription: "",
  expectedSolution: "",
  evidencia: null,
  evidenciaType: null,
  evidenciaNombre: null,
};

/* ======================= Página principal ======================= */
export default function LibroReclamos() {
  const steps = [
    "Datos del consumidor",
    "Detalles del reclamo / queja",
    "Confirmación de envío",
  ];
  const [current, setCurrent] = useState(0);
  const cardRefs = useRef([]);

  const scrollToCurrentCardTop = () => {
    const el = cardRefs.current[current];
    if (el?.scrollIntoView)
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [cliente, setCliente] = useState(initialCliente);
  const [detalle, setDetalle] = useState(initialDetalle);

  /* ========= Archivo de evidencia ========= */
  const [errors, setErrors] = useState({});

  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setDetalle((d) => ({
        ...d,
        evidencia: null,
        evidenciaType: null,
        evidenciaNombre: null,
      }));
      return;
    }

    setDetalle((d) => ({
      ...d,
      evidencia: file,
      evidenciaType: file.type,
      evidenciaNombre: file.name,
    }));
  };

  /* ========= Validaciones ========= */
  const validateStep = (idx) => {
    const err = {};

    if (idx === 0) {
      // Reglas básicas
      if (!cliente.fullName.trim()) err.fullName = "Campo obligatorio";
      if (!cliente.dni.trim()) err.dni = "Campo obligatorio";
      if (!cliente.phone.trim()) err.phone = "Campo obligatorio";
      if (!cliente.email.trim()) err.email = "Campo obligatorio";
      if (!cliente.address.trim()) err.address = "Campo obligatorio";

      // Nombre completo: no puede contener números
      if (cliente.fullName && /\d/.test(cliente.fullName)) {
        err.fullName = "El nombre completo no debe contener números.";
      }

      // DNI: solo números
      if (cliente.dni && /[^0-9]/.test(cliente.dni)) {
        err.dni = "El DNI solo debe contener números.";
      }

      // Teléfono: solo números
      if (cliente.phone && /[^0-9]/.test(cliente.phone)) {
        err.phone = "El teléfono solo debe contener números.";
      }
    }

    if (idx === 1) {
      if (!detalle.eventName.trim()) err.eventName = "Campo obligatorio";
      if (!detalle.target)
        err.target = "Seleccione a quién va dirigido el reclamo";
      if (!detalle.type)
        err.type = "Seleccione un tipo de reclamo/queja";
      if (!detalle.itemDescription.trim())
        err.itemDescription = "Campo obligatorio";
      if (!detalle.amountClaimed.trim())
        err.amountClaimed = "Campo obligatorio";
      if (!detalle.problemDescription.trim())
        err.problemDescription = "Campo obligatorio";
      if (!detalle.expectedSolution.trim())
        err.expectedSolution = "Campo obligatorio";

      // Número de ticket: solo números (si se completó)
      if (detalle.ticketNum && /[^0-9]/.test(detalle.ticketNum)) {
        err.ticketNum = "El número de ticket solo debe contener números.";
      }
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    const ok = validateStep(current);
    if (ok) setCurrent((c) => Math.min(steps.length - 1, c + 1));
    else scrollToCurrentCardTop();
  };
  const handlePrev = () => setCurrent((c) => Math.max(0, 1 * 0));

  /* ========= Envío real al backend ========= */
  const [sending, setSending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async () => {
    const okStep0 = validateStep(0);
    const okStep1 = validateStep(1);
    if (!okStep0 || !okStep1) {
      setCurrent(0);
      scrollToCurrentCardTop();
      return;
    }

    try {
      setSending(true);

      // Obtener userId desde localStorage (session o userData)
      let userId = null;
      try {
        const sessionStr = localStorage.getItem("session");
        if (sessionStr) {
          const session = JSON.parse(sessionStr);
          userId = session?.user?.userId ?? session?.userId ?? null;
        }
        if (!userId) {
          const userDataStr = localStorage.getItem("userData");
          if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            userId = userData?.userId ?? userData?.user?.userId ?? null;
          }
        }
      } catch (e) {
        console.warn("No se pudo leer el userId de localStorage:", e);
      }

      const formData = new FormData();

      if (userId != null) {
        formData.append("userId", String(userId));
      }

      // Datos del consumidor
      formData.append("fullName", cliente.fullName.trim());
      formData.append("dni", cliente.dni.trim());
      formData.append("address", cliente.address.trim());
      formData.append("phone", cliente.phone.trim());
      formData.append("email", cliente.email.trim());

      // Detalle del reclamo / queja
      formData.append("eventName", (detalle.eventName || "").trim());
      if (detalle.ticketNum) {
        formData.append("ticketNum", detalle.ticketNum.toString());
      }

      // itemType se envía fijo (por si Prisma lo requiere)
      formData.append("itemType", detalle.itemType || "SERVICE");

      formData.append(
        "itemDescription",
        (detalle.itemDescription || "").trim()
      );
      formData.append(
        "amountClaimed",
        detalle.amountClaimed ? detalle.amountClaimed.toString() : "0"
      );
      formData.append("type", detalle.type); // CLAIM / COMPLAINT
      formData.append(
        "problemDescription",
        (detalle.problemDescription || "").trim()
      );
      formData.append(
        "expectedSolution",
        (detalle.expectedSolution || "").trim()
      );

      // target ahora viene del select
      formData.append("target", detalle.target); // PAGE / ORGANIZER / EVENT / OTHERS

      if (detalle.evidencia) {
        formData.append("evidence", detalle.evidencia);
      }

      await EventuroApi({
        endpoint: "/complaint/",
        method: "POST",
        data: formData,
      });

      toast.success("Tu reclamo/queja fue registrado correctamente.");
      setSuccessOpen(true);

      setCliente(initialCliente);
      setDetalle(initialDetalle);
      setErrors({});
      setCurrent(0);
    } catch (err) {
      console.error(err);
      toast.error(
        err.message || "Ocurrió un error al registrar tu reclamo."
      );
    } finally {
      setSending(false);
    }
  };

  /* ======================= Render ======================= */
  return (
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2">
        Libro de Reclamaciones Eventuro
      </h1>
      <StepProgress steps={steps} current={current} />

      {/* Paso 1 */}
      <div
        ref={(el) => (cardRefs.current[0] = el)}
        className={current === 0 ? "block" : "hidden"}
      >
        <WizardCard
          badge={<StepBadge number={1} />}
          title="Datos del consumidor"
          subtitle="*Campos marcados son obligatorios"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre completo"
              name="fullName"
              required
              value={cliente.fullName}
              onChange={(e) =>
                setCliente((c) => ({
                  ...c,
                  // eliminamos cualquier número que el usuario escriba
                  fullName: e.target.value.replace(/[0-9]/g, ""),
                }))
              }
              error={errors.fullName}
            />
            <Input
              label="DNI / Documento de identidad"
              name="dni"
              required
              value={cliente.dni}
              onChange={(e) =>
                setCliente((c) => ({
                  ...c,
                  // solo dígitos
                  dni: e.target.value.replace(/\D/g, ""),
                }))
              }
              error={errors.dni}
            />
            <Input
              label="Teléfono"
              name="phone"
              required
              value={cliente.phone}
              onChange={(e) =>
                setCliente((c) => ({
                  ...c,
                  phone: e.target.value.replace(/\D/g, ""),
                }))
              }
              error={errors.phone}
            />
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              required
              value={cliente.email}
              onChange={(e) =>
                setCliente((c) => ({ ...c, email: e.target.value }))
              }
              error={errors.email}
            />
            <div className="md:col-span-2">
              <Input
                label="Dirección"
                name="address"
                required
                value={cliente.address}
                onChange={(e) =>
                  setCliente((c) => ({ ...c, address: e.target.value }))
                }
                error={errors.address}
              />
            </div>
          </div>
        </WizardCard>
      </div>

      {/* Paso 2 */}
      <div
        ref={(el) => (cardRefs.current[1] = el)}
        className={current === 1 ? "block" : "hidden"}
      >
        <WizardCard
          badge={<StepBadge number={2} />}
          title="Detalles del reclamo / queja"
          subtitle="Completa los datos del bien/servicio y la situación presentada"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nombre del evento"
              name="eventName"
              required
              value={detalle.eventName}
              onChange={(e) =>
                setDetalle((d) => ({ ...d, eventName: e.target.value }))
              }
              error={errors.eventName}
            />
            <Input
              label="Número de ticket (opcional)"
              name="ticketNum"
              value={detalle.ticketNum}
              onChange={(e) =>
                setDetalle((d) => ({
                  ...d,
                  ticketNum: e.target.value.replace(/\D/g, ""),
                }))
              }
              error={errors.ticketNum}
            />

            {/* AHORA ESTE SELECT ES COMPLAINT_TARGET */}
            <Select
              label="¿A quién va dirigido el reclamo?"
              name="target"
              required
              options={TARGET_TYPES}
              value={detalle.target}
              onChange={(e) =>
                setDetalle((d) => ({ ...d, target: e.target.value }))
              }
              error={errors.target}
            />

            <Select
              label="Tipo de reclamo / queja"
              name="type"
              required
              options={COMPLAINT_TYPES}
              value={detalle.type}
              onChange={(e) =>
                setDetalle((d) => ({ ...d, type: e.target.value }))
              }
              error={errors.type}
            />

            <TextArea
              label="Descripción del bien o servicio"
              name="itemDescription"
              rows={3}
              required
              value={detalle.itemDescription}
              onChange={(e) =>
                setDetalle((d) => ({
                  ...d,
                  itemDescription: e.target.value,
                }))
              }
              error={errors.itemDescription}
            />
            <Input
              label="Monto reclamado (S/.)"
              name="amountClaimed"
              type="number"
              required
              value={detalle.amountClaimed}
              onChange={(e) =>
                setDetalle((d) => ({
                  ...d,
                  amountClaimed: e.target.value,
                }))
              }
              error={errors.amountClaimed}
            />
            <TextArea
              label="Descripción del problema"
              name="problemDescription"
              rows={5}
              required
              value={detalle.problemDescription}
              onChange={(e) =>
                setDetalle((d) => ({
                  ...d,
                  problemDescription: e.target.value,
                }))
              }
              error={errors.problemDescription}
            />
            <TextArea
              label="Detalle la solución que solicita"
              name="expectedSolution"
              rows={5}
              required
              value={detalle.expectedSolution}
              onChange={(e) =>
                setDetalle((d) => ({
                  ...d,
                  expectedSolution: e.target.value,
                }))
              }
              error={errors.expectedSolution}
            />
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">
                Evidencia adjunta (opcional)
              </label>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFile}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
              />
              {detalle.evidenciaNombre && (
                <p className="text-xs text-gray-500 mt-1">
                  Archivo: {detalle.evidenciaNombre}
                </p>
              )}
            </div>
          </div>
        </WizardCard>
      </div>

      {/* Paso 3 */}
      <div
        ref={(el) => (cardRefs.current[2] = el)}
        className={current === 2 ? "block" : "hidden"}
      >
        <WizardCard
          badge={<StepBadge number={3} />}
          title="Confirmación de envío"
          subtitle="Revisa la información antes de registrar tu reclamo / queja"
        >
          <div className="space-y-8 max-h-[70vh] overflow-auto pr-1">
            <section>
              <h4 className="text-lg font-semibold mb-3">
                Datos del consumidor
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <div>
                  <span className="text-gray-500">Nombre completo:</span>{" "}
                  {cliente.fullName || "—"}
                </div>
                <div>
                  <span className="text-gray-500">DNI:</span>{" "}
                  {cliente.dni || "—"}
                </div>
                <div>
                  <span className="text-gray-500">Correo:</span>{" "}
                  {cliente.email || "—"}
                </div>
                <div>
                  <span className="text-gray-500">Teléfono:</span>{" "}
                  {cliente.phone || "—"}
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-500">Dirección:</span>{" "}
                  {cliente.address || "—"}
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h4 className="text-lg font-semibold mb-3">
                Detalle del reclamo / queja
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <div>
                  <span className="text-gray-500">Evento:</span>{" "}
                  {detalle.eventName || "—"}
                </div>
                <div>
                  <span className="text-gray-500">Número de ticket:</span>{" "}
                  {detalle.ticketNum || "—"}
                </div>
                <div>
                  <span className="text-gray-500">Dirigido a:</span>{" "}
                  {TARGET_TYPES.find((t) => t.value === detalle.target)
                    ?.label || "—"}
                </div>
                <div>
                  <span className="text-gray-500">
                    Tipo de reclamo / queja:
                  </span>{" "}
                  {COMPLAINT_TYPES.find((t) => t.value === detalle.type)
                    ?.label || "—"}
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-500">
                    Descripción del bien o servicio:
                  </span>{" "}
                  {detalle.itemDescription || "—"}
                </div>
                <div>
                  <span className="text-gray-500">Monto reclamado:</span>{" "}
                  {detalle.amountClaimed
                    ? `S/ ${detalle.amountClaimed}`
                    : "—"}
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-500">
                    Descripción del problema:
                  </span>{" "}
                  {detalle.problemDescription || "—"}
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-500">Solución solicitada:</span>{" "}
                  {detalle.expectedSolution || "—"}
                </div>
                <div className="md:col-span-2">
                  <span className="text-gray-500">Evidencia:</span>{" "}
                  {detalle.evidenciaNombre || "—"}
                </div>
              </div>
            </section>
          </div>
        </WizardCard>
      </div>

      {/* Barra inferior */}
      <div className="sticky bottom-3 z-10">
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-3 sm:p-4 shadow-lg">
          <WizardControls
            current={current}
            total={steps.length}
            onPrev={handlePrev}
            onNext={handleNext}
            onSubmit={handleSubmit}
            submitting={sending}
          />
        </div>
      </div>

      <ClaimSuccessModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      />
    </section>
  );
}
