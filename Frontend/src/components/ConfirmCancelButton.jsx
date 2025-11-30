import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function ConfirmCancelModal({
  open,
  onClose,
  onConfirm,
  eventTitle,
}) {
  if (!open) return null;

  return (
    <>
      {/* Keyframes locales para la animación */}
      <style>{`
        @keyframes modalFadeInScale {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 sm:p-7 border border-purple-50 relative"
          style={{ animation: "modalFadeInScale 0.2s ease-out" }}
        >
          {/* Botón de cierre pequeño en la esquina */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 rounded-full px-2 py-1 text-xs text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            ✕
          </button>

          {/* Icono de advertencia */}
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <ExclamationTriangleIcon className="h-7 w-7 text-red-600" />
            </div>
          </div>

          {/* Título y texto */}
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Cancelar evento
          </h3>
          <p className="text-sm text-gray-600 text-center mb-4">
            Estás a punto de cancelar el evento{" "}
            <span className="font-semibold text-gray-900">{eventTitle}</span>.
            <br />
            Esta acción no se puede deshacer y afectará a todas las fechas.
          </p>

          {/* Caja de aviso extra */}
          <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-700">
            Se notificará por correo a todos los clientes
            que adquirieron una o más entradas.
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              Volver
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:from-red-700 hover:to-red-600 transition"
            >
              Sí, cancelar evento
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
