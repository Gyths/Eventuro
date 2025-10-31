import { useState } from "react";
import QRCode from "react-qr-code";

const ticketsDemo = [
  {
    id: 1,
    title: "Chocolatada 3.0",
    date: "Lunes, 17 octubre 2025 · 16:00 pm",
    address: "C. José Díaz s/n Lima 15046",
    image: "/demo/chocolatada.jpg",
    tags: ["Estudiante", "General"],
    qrValue: "TICKET-123456",
    user: { name: "Juan Pérez", document: "12.345.678" },
    zone: "Palcos | Fila 2",
    quantity: 2,
  },
  {
    id: 2,
    title: "Concierto Sinfónico PUCP",
    date: "Viernes, 20 noviembre 2025 · 19:00 pm",
    address: "Av. Universitaria 1801, San Miguel",
    image: "/demo/sinfonico.jpg",
    tags: ["General"],
    qrValue: "TICKET-654321",
    user: { name: "María López", document: "45.678.912" },
    zone: "Zona A | Asiento 45",
    quantity: 1,
  },
];

export default function MisTickets() {
  const [selected, setSelected] = useState(ticketsDemo[0]);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Título */}
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Cuenta <span className="text-gray-400">{">"}</span> Mis Entradas
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          {/* Lista de tickets */}
          <div className="flex flex-col gap-5">
            {ticketsDemo.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelected(t)}
                className={`flex cursor-pointer gap-4 rounded-2xl bg-white p-4 shadow-md transition hover:shadow-lg ${
                  selected?.id === t.id ? "ring-2 ring-purple-400" : ""
                }`}
              >
                <img
                  src={t.image}
                  alt={t.title}
                  className="h-24 w-40 rounded-lg object-cover"
                />

                <div className="flex flex-col justify-center flex-1">
                  <div className="flex gap-2 mb-1">
                    {t.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-purple-100 text-purple-700 px-3 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">{t.address}</p>
                  <p className="text-xs text-gray-400">{t.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detalle del ticket */}
          <div className="rounded-2xl bg-white shadow-lg border border-gray-100 p-6 flex flex-col">
            {selected ? (
              <>
                <h3 className="text-xl font-semibold text-purple-900 mb-1">
                  {selected.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{selected.date}</p>

                <img
                  src={selected.image}
                  alt={selected.title}
                  className="rounded-xl w-full object-cover h-48 mb-4"
                />

                <div className="flex items-center gap-2 text-gray-700 mb-3">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C8 2 4 5 4 10c0 6 8 12 8 12s8-6 8-12c0-5-4-8-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm">{selected.address}</span>
                </div>

                <div className="text-sm text-gray-700 mb-3">
                  <p className="font-semibold text-gray-900 mb-1">Datos</p>
                  <p>Nombre: {selected.user.name}</p>
                  <p>Documento: {selected.user.document}</p>
                </div>

                <div className="text-sm text-gray-700 mb-4">
                  <p className="font-semibold text-gray-900 mb-1">Zona</p>
                  <p>{selected.zone}</p>
                  <p>Cantidad: {selected.quantity}</p>
                </div>

                <div className="flex justify-center mb-5">
                  <QRCode
                    value={selected.qrValue}
                    size={140}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>

                <button className="rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 transition">
                  Descargar
                </button>
              </>
            ) : (
              <p className="text-gray-400 text-center mt-20">
                Selecciona un ticket para ver su información.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
