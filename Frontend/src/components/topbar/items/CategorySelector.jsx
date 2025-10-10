import { useEffect, useState, useMemo } from "react";

const BASE_URL = "http://localhost:4000";

export default function CategorySelector({ value, onChange }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let abort = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await fetch(`${BASE_URL}/eventuro/api/event-category/`);
        const isJson = res.headers.get("content-type")?.includes("application/json");
        const payload = isJson ? await res.json().catch(() => null) : null;

        if (!res.ok) throw new Error(payload?.error || `HTTP ${res.status}`);
        if (abort) return;

        // Soporta los dos formatos:
        // 1) [{ category: { eventCategoryId, initials, description }}, ...]
        // 2) [{ eventCategoryId, initials, description }, ...]
        const parsed = (payload ?? [])
          .map((it) => (it?.category ? it.category : it))
          .filter(Boolean)
          .map((c) => ({
            id: Number(c.eventCategoryId),
            initials: String(c.initials || "").trim(),
            description: String(c.description || "").trim(),
          }));

        setCats(parsed);
      } catch (e) {
        if (!abort) setErr(e.message || "No se pudo cargar categorías");
      } finally {
        if (!abort) setLoading(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, []);

  const handlePick = (desc) => {
    // toggle: si eliges la misma, limpia
    onChange?.(value === desc ? null : desc);
  };

  const hasCats = cats.length > 0;
  const sortedCats = useMemo(
    () => [...cats].sort((a, b) => a.description.localeCompare(b.description, "es")),
    [cats]
  );

  return (
    <div className="space-y-2">
      <p className="px-1 text-sm font-medium text-gray-700">Categorías</p>

      {/* estados */}
      {loading && (
        <div className="px-1 text-sm text-gray-500">Cargando…</div>
      )}
      {err && !loading && (
        <div className="px-1 text-sm text-red-600">Error: {err}</div>
      )}

      {/* listado */}
      {!loading && !err && (
        <>
          {hasCats ? (
            <div className="grid grid-cols-2 gap-2">
              {sortedCats.map((c) => {
                const active = value === c.description; // seguimos usando description como valor
                return (
                  <button
                    key={c.id}
                    onClick={() => handlePick(c.description)}
                    className={`rounded-xl px-3 py-2 text-sm shadow ${
                      active
                        ? "bg-violet-600 text-white"
                        : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                    }`}
                    title={c.initials ? `${c.description} (${c.initials})` : c.description}
                  >
                    {c.description}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-1 text-sm text-gray-500">
              No hay categorías disponibles.
            </div>
          )}

          {/* limpiar */}
          <div className="pt-1 text-right">
            <button
              type="button"
              onClick={() => onChange?.(null)}
              className="text-xs text-gray-500 underline underline-offset-2 hover:text-gray-700"
            >
              Limpiar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
