import { useState } from "react";
import { XMarkIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import BotonCTA from "../BotonCTA";

export default function CopyConfigModal({ isOpen, onClose, onSelectEvent }) {
  // Dummy data de eventos del usuario
  const dummyEvents = [
    {
      id: 1,
      title: "Concierto de Rock 2024",
      date: "2024-12-15",
      venue: { city: "Lima" },
    },
    {
      id: 2,
      title: "Festival de Jazz",
      date: "2024-11-20",
      venue: { city: "Cusco" },
    },
    {
      id: 3,
      title: "Teatro Obra Clásica",
      date: "2025-01-10",
      venue: { city: "Arequipa" },
    },
    {
      id: 4,
      title: "Exposición de Arte Moderno",
      date: "2024-12-05",
      venue: { city: "Trujillo" },
    },
    {
      id: 5,
      title: "Conferencia Tech 2025",
      date: "2025-02-14",
      venue: { city: "Lima" },
    },
  ];

  const [selectedEventId, setSelectedEventId] = useState(null);

  // Dummy data del evento completo (estructura del JSON final)
  const getEventData = (eventId) => {
    // Simulación de datos según la estructura del JSON final
    const eventDataMap = {
      1: {
        title: "Concierto de Rock 2024",
        description: "Un increíble concierto de rock con las mejores bandas nacionales e internacionales.",
        categories: [1, 3],
        extraInfo: "Se permite el ingreso con bebidas no alcohólicas.",
        restrictions: ["No se permiten menores de 18 años", "No se permiten grabaciones"],
        venue: {
          city: "Lima",
          address: "Av. Javier Prado Este 4200, Santiago de Surco",
          reference: "Al costado del Centro Comercial Jockey Plaza",
          capacity: 5000,
        },
        dates: [
          {
            startAt: "2024-12-15T20:00:00-05:00",
            endAt: "2024-12-15T23:59:00-05:00",
          },
          {
            startAt: "2024-12-16T20:00:00-05:00",
            endAt: "2024-12-16T23:59:00-05:00",
          },
        ],
        zones: [
          {
            name: "VIP",
            currency: "PEN",
            basePrice: 250,
            capacity: 500,
            allocations: [
              { audienceName: "Adulto", discountPercent: 0, allocatedQuantity: 400 },
              { audienceName: "Estudiante", discountPercent: 15, allocatedQuantity: 100 },
            ],
          },
          {
            name: "General",
            currency: "PEN",
            basePrice: 100,
            capacity: 4500,
            allocations: [
              { audienceName: "Adulto", discountPercent: 0, allocatedQuantity: 4000 },
              { audienceName: "Estudiante", discountPercent: 20, allocatedQuantity: 500 },
            ],
          },
        ],
        salePhases: [
          {
            name: "Preventa",
            startAt: "2024-11-01T00:00:00.000Z",
            endAt: "2024-11-30T23:59:59.999Z",
            percentage: -25,
          },
          {
            name: "Venta Regular",
            startAt: "2024-12-01T00:00:00.000Z",
            endAt: "2024-12-14T23:59:59.999Z",
            percentage: 0,
          },
        ],
      },
      2: {
        title: "Festival de Jazz",
        description: "El mejor jazz internacional llega a Cusco con artistas de talla mundial.",
        categories: [2],
        extraInfo: "Evento familiar. Estacionamiento disponible.",
        restrictions: ["Prohibido fumar", "No se permiten mascotas"],
        venue: {
          city: "Cusco",
          address: "Plaza de Armas s/n, Centro Histórico",
          reference: "Frente a la Catedral",
          capacity: 2000,
        },
        dates: [
          {
            startAt: "2024-11-20T19:00:00-05:00",
            endAt: "2024-11-20T22:00:00-05:00",
          },
        ],
        zones: [
          {
            name: "Preferente",
            currency: "PEN",
            basePrice: 180,
            capacity: 800,
            allocations: [
              { audienceName: "General", discountPercent: 0, allocatedQuantity: 800 },
            ],
          },
          {
            name: "Popular",
            currency: "PEN",
            basePrice: 80,
            capacity: 1200,
            allocations: [
              { audienceName: "General", discountPercent: 0, allocatedQuantity: 1000 },
              { audienceName: "Niños", discountPercent: 50, allocatedQuantity: 200 },
            ],
          },
        ],
        salePhases: [
          {
            name: "Early Bird",
            startAt: "2024-10-01T00:00:00.000Z",
            endAt: "2024-10-31T23:59:59.999Z",
            percentage: -30,
          },
        ],
      },
    };

    return eventDataMap[eventId] || eventDataMap[1];
  };

  const handleSelect = () => {
    if (selectedEventId) {
      const eventData = getEventData(selectedEventId);
      onSelectEvent(eventData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DocumentDuplicateIcon className="h-7 w-7" />
              <h2 className="text-2xl font-bold">Copiar Configuración</h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-white/20 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-2 text-purple-100 text-sm">
            Selecciona un evento para copiar su configuración
          </p>
        </div>

        {/* Event List */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-200px)]">
          <div className="space-y-3">
            {dummyEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEventId(event.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  selectedEventId === event.id
                    ? "border-purple-600 bg-purple-50 shadow-md"
                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {event.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        📅 {new Date(event.date).toLocaleDateString("es-PE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        📍 {event.venue.city}
                      </span>
                    </div>
                  </div>
                  {selectedEventId === event.id && (
                    <div className="ml-4">
                      <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6">
          <div className="flex gap-3 justify-end">
            <BotonCTA
            onClick={onClose}
            variant="ghost"
          >
            Cancelar
          </BotonCTA>
          <BotonCTA
            onClick={handleSelect}
            disabled={!selectedEventId}
            variant="pink"
          >
            Aceptar
          </BotonCTA>
          </div>
        </div>
      </div>
    </div>
  );
}