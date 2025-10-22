import { useEffect, useMemo, useState } from "react";
import FormField from "./FormField";
import TextInput from "./TextInput";
// import SelectInput from "./SelectInput";  // ya no se usa
import TextArea from "./TextArea";
import { BASE_URL } from "../../config.js";

export default function EventBasicsForm({ form, onChange }) {
  const [categories, setCategories] = useState([]); // [{id,label}]
  const [loadingCats, setLoadingCats] = useState(true);
  const [errorCats, setErrorCats] = useState(null);

  // Normaliza el array seleccionado (form.categories)
  const selectedIds = useMemo(() => {
    const arr = Array.isArray(form?.categories) ? form.categories : [];
    // Convertir a string para comparar de forma estable
    return new Set(arr.map((x) => String(x)));
  }, [form?.categories]);

  useEffect(() => {
    let abort = false;

    (async () => {
      try {
        setLoadingCats(true);
        setErrorCats(null);

        const res = await fetch(`${BASE_URL}/eventuro/api/event-category/`);
        const payload = await res.json();
        if (abort) return;

        // Soporta estructura con o sin "category"
        const parsed = (payload ?? [])
          .map((it) => (it?.category ? it.category : it))
          .map((c) => ({
            id: Number(c.eventCategoryId),
            label: String(c.description).trim(),
          }));

        setCategories(parsed);
      } catch (err) {
        if (!abort) setErrorCats(err?.message || "Error cargando categorías");
      } finally {
        if (!abort) setLoadingCats(false);
      }
    })();

    return () => {
      abort = true;
    };
  }, []);

  // Toggle de selección (multi-select)
  const toggleCategory = (id) => {
    const idStr = String(id);
    const current = new Set(selectedIds);
    if (current.has(idStr)) current.delete(idStr);
    else current.add(idStr);

    // Mantener el orden según las opciones cargadas
    const next = categories
      .map((c) => String(c.id))
      .filter((k) => current.has(k))
      .map((k) => {
        const found = categories.find((c) => String(c.id) === k);
        return found?.id ?? Number(k);
      });

    onChange?.({ categories: next });
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Nombre del Evento*"
        hint="Recomendación: Ingrese un nombre llamativo y corto"
      >
        <TextInput
          placeholder="Recomendación: Ingrese un nombre llamativo y corto"
          value={form.name || ""}
          onChange={(v) => onChange({ name: v })}
        />
      </FormField>

      <FormField label="Categorías*">
        {/* Loading */}
        {loadingCats && (
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 animate-pulse rounded-full bg-gray-200"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loadingCats && errorCats && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-red-700">
              {errorCats}. Intenta nuevamente.
            </span>
            <button
              type="button"
              onClick={() => {
                // reintentar sin recargar
                setLoadingCats(true);
                setErrorCats(null);
                // fuerza el efecto: volver a llamar al endpoint
                (async () => {
                  try {
                    const res = await fetch(
                      `${BASE_URL}/eventuro/api/event-category/`
                    );
                    const payload = await res.json();
                    const parsed = (payload ?? [])
                      .map((it) => (it?.category ? it.category : it))
                      .map((c) => ({
                        id: Number(c.eventCategoryId),
                        label: String(c.description).trim(),
                      }));
                    setCategories(parsed);
                  } catch (err) {
                    setErrorCats(err?.message || "Error cargando categorías");
                  } finally {
                    setLoadingCats(false);
                  }
                })();
              }}
              className="rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm hover:bg-gray-50"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Pills */}
        {!loadingCats && !errorCats && (
          <>
            <div
              role="group"
              aria-label="Selecciona una o varias categorías"
              className="flex flex-wrap gap-2"
            >
              {categories.map((opt) => {
                const selected = selectedIds.has(String(opt.id));
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleCategory(opt.id)}
                    className={[
                      "px-3 py-1.5 rounded-full text-sm transition shadow-sm border",
                      selected
                        ? "bg-violet-50 border-violet-400 text-violet-700 ring-2 ring-violet-200"
                        : "bg-white border-gray-200 text-gray-700 hover:border-violet-300 hover:shadow",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Puedes elegir una o varias categorías.
            </p>
          </>
        )}
      </FormField>

      <FormField label="Descripción del Evento*">
        <TextArea
          placeholder="Escribe un párrafo que describa sobre qué trata tu evento."
          value={form.description || ""}
          onChange={(v) => onChange({ description: v })}
        />
      </FormField>

      <FormField label="Información adicional">
        <TextArea
          placeholder="Información complementaria para los asistentes (opcional)."
          value={form.extraInfo || ""}
          onChange={(v) => onChange({ extraInfo: v })}
        />
      </FormField>
    </div>
  );
}
