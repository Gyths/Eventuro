export function DiscountCodeCard({ code, available, from, to, appliesTo = [], percent, onRemove }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-lg font-semibold tracking-wide text-gray-800">{code}</div>
          <div className="text-xs text-gray-500">{available} disponibles</div>
          <div className="text-xs text-gray-500">{from} - {to}</div>
          <div className="text-sm mt-2">
            <div className="text-gray-700"><span className="font-medium">Aplica para:</span></div>
            <ul className="text-gray-700 text-sm leading-5 list-disc pl-5">
              {appliesTo.length === 0 ? <li>—</li> : appliesTo.map((a, i) => <li key={i}>{a}</li>)}
            </ul>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Descuento:</div>
          <div className="text-3xl font-bold text-gray-800">{percent}%</div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              title="Eliminar código"
              className="mt-3 inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-1 text-xs text-gray-700 hover:bg-gray-50"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
