// src/components/SuccessModal.jsx
export default function SuccessModal({
  isOpen,
  title = "Solicitud enviada",
  message = "Hemos recibido tu solicitud de devolución. Te notificaremos por correo cuando se evalúe.",
  confirmText = "Entendido",
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200">
          <div className="p-5 border-b">
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          </div>

          <div className="p-5">
            <p className="text-sm text-gray-700">{message}</p>
          </div>

          <div className="p-5 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl font-semibold text-white bg-purple-600 hover:bg-purple-700"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
