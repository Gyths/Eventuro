import { useMemo, useRef, useState } from "react";
import ClaimSuccessModal from "../components/ClaimSuccessModal.jsx";

/* ======================= Constantes ======================= */
const RECLAMO_TIPOS = [
  "Reclamo por funcionamiento de página",
  "Reclamo por cobro/compra",
  "Reclamo por atención del organizador",
  "Libro de reclamaciones general",
];
const TIPOS_BIEN = ["Producto", "Servicio"];

/* ======================= Inputs (fuera del componente) ======================= */
function Input({ label, name, value, onChange, required, type = "text", className = "", placeholder, autoComplete, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-600 mb-1">
        {label}{required && " *"}
      </label>
      <input
        id={name} name={name} type={type} value={value} onChange={onChange} required={required}
        placeholder={placeholder} autoComplete={autoComplete}
        className={`w-full rounded-lg border px-3 py-2 ${className} ${error ? "border-rose-400" : "border-gray-300"}`}
      />
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );
}
function TextArea({ label, name, value, onChange, required, rows = 4, className = "", placeholder, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-600 mb-1">
        {label}{required && " *"}
      </label>
      <textarea
        id={name} name={name} value={value} onChange={onChange} required={required} rows={rows} placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 resize-y ${className} ${error ? "border-rose-400" : "border-gray-300"}`}
      />
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );
}
function Select({ label, name, value, onChange, required, options = [], className = "", error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm text-gray-600 mb-1">
        {label}{required && " *"}
      </label>
      <select
        id={name} name={name} value={value} onChange={onChange} required={required}
        className={`w-full rounded-lg border px-3 py-2 ${className} ${error ? "border-rose-400" : "border-gray-300"}`}
      >
        <option value="">Sin seleccionar</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
    </div>
  );
}

/* ======================= UI helpers ======================= */
function StepBadge({ number }) {
  return <div className="h-9 w-9 rounded-full bg-amber-400 text-white grid place-items-center font-bold shadow">{number}</div>;
}
function WizardCard({ title, subtitle, badge, children }) {
  return (
    <div className="relative rounded-[28px] bg-gray-100 p-6 sm:p-7 lg:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
      <div className="mb-3 sm:mb-4 lg:mb-6 flex items-center gap-3">
        {badge}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
function StepProgress({ steps, current }) {
  const pct = useMemo(() => ((current + 1) / steps.length) * 100, [current, steps.length]);
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-700">
          Paso <span className="font-semibold">{current + 1}</span> de {steps.length}
        </div>
        <div className="text-xs text-gray-500">{Math.round(pct)}%</div>
      </div>
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
function WizardControls({ current, total, onPrev, onNext, onSubmit, submitting }) {
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

/* ======================= Página principal ======================= */
export default function LibroReclamos() {
  const steps = ["Información del Cliente", "Detalles del reclamo", "Confirmación de envío"];
  const [current, setCurrent] = useState(0);
  const cardRefs = useRef([]);

  const scrollToCurrentCardTop = () => {
    const el = cardRefs.current[current];
    if (el?.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Paso 1
  const [cliente, setCliente] = useState({
    nombres: "", primerApellido: "", segundoApellido: "",
    telefono: "", email: "", numeroDocumento: "",
    provincia: "", distrito: "", direccion: "", menorEdad: null,
  });

  // Paso 2
  const [detalle, setDetalle] = useState({
    nombreEvento: "", numeroTicket: "", montoReclamado: "",
    tipoBien: "", tipoReclamo: "", descripcionBien: "",
    descripcionReclamo: "", solucionEsperada: "",
    evidencia: null, evidenciaType: null, evidenciaDataUrl: null, evidenciaNombre: null,
  });

  // Captura/preview de archivo
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setDetalle(d => ({ ...d, evidencia: null, evidenciaType: null, evidenciaDataUrl: null, evidenciaNombre: null }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setDetalle(d => ({
        ...d,
        evidencia: file,
        evidenciaType: file.type,
        evidenciaDataUrl: reader.result,  // dataURL para persistir en localStorage
        evidenciaNombre: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  // Validaciones
  const [errors, setErrors] = useState({});
  const validateStep = (idx) => {
    const err = {};
    if (idx === 0) {
      if (!cliente.nombres.trim()) err.nombres = "Campo obligatorio";
      if (!cliente.primerApellido.trim()) err.primerApellido = "Campo obligatorio";
      if (!cliente.telefono.trim()) err.telefono = "Campo obligatorio";
      if (!cliente.email.trim()) err.email = "Campo obligatorio";
      if (!cliente.numeroDocumento.trim()) err.numeroDocumento = "Campo obligatorio";
      if (!cliente.provincia.trim()) err.provincia = "Campo obligatorio";
      if (!cliente.distrito.trim()) err.distrito = "Campo obligatorio";
      if (!cliente.direccion.trim()) err.direccion = "Campo obligatorio";
      if (cliente.menorEdad === null) err.menorEdad = "Seleccione una opción";
    }
    if (idx === 1) {
      if (!detalle.nombreEvento.trim()) err.nombreEvento = "Campo obligatorio";
      if (!detalle.tipoBien) err.tipoBien = "Seleccione un tipo de bien";
      if (!detalle.tipoReclamo) err.tipoReclamo = "Seleccione un tipo de reclamo";
      if (!detalle.descripcionReclamo.trim()) err.descripcionReclamo = "Campo obligatorio";
      if (!detalle.solucionEsperada.trim()) err.solucionEsperada = "Campo obligatorio";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    const ok = validateStep(current);
    if (ok) setCurrent((c) => Math.min(steps.length - 1, c + 1));
    else scrollToCurrentCardTop();
  };
  const handlePrev = () => setCurrent((c) => Math.max(0, c - 1));

  // Envío (mock a localStorage)
  const [sending, setSending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = async () => {
    const ok = validateStep(2);
    if (!ok) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 600));

    const KEY = "reclamos_eventuro";
    const prev = JSON.parse(localStorage.getItem(KEY) || "[]");
    const nuevo = {
      id: Date.now().toString(),
      estado: "Pendiente",
      fecha: new Date().toISOString().slice(0, 10),
      cliente,
      detalle: {
        nombreEvento: detalle.nombreEvento,
        numeroTicket: detalle.numeroTicket,
        montoReclamado: detalle.montoReclamado,
        tipoBien: detalle.tipoBien,
        tipoReclamo: detalle.tipoReclamo,
        descripcionBien: detalle.descripcionBien,
        descripcionReclamo: detalle.descripcionReclamo,
        solucionEsperada: detalle.solucionEsperada,
        evidenciaNombre: detalle.evidenciaNombre || null,
        evidenciaType: detalle.evidenciaType || null,
        evidenciaDataUrl: detalle.evidenciaDataUrl || null,
      },
    };
    localStorage.setItem(KEY, JSON.stringify([nuevo, ...prev]));
    setSending(false);
    setSuccessOpen(true);
  };

  return (
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-6 space-y-6">
      <h1 className="text-3xl font-bold mb-2">Libro de Reclamaciones Eventuro</h1>
      <StepProgress steps={steps} current={current} />

      {/* Paso 1 */}
      <div ref={(el) => (cardRefs.current[0] = el)} className={current === 0 ? "block" : "hidden"}>
        <WizardCard badge={<StepBadge number={1} />} title="Información del cliente" subtitle="*Marcados como campos obligatorios">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Nombres" name="nombres" required value={cliente.nombres} onChange={(e)=>setCliente(c=>({...c,nombres:e.target.value}))} error={errors.nombres}/>
            <Input label="Primer Apellido" name="primerApellido" required value={cliente.primerApellido} onChange={(e)=>setCliente(c=>({...c,primerApellido:e.target.value}))} error={errors.primerApellido}/>
            <Input label="Segundo Apellido" name="segundoApellido" value={cliente.segundoApellido} onChange={(e)=>setCliente(c=>({...c,segundoApellido:e.target.value}))} error={errors.segundoApellido}/>
            <Input label="Número de documento" name="numeroDocumento" required value={cliente.numeroDocumento} onChange={(e)=>setCliente(c=>({...c,numeroDocumento:e.target.value}))} error={errors.numeroDocumento}/>
            <Input label="Teléfono" name="telefono" required value={cliente.telefono} onChange={(e)=>setCliente(c=>({...c,telefono:e.target.value}))} error={errors.telefono}/>
            <Input label="Correo Electrónico" name="email" type="email" required value={cliente.email} onChange={(e)=>setCliente(c=>({...c,email:e.target.value}))} error={errors.email}/>
            <Input label="Provincia" name="provincia" required value={cliente.provincia} onChange={(e)=>setCliente(c=>({...c,provincia:e.target.value}))} error={errors.provincia}/>
            <Input label="Distrito" name="distrito" required value={cliente.distrito} onChange={(e)=>setCliente(c=>({...c,distrito:e.target.value}))} error={errors.distrito}/>
            <div className="md:col-span-2">
              <Input label="Dirección" name="direccion" required value={cliente.direccion} onChange={(e)=>setCliente(c=>({...c,direccion:e.target.value}))} error={errors.direccion}/>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">
                ¿Eres menor de edad? {errors.menorEdad && <span className="text-rose-600"> (requerido)</span>}
              </p>
              <div className="flex items-center gap-6">
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="menor" onChange={()=>setCliente(c=>({...c,menorEdad:true}))} checked={cliente.menorEdad===true}/><span>Sí</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="radio" name="menor" onChange={()=>setCliente(c=>({...c,menorEdad:false}))} checked={cliente.menorEdad===false}/><span>No</span>
                </label>
              </div>
            </div>
          </div>
        </WizardCard>
      </div>

      {/* Paso 2 */}
      <div ref={(el) => (cardRefs.current[1] = el)} className={current === 1 ? "block" : "hidden"}>
        <WizardCard badge={<StepBadge number={2} />} title="Detalles del reclamo" subtitle="Completa los campos del reclamo">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Nombre de Evento" name="nombreEvento" required value={detalle.nombreEvento} onChange={(e)=>setDetalle(d=>({...d,nombreEvento:e.target.value}))} error={errors.nombreEvento}/>
            <Input label="Número de ticket" name="numeroTicket" value={detalle.numeroTicket} onChange={(e)=>setDetalle(d=>({...d,numeroTicket:e.target.value}))} error={errors.numeroTicket}/>
            <Input label="Monto reclamado" name="montoReclamado" value={detalle.montoReclamado} onChange={(e)=>setDetalle(d=>({...d,montoReclamado:e.target.value}))} error={errors.montoReclamado}/>
            <Select label="Tipo de reclamo" name="tipoReclamo" required options={RECLAMO_TIPOS} value={detalle.tipoReclamo} onChange={(e)=>setDetalle(d=>({...d,tipoReclamo:e.target.value}))} error={errors.tipoReclamo}/>
            <Select label="Tipo de bien" name="tipoBien" required options={TIPOS_BIEN} value={detalle.tipoBien} onChange={(e)=>setDetalle(d=>({...d,tipoBien:e.target.value}))} error={errors.tipoBien}/>
            <TextArea label="Descripción del bien" name="descripcionBien" rows={3} value={detalle.descripcionBien} onChange={(e)=>setDetalle(d=>({...d,descripcionBien:e.target.value}))} error={errors.descripcionBien}/>
            <TextArea label="Descripción del reclamo" name="descripcionReclamo" required rows={5} value={detalle.descripcionReclamo} onChange={(e)=>setDetalle(d=>({...d,descripcionReclamo:e.target.value}))} error={errors.descripcionReclamo}/>
            <TextArea label="Solución esperada" name="solucionEsperada" required rows={5} value={detalle.solucionEsperada} onChange={(e)=>setDetalle(d=>({...d,solucionEsperada:e.target.value}))} error={errors.solucionEsperada}/>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Evidencia adjunta (opcional)</label>
              <input type="file" accept="image/*,application/pdf" onChange={handleFile} className="block w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"/>
              {detalle.evidenciaNombre && <p className="text-xs text-gray-500 mt-1">Archivo: {detalle.evidenciaNombre}</p>}
            </div>
          </div>
        </WizardCard>
      </div>

      {/* Paso 3 */}
      <div ref={(el) => (cardRefs.current[2] = el)} className={current === 2 ? "block" : "hidden"}>
        <WizardCard badge={<StepBadge number={3} />} title="Confirmación de envío" subtitle="Revisa toda la información antes de enviar">
          <div className="space-y-8 max-h-[70vh] overflow-auto pr-1">
            <section>
              <h4 className="text-lg font-semibold mb-3">Información del cliente</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <div><span className="text-gray-500">Nombres:</span> {cliente.nombres || "—"}</div>
                <div><span className="text-gray-500">Primer Apellido:</span> {cliente.primerApellido || "—"}</div>
                <div><span className="text-gray-500">Segundo Apellido:</span> {cliente.segundoApellido || "—"}</div>
                <div><span className="text-gray-500">Documento:</span> {cliente.numeroDocumento || "—"}</div>
                <div><span className="text-gray-500">Correo:</span> {cliente.email || "—"}</div>
                <div><span className="text-gray-500">Teléfono:</span> {cliente.telefono || "—"}</div>
                <div><span className="text-gray-500">Provincia:</span> {cliente.provincia || "—"}</div>
                <div><span className="text-gray-500">Distrito:</span> {cliente.distrito || "—"}</div>
                <div className="md:col-span-2"><span className="text-gray-500">Dirección:</span> {cliente.direccion || "—"}</div>
                <div className="md:col-span-2"><span className="text-gray-500">¿Menor de edad?:</span> {cliente.menorEdad===null ? "—" : cliente.menorEdad ? "Sí" : "No"}</div>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h4 className="text-lg font-semibold mb-3">Detalle del reclamo</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <div><span className="text-gray-500">Nombre de evento:</span> {detalle.nombreEvento || "—"}</div>
                <div><span className="text-gray-500">Número de ticket:</span> {detalle.numeroTicket || "—"}</div>
                <div><span className="text-gray-500">Monto reclamado:</span> {detalle.montoReclamado || "—"}</div>
                <div><span className="text-gray-500">Tipo de reclamo:</span> {detalle.tipoReclamo || "—"}</div>
                <div><span className="text-gray-500">Tipo de bien:</span> {detalle.tipoBien || "—"}</div>
                <div className="md:col-span-2"><span className="text-gray-500">Descripción del bien:</span> {detalle.descripcionBien || "—"}</div>
                <div className="md:col-span-2"><span className="text-gray-500">Descripción del reclamo:</span> {detalle.descripcionReclamo || "—"}</div>
                <div className="md:col-span-2"><span className="text-gray-500">Solución esperada:</span> {detalle.solucionEsperada || "—"}</div>
                <div className="md:col-span-2"><span className="text-gray-500">Evidencia:</span> {detalle.evidenciaNombre || "—"}</div>
              </div>
            </section>
          </div>
        </WizardCard>
      </div>

      {/* Barra inferior */}
      <div className="sticky bottom-3 z-10">
        <div className="rounded-2xl bg-white/80 backdrop-blur border border-gray-200 p-3 sm:p-4 shadow-lg">
          <WizardControls current={current} total={steps.length} onPrev={handlePrev} onNext={handleNext} onSubmit={handleSubmit} submitting={sending}/>
        </div>
      </div>

      <ClaimSuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </section>
  );
}
