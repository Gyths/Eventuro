import {
  CheckCircleIcon,
  StarIcon,
  CalendarDaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function CompraExitosaModal({
  total,
  transaccionId = "A1B2C3",
  nombreEvento = "Evento",
  fechaEvento = "Fecha del evento",
  correo = "ejemplo@correo.com",
  onReturnHome,
  onViewTickets,
}) {
  return (
    <div
      className={
        "fixed inset-0 flex justify-center items-center transition-colors bg-black/20"
      }
    >
      <div className="flex flex-col justify-center items-center bg-white rounded-xl shadow-2xl max-w-md p-5">
        {/* Icono de éxito */}
        <div className="flex justify-center">
          <CheckCircleIcon className="text-green-500 w-16 h-16" />
        </div>

        <h2 className="text-2xl font-semibold mb-1">Compra exitosa</h2>
        <p className="text-gray-600 mb-6">Tu pago se procesó correctamente</p>

        {/* Detalle de la compra */}
        <div className="bg-gray-100 rounded-lg text-left p-4">
          <div className="flex justify-between mb-1 gap-6">
            <span className="font-medium text-gray-700">Monto</span>
            <span className="font-semibold">S/ {total}</span>
          </div>

          <div className="flex justify-between mb-3 border-b border-gray-400 pb-2 gap-6">
            <span className="font-medium text-gray-700">N° de Transacción</span>
            <span className="font-semibold">#{transaccionId}</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <StarIcon className="flex size-9"></StarIcon>
            <span className="flex flex-1 justify-end font-medium">
              {nombreEvento}
            </span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <CalendarDaysIcon className="flex size-8"></CalendarDaysIcon>
            <span className="flex flex-1 justify-end font-medium">
              {fechaEvento}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Te enviamos un correo a{" "}
          <span className="font-semibold">{correo}</span>
        </p>

        {/* Botones */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onReturnHome}
            className="px-5 py-2 cursor-pointer rounded-lg bg-purple-700 text-white font-medium hover:bg-purple-800 hover:scale-101 transition-transform"
          >
            Volver al inicio
          </button>
          <button
            onClick={onViewTickets}
            className="px-5 py-2 cursor-pointer rounded-lg border-2 border-yellow-400 text-yellow-500 font-medium hover:bg-yellow-400 hover:text-black hover:scale-103 transition-transform"
          >
            Ver entradas
          </button>
        </div>
      </div>
    </div>
  );
}
