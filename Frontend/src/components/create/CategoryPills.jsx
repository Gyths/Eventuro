import { useMemo } from "react";

/**
 * Multi-select pills ("chips")
 * props:
 * - options: [{ id:number|string, label:string }]
 * - values:  (number[]|string[])  // ids seleccionados
 * - onChange:(nextIds:number[]|string[]) => void
 * - className?: string
 */
export default function CategoryPills({ options = [], values = [], onChange, className = "" }) {
  const set = useMemo(() => new Set((values || []).map(String)), [values]);

  const toggle = (id) => {
    const s = new Set(set);
    const key = String(id);
    if (s.has(key)) s.delete(key); else s.add(key);
    const next = options
      .map(o => String(o.id))
      .filter(k => s.has(k))
      .map(k => {
        const o = options.find(x => String(x.id) === k);
        return o?.id ?? k;
      });
    onChange?.(next);
  };

  return (
    <div className={className}>
      <div className="mb-2 text-sm font-medium text-gray-700">Categorías</div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Seleccionar categorías">
        {options.map((opt) => {
          const selected = set.has(String(opt.id));
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggle(opt.id)}
              className={[
                "px-3 py-1.5 rounded-full text-sm transition shadow-sm border",
                selected
                  ? "bg-violet-50 border-violet-400 text-violet-700 ring-2 ring-violet-200"
                  : "bg-white border-gray-200 text-gray-700 hover:border-violet-300 hover:shadow",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              ].join(" ")}
              aria-pressed={selected}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-gray-500">Puedes elegir una o varias.</p>
    </div>
  );
}