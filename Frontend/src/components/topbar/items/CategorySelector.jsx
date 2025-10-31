import { useEffect, useState, useMemo } from "react";
import { BASE_URL } from "../../../config.js";

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
        const payload = (await res.json()) ?? [];
        if (!res.ok) throw new Error(payload?.error || `HTTP ${res.status}`);
        if (abort) return;

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

  const handlePick = (desc) => onChange?.(value === desc ? null : desc);
  const sortedCats = useMemo(
    () => [...cats].sort((a, b) => a.description.localeCompare(b.description, "es")),
    [cats]
  );

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-gray-600 mb-1">Categorías</p>

      {loading && <div className="text-xs text-gray-500 px-1">Cargando…</div>}
      {err && !loading && <div className="text-xs text-red-600 px-1">Error: {err}</div>}

      {!loading && !err && (
        <>
          {cats.length ? (
            <div className="flex flex-wrap gap-2">
              {sortedCats.map((c) => {
                const active = value === c.description;
                return (
                  <button
                    key={c.id}
                    onClick={() => handlePick(c.description)}
                    className={`px-3 py-1 text-xs rounded-full transition-all border ${
                      active
                        ? "bg-violet-600 text-white border-violet-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {c.description}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-gray-500">No hay categorías.</div>
          )}

          <div className="text-right">
            <button
              type="button"
              onClick={() => onChange?.(null)}
              className="text-xs text-gray-500 underline hover:text-gray-700"
            >
              Limpiar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
