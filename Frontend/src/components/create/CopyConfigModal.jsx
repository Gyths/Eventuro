import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import { XMarkIcon, DocumentDuplicateIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import BotonCTA from "../BotonCTA";
// --- Configuración y Funciones de Fetch ---

async function fetchEvents(idOrganizer) {
  const url = `${BASE_URL}/eventuro/api/event/events-by-organizer/${idOrganizer}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al cargar la lista de eventos. Código: ${response.status}`);
  }

  const data = await response.json();
  return data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

async function fetchEventDetails(eventId) {
  const url = `${BASE_URL}/eventuro/api/event/${eventId}/details`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al cargar los detalles del evento ${eventId}. Código: ${response.status}`);
  }

  const eventDetails = await response.json();
  return eventDetails;
}
// ------------------------------------------

/**
 * Función para simular la conversión de accessPolicy (código) a restrictions (lista de strings).
 * Esto es necesario para que el payload de salida coincida con el formato
 */
const mapAccessPolicyToRestrictions = (accessPolicyCode) => {
  // Mapeo simple de códigos a strings de restricción
  switch (accessPolicyCode) {
    case "AO": // Solo adultos 
      return ["soloAdultos"];
    case "T": // Adolescentes 
      return ["conUnAdulto"];
    case "E": // General 
    default:
      return ["General"];
  }
};

export default function CopyConfigModal({ isOpen, onClose, onSelectEvent, idOrganizer }) {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [loading, setLoading] = useState(false); // Cargar la lista de eventos
  const [loadingDetails, setLoadingDetails] = useState(false); // Cargar los detalles
  const [error, setError] = useState(null);

  // Carga la lista de eventos del organizador
  useEffect(() => {
    if (!isOpen || !idOrganizer) return;
    setLoading(true);
    setError(null);
    setEvents([]);
    setSelectedEventId(null);

    fetchEvents(idOrganizer)
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isOpen, idOrganizer]);

  const handleSelect = async () => {
    if (!selectedEventId) return;
    setLoadingDetails(true);
    setError(null);
    
    try {
      //Obtener el payload completo del backend
      const payload = await fetchEventDetails(selectedEventId);
    
      const allZones = payload.dates?.[0]?.zoneDates?.map(zoneDate => ({
        name: zoneDate.name,
        currency: zoneDate.currency,
        basePrice: zoneDate.basePrice,
        capacity: Number(zoneDate.capacity),
        allocations: zoneDate.allocations?.map(alloc => ({
            audienceName: alloc.audienceName,
            pricingMode: alloc.discountType === 'CASH' ? 'newPrice' : 'percent',
            discountValue: alloc.discountValue,
        })) || [],
      })) || [];


      // Construcción del objeto de configuración
      const copiedConfig = {
        title: payload.title ?? "Evento Copiado", // Se incluye el título para referenciaS.
        description: payload.description ?? "",
        extraInfo: payload.accessPolicyDescription ?? "",
        imagePrincipalKey: payload.imagePrincipalKey ?? null,
        imageBannerKey: payload.imageBannerKey ?? null,
        inPerson: payload.inPerson ?? true,
        imagePrincipalURLSigned: payload.imagePrincipalURLSigned ?? null,
        imageBannerURLSigned: payload.imageBannerURLSigned ?? null,

        // CONVERSIÓN DE ACCESS POLICY (código) a RESTRICTIONS (lista de strings)
        restrictions: mapAccessPolicyToRestrictions(
            payload.accessPolicy
        ),
        
        // Mapeo de Categorías: De array de objetos a array de IDs
        categories: Array.isArray(payload.categories)
          ? payload.categories.map((c) => Number(c.eventCategoryId))
          : [],
          
        // Configuración del lugar (Venue)
        venue: {
          city: payload.venue?.city ?? "",
          address: payload.venue?.address ?? "",
          reference: payload.venue?.reference ?? "",
          capacity: Number(payload.venue?.capacity ?? 0),
        },
        
        // Fechas del evento
        dates: payload.dates?.map((d) => ({ 
          startAt: d.startAt,
          endAt: d.endAt ?? d.startAt,
        })) ?? [],
        
        // Fases de Venta
        salePhases: payload.salesPhases ?? [], // Usamos 'salesPhases' si ese es el nombre del modelo
        
        // Zonas (aplanadas)
        zones: allZones, 
      };

      onSelectEvent(copiedConfig); // Enviar la configuración
      onClose();
      
    } catch (err) {
      console.error("Error en handleSelect:", err);
      setError("No se pudo copiar la configuración. Intente de nuevo.");
    } finally {
      setLoadingDetails(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-3xl shadow-2xl max-h-[80vh] overflow-hidden">
        {/* Header*/}
        <div className="sticky top-0 bg-[#5F0FBE] text-white p-6">
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
          {loading && <p className="text-center text-gray-500 py-8">Cargando eventos...</p>}
          {error && !loading && <p className="text-center text-red-500 py-4 font-semibold">{error}</p>}
          
          {!loading && !error && events.length === 0 && (
            <p className="text-center text-gray-500 py-8">No hay eventos previos de donde copiar la configuración.</p>
          )}
          
          <div className="space-y-3">
            {events.map((event) => (
              <button
                key={event.eventId}
                onClick={() => setSelectedEventId(event.eventId)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                  selectedEventId === event.eventId
                    ? "border-[#5F0FBE] bg-purple-50 shadow-md"
                    : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                }`}
                disabled={loadingDetails}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {event.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="h-4 w-4" /> 
                        Creado:{" "}
                        {new Date(event.createdAt).toLocaleDateString("es-PE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      {event.venue?.city && (
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          {event.venue.city}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedEventId === event.eventId && (
                    <div className="ml-4">
                      <div className="h-6 w-6 rounded-full bg-[#5F0FBE] flex items-center justify-center">
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
              Copiar Configuración
            </BotonCTA>
          </div>
        </div>
      </div>
    </div>
  );
}