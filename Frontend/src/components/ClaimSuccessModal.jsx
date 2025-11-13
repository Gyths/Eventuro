export default function ClaimSuccessModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600 text-3xl">✓</div>
        <h3 className="text-2xl font-bold text-center mb-2">Reclamo registrado</h3>
        <p className="text-center text-gray-600 mb-6">Reclamo pendiente de revisión</p>

        <div className="flex justify-center gap-3">
          <a
            href="/"
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Volver al inicio
          </a>
          <a
            href="/misReclamos"
            className="px-4 py-2 rounded-xl border border-amber-300 bg-amber-400 text-white hover:bg-amber-500"
          >
            Ver reclamos
          </a>
        </div>
      </div>
    </div>
  );
}
