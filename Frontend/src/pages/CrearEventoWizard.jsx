import { useState } from "react";
import UbicacionEvento from "../components/UbicacionEvento";
import CrearTicketTajeta from "../components/CrearTicketTajeta";
import { createEvent } from "../services/events";

export default function CrearEventoWizard() {
  // ===== 1) Estado básico del evento =====
  const [basic, setBasic] = useState({
    organizerId: 1,
    title: "",
    description: "",
    inPerson: true,
    accessPolicy: "AO",
    accessPolicyDescription: "",
    eventCategories: [],
  });

  // ===== 2) Ubicación (solo si inPerson=true) =====
  const [venue, setVenue] = useState({
    city: "",
    address: "",
    addressUrl: "",
    reference: "",
    capacity: 0,
  });

  // ===== 3) Fechas y fases =====
  const [dates, setDates] = useState([]);
  const [salePhases, setSalePhases] = useState([]);

  // ===== 4) Zonas/Tickets =====
  const [zones, setZones] = useState([]);

  // ===== 5) Handlers que reciben datos desde las tarjetas =====
  const handleSaveLocation = (loc) => {
    setVenue((v) => ({
      ...v,
      city: loc.city,
      address: loc.address,
      reference: loc.reference,
      capacity: Number(loc.capacity || 0),
      addressUrl: loc.addressUrl || "",
    }));
  };

  const handleSubmitTickets = (payload) => {
    const mapped = (payload.items || []).map((i) => ({
      name: i.name,
      kind: "GENERAL",
      currency: payload.currency || "PEN",
      basePrice: Number(i.price || 0),
      capacity: Number(i.amount || 0),
      allocations: [],
    }));
    setZones(mapped);
  };

  // ===== 6) Helpers provisionales para probar rápido fechas/fases =====
  const addDemoDate = () =>
    setDates([
      {
        startAt: "2025-12-05T20:00:00.000Z",
        endAt: "2025-12-06T01:00:00.000Z",
      },
    ]);

  const addDemoPhase = () =>
    setSalePhases([
      {
        name: "Preventa",
        startAt: "2025-11-01T00:00:00.000Z",
        endAt: "2025-11-15T23:59:59.000Z",
        percentage: 10,
      },
    ]);

  // ===== 7) Validación mínima antes del POST =====
  function validate(payload) {
    if (!payload.title?.trim()) return "Falta el título";
    if (!Array.isArray(payload.eventCategories))
      return "Las categorías deben ser un arreglo de IDs";
    if (payload.inPerson) {
      const v = payload.venue || {};
      if (!v.city || !v.address || !v.addressUrl || !v.reference)
        return "Completa todos los campos de ubicación (incluye URL de Maps)";
      if (!(v.capacity > 0)) return "Capacidad debe ser > 0";
    }
    if (!Array.isArray(payload.dates) || payload.dates.length === 0)
      return "Añade al menos una fecha del evento";
    if (!Array.isArray(payload.zones) || payload.zones.length === 0)
      return "Añade al menos una zona/ticket";

    return null;
  }

  // ===== 8) Crear (POST) =====
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleCreate = async () => {
    setSaving(true);
    setMsg("");
    try {
      const payload = {
        organizerId: Number(basic.organizerId),
        title: basic.title,
        inPerson: !!basic.inPerson,
        description: basic.description,
        accessPolicy: basic.accessPolicy,
        accessPolicyDescription: basic.accessPolicyDescription?.trim() || null,
        eventCategories: basic.eventCategories,
        salePhases,
        dates,
        zones,
        ...(basic.inPerson ? { venue } : {}),
      };

      const error = validate(payload);
      if (error) {
        setMsg(error);
        return;
      }

      const created = await createEvent(payload);
      setMsg("Evento creado ");
      console.log("Creado:", created);
    } catch (e) {
      setMsg(`Error: ${String(e.message)}`);
    } finally {
      setSaving(false);
    }
  };

  // ===== 9) UI =====
  return (
    <div className="p-4 space-y-6">
      <div className="rounded-2xl border p-4 shadow grid gap-3">
        <h2 className="text-lg font-semibold">Datos básicos</h2>

        <label className="grid gap-1">
          <span className="text-sm opacity-70">Título</span>
          <input
            placeholder="Ej. Concierto de Rock"
            value={basic.title}
            onChange={(e) => setBasic((s) => ({ ...s, title: e.target.value }))}
            className="border rounded p-2"
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm opacity-70">Descripción</span>
          <textarea
            placeholder="Descripción del evento"
            value={basic.description}
            onChange={(e) =>
              setBasic((s) => ({ ...s, description: e.target.value }))
            }
            className="border rounded p-2"
          />
        </label>

        <div className="grid md:grid-cols-3 gap-3">
          <label className="flex items-center gap-2 border rounded p-2">
            <input
              type="checkbox"
              checked={basic.inPerson}
              onChange={(e) =>
                setBasic((s) => ({ ...s, inPerson: e.target.checked }))
              }
            />
            <span>Presencial</span>
          </label>

          <label className="grid gap-1">
            <span className="text-sm opacity-70">Política de acceso</span>
            <select
              value={basic.accessPolicy}
              onChange={(e) =>
                setBasic((s) => ({ ...s, accessPolicy: e.target.value }))
              }
              className="border rounded p-2"
            >
              <option value="AO">AO</option>
              <option value="E">E</option>
              <option value="T">T</option>
            </select>
          </label>

          <label className="grid gap-1">
            <span className="text-sm opacity-70">
              Categorías (IDs separados por coma)
            </span>
            <input
              placeholder="Ej: 1,2,5"
              onChange={(e) => {
                const ids = e.target.value
                  .split(",")
                  .map((x) => Number(x.trim()))
                  .filter((n) => Number.isFinite(n) && n > 0);
                setBasic((s) => ({ ...s, eventCategories: ids }));
              }}
              className="border rounded p-2"
            />
          </label>
        </div>

        <label className="grid gap-1">
          <span className="text-sm opacity-70">
            Descripción de política (opcional)
          </span>
          <input
            placeholder="Texto opcional"
            value={basic.accessPolicyDescription}
            onChange={(e) =>
              setBasic((s) => ({
                ...s,
                accessPolicyDescription: e.target.value,
              }))
            }
            className="border rounded p-2"
          />
        </label>

        <div className="flex gap-2">
          <button
            type="button"
            className="border px-3 py-1 rounded"
            onClick={addDemoDate}
          >
            + Fecha demo
          </button>
          <button
            type="button"
            className="border px-3 py-1 rounded"
            onClick={addDemoPhase}
          >
            + Fase demo
          </button>
        </div>
      </div>

      {basic.inPerson && (
        <UbicacionEvento
          initialData={{
            city: venue.city,
            address: venue.address,
            reference: venue.reference,
            howToFind: "",
            capacity: venue.capacity,
            addressUrl: venue.addressUrl,
          }}
          onSave={handleSaveLocation}
        />
      )}

      <CrearTicketTajeta
        initialData={{
          currency: "PEN",
          items: [],
        }}
        onSubmitTickets={handleSubmitTickets}
      />

      <div className="flex justify-end gap-3">
        <button
          onClick={handleCreate}
          disabled={saving}
          className="rounded-xl bg-black text-white px-4 py-2"
        >
          {saving ? "Creando…" : "Crear evento"}
        </button>
      </div>

      {msg && <div className="text-sm">{msg}</div>}
    </div>
  );
}
