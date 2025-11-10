// src/pages/reclamos/MisReclamos.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const ESTADOS = ["Todos", "Pendiente", "En revisión", "Resuelto"];

function Badge({ estado }) {
  const map = {
    Pendiente: "bg-amber-100 text-amber-700",
    "En revisión": "bg-blue-100 text-blue-700",
    Resuelto: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs ${map[estado] || "bg-gray-100 text-gray-700"}`}
    >
      {estado}
    </span>
  );
}

// --------- demo data (solo para maqueta) ----------
function seedDemoIfEmpty() {
  const KEY = "reclamos_eventuro";
  const existing = localStorage.getItem(KEY);
  if (existing) return JSON.parse(existing);

  const demo = [
    {
      id: "R-240901-001",
      estado: "Pendiente",
      fecha: "09/09/2025",
      detalle: {
        tipoReclamo: "Error en el pago con tarjeta",
        descripcionReclamo:
          "Intenté comprar una entrada, pero la pasarela no procesó el pago y salió un mensaje de error.",
        solucionEsperada:
          "Devolución del monto retenido o validación de la compra para obtener el ticket.",
        evidenciaNombre: "screenshot_2025-09-09_1203.png",
      },
    },
    {
      id: "R-240812-014",
      estado: "Resuelto",
      fecha: "12/08/2025",
      detalle: {
        tipoReclamo: "Ticket no enviado al correo",
        descripcionReclamo:
          "Realicé la compra y no recibí el ticket en mi bandeja ni en spam.",
        solucionEsperada: "Reenvío inmediato del ticket y confirmación por correo.",
        evidenciaNombre: "comprobante_123456.pdf",
      },
    },
    {
      id: "R-240826-007",
      estado: "En revisión",
      fecha: "26/08/2025",
      detalle: {
        tipoReclamo: "Error en datos del ticket",
        descripcionReclamo:
          "El nombre del ticket no coincide con el ingresado en el formulario.",
        solucionEsperada: "Actualización del nombre sin costo adicional.",
        evidenciaNombre: "captura_datos_ticket.png",
      },
    },
  ];

  localStorage.setItem(KEY, JSON.stringify(demo));
  return demo;
}
// --------------------------------------------------

export default function MisReclamos() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const raw = seedDemoIfEmpty(); // carga demo si está vacío
    setItems(raw);
    setSelected(raw[0] || null);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const okEstado = estado === "Todos" || it.estado === estado;
      const text =
        (it.detalle?.descripcionReclamo || "") +
        " " +
        (it.detalle?.tipoReclamo || "") +
        " " +
        (it.id || "");
      const okQ = !q.trim() || text.toLowerCase().includes(q.toLowerCase());
      return okEstado && okQ;
    });
  }, [items, estado, q]);

  return (
    <div className="relative max-w-screen-2xl mx-auto px-6 lg:px-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Columna izquierda: filtros + lista */}
      <div className="lg:col-span-5">
        <div className="mb-4 flex items-center gap-3">
          <input
            placeholder="Search..."
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="rounded-xl border border-gray-300 px-3 py-2"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            {ESTADOS.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>

          {/* Botón crear reclamo (toolbar) */}
          <button
            onClick={() => navigate("/reclamos/nuevo")}
            className="rounded-xl bg-amber-500 text-white px-3 py-2 hover:bg-amber-600"
            title="Crear reclamo"
          >
            + Nuevo
          </button>
        </div>

        {/* Lista */}
        <div className="space-y-4">
          {filtered.map((it) => (
            <button
              key={it.id}
              onClick={() => setSelected(it)}
              className={`w-full text-left rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition
              ${selected?.id === it.id ? "border-amber-300" : "border-gray-200"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  {it.detalle?.tipoReclamo || "Asunto del reclamo"}
                </h3>
                <Badge estado={it.estado} />
              </div>
              <p className="text-xs text-gray-500 mt-1">ID: {it.id}</p>
              <p className="text-sm text-gray-500 mt-1">Tipo de reclamo</p>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
              No hay reclamos para mostrar.
            </div>
          )}
        </div>
      </div>

      {/* Panel de detalle */}
      <div className="lg:col-span-7">
        {selected ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                {selected.detalle?.tipoReclamo || "Detalle del reclamo"}
              </h3>
              <Badge estado={selected.estado} />
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm mt-4">
              <div>
                <dt className="text-gray-500">ID:</dt>
                <dd className="text-gray-900">{selected.id}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Fecha:</dt>
                <dd className="text-gray-900">{selected.fecha}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Tipo:</dt>
                <dd className="text-gray-900">
                  {selected.detalle?.tipoReclamo || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Descripción:</dt>
                <dd className="text-gray-900">
                  {selected.detalle?.descripcionReclamo || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Solución esperada:</dt>
                <dd className="text-gray-900">
                  {selected.detalle?.solucionEsperada || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Evidencia adjunta:</dt>
                <dd className="text-gray-900">
                  {selected.detalle?.evidenciaNombre || "—"}
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
            Selecciona un reclamo para ver el detalle.
          </div>
        )}
      </div>

      {/* FAB crear reclamo */}
      <button
        onClick={() => navigate("/reclamos/nuevo")}
        className="fixed right-6 bottom-6 md:right-10 md:bottom-10 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-lg px-5 py-3"
      >
        + Crear reclamo
      </button>
    </div>
  );
}
