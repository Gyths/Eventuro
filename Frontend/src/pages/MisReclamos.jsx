// src/pages/reclamos/MisReclamos.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventuroApi } from "../api";

const ESTADOS = ["Todos", "Pendiente", "En revisión", "Resuelto"];

function mapStateToDisplay(state) {
  switch (state) {
    case "PENDING":
      return "Pendiente";
    case "NEGATED":
      return "Rechazado";
    case "IN_REVIEW":
      return "En revisión";
    case "ACCEPTED":
      return "Resuelto";
    default:
      return "Pendiente";
  }
}

function mapTypeToDisplay(type) {
  switch (type) {
    case "CLAIM":
      return "Reclamo (por un bien o servicio)";
    case "COMPLAINT":
      return "Queja (sobre el trato o servicio)";
    default:
      return type || "—";
  }
}

function Badge({ estado }) {
  const map = {
    Pendiente: "bg-amber-100 text-amber-700",
    "En revisión": "bg-blue-100 text-blue-700",
    Resuelto: "bg-green-100 text-green-700",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs ${
        map[estado] || "bg-gray-100 text-gray-700"
      }`}
    >
      {estado}
    </span>
  );
}

export default function MisReclamos() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // ----- Cargar reclamos desde el backend -----
  useEffect(() => {
    let cancelled = false;

    const loadComplaints = async () => {
      try {
        setLoading(true);

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

        if (!userId) {
          console.warn("No hay userId, no se pueden cargar reclamos");
          if (!cancelled) {
            setItems([]);
            setSelected(null);
          }
          return;
        }

        const data = await EventuroApi({
          endpoint: `/complaint/user/${userId}`,
          method: "GET",
        });

        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
          setSelected((data && data[0]) || null);
        }
      } catch (err) {
        console.error("Error al cargar reclamos:", err);
        if (!cancelled) {
          setItems([]);
          setSelected(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadComplaints();
    return () => {
      cancelled = true;
    };
  }, []);

  // ----- Filtro por texto y estado -----
  const filtered = useMemo(() => {
    return items.filter((it) => {
      const estadoLabel = mapStateToDisplay(it.state);
      const okEstado = estado === "Todos" || estado === estadoLabel;

      const text =
        (it.problemDescription || "") +
        " " +
        (it.eventName || "") +
        " " +
        (it.fullName || "") +
        " " +
        String(it.complaintId || "");

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
            placeholder="Buscar…"
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
          {loading && (
            <div className="rounded-2xl border border-gray-200 p-4 text-sm text-gray-500">
              Cargando reclamos…
            </div>
          )}

          {!loading &&
            filtered.map((it) => {
              const estadoLabel = mapStateToDisplay(it.state);
              const fecha = it.dateCreation
                ? new Date(it.dateCreation).toLocaleDateString("es-PE")
                : "—";
              const titulo = mapTypeToDisplay(it.type) || "Reclamo / queja";

              return (
                <button
                  key={String(it.complaintId)}
                  onClick={() => setSelected(it)}
                  className={`w-full text-left rounded-2xl border bg-white p-4 shadow-sm hover:shadow transition ${
                    selected?.complaintId === it.complaintId
                      ? "border-amber-300"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{titulo}</h3>
                    <Badge estado={estadoLabel} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    ID: {String(it.complaintId)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{fecha}</p>
                </button>
              );
            })}

          {!loading && filtered.length === 0 && (
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
                {mapTypeToDisplay(selected.type)}
              </h3>
              <Badge estado={mapStateToDisplay(selected.state)} />
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm mt-4">
              <div>
                <dt className="text-gray-500">ID:</dt>
                <dd className="text-gray-900">
                  {String(selected.complaintId)}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Fecha:</dt>
                <dd className="text-gray-900">
                  {selected.dateCreation
                    ? new Date(selected.dateCreation).toLocaleString("es-PE")
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Evento:</dt>
                <dd className="text-gray-900">{selected.eventName || "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">N° ticket:</dt>
                <dd className="text-gray-900">{selected.ticketNum ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Monto reclamado:</dt>
                <dd className="text-gray-900">
                  {selected.amountClaimed != null
                    ? `S/ ${selected.amountClaimed}`
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Dirigido a:</dt>
                <dd className="text-gray-900">{selected.target || "—"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Descripción del problema:</dt>
                <dd className="text-gray-900">
                  {selected.problemDescription || "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Solución esperada:</dt>
                <dd className="text-gray-900">
                  {selected.expectedSolution || "—"}
                </dd>
              </div>

              {/* Evidencia con nombre azul + descarga */}
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Evidencia:</dt>
                <dd className="text-gray-900">
                  {selected.evidenceUrlKeys ? (
                    selected.URLDescarga ? (
                      <a
                        href={selected.URLDescarga}
                        target="_blank"
                        rel="noreferrer"
                        download={
                          selected.evidenceUrlKeys
                            ? selected.evidenceUrlKeys.split("/").pop()
                            : undefined
                        }
                        className="text-indigo-600 underline hover:text-indigo-700"
                      >
                        {selected.evidenceUrlKeys.split("/").pop()}
                      </a>
                    ) : (
                      <span className="text-indigo-600">
                        {selected.evidenceUrlKeys.split("/").pop()}
                      </span>
                    )
                  ) : (
                    "—"
                  )}
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
