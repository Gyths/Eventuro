const CATS = ["Música", "Fiestas", "Seminarios", "Comida"];

export default function CategorySelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <p className="px-1 text-sm font-medium text-gray-700">Categorías</p>
      <div className="grid grid-cols-2 gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => onChange?.(c)}
            className={`rounded-xl px-3 py-2 text-sm shadow ${
              value === c
                ? "bg-violet-600 text-white"
                : "bg-gray-50 text-gray-800 hover:bg-gray-100"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="pt-1 text-right">
        <button
          onClick={() => onChange?.(null)}
          className="text-xs text-gray-500 underline underline-offset-2"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}
