// src/pages/MyCalendar.jsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAuth } from '../services/auth/AuthContext.jsx';
import { BASE_URL } from '../config.js';




// ---------- Helpers ----------
function toYMD(dateStrOrDate) {
  if (!dateStrOrDate) return null;
  const d = new Date(dateStrOrDate);
  // ISO día puro (UTC) para evitar “correr” la fecha por zona horaria
  return d.toISOString().slice(0, 10);
}

function fmtDateTime(d) {
  if (!d) return '';
  const date = new Date(d);
  const dia = date.toLocaleDateString('es-PE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const hora = date.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${dia} · ${hora}`;
}

function badgeColor(category) {
  // Colores suaves por categoría
  const map = {
    Música: 'bg-pink-100 text-pink-700',
    Teatro: 'bg-purple-100 text-purple-700',
    Deportes: 'bg-indigo-100 text-indigo-700',
    Conferencias: 'bg-teal-100 text-teal-700',
  };
  return map[category] || 'bg-gray-100 text-gray-700';
}

// ---------- Componente ----------
export default function MyCalendar() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);        // eventos para FullCalendar
  const [selected, setSelected] = useState(null);  // evento seleccionado (panel derecho)
  const [error, setError] = useState('');

  // -------- Fetch tickets del usuario y mapear a eventos --------
  useEffect(() => {
    let abort = false;

    async function load() {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(`${BASE_URL}/eventuro/api/tickets/mine`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        let data;
        if (res.ok) {
          data = await res.json();
        } else {
          // Si aún no tienes endpoint: dataset de ejemplo
          data = demoTickets();
        }

        if (abort) return;

        // Esperamos estructura tipo:
        // ticket: { ticketId, event: { title, venue, categories, dates[]: {startAt,endAt} , image } }
        const mapped = [];
        for (const t of data) {
          const ev = t.event || {};
          const dates = Array.isArray(ev.dates) ? ev.dates : [];
          for (const d of dates) {
            // Crear un "evento de calendario" por cada fecha (performance OK para cantidades típicas de usuario)
            mapped.push({
              id: String(t.ticketId) + '_' + (d.startAt || Math.random()),
              title: ev.title || 'Evento',
              start: toYMD(d.startAt),             // día completo
              end: toYMD(d.endAt) || toYMD(d.startAt),
              extendedProps: {
                // todo lo necesario para el panel
                ticketId: t.ticketId,
                image: ev.image || '/banners/banner1.jpg',
                location:
                  ev?.venue
                    ? [
                        ev.venue.city,
                        ev.venue.address || ev.venue.reference || 'Ubicación',
                      ]
                        .filter(Boolean)
                        .join(' — ')
                    : 'Ubicación',
                locationUrl: ev?.venue?.addressUrl || '',
                startAt: d.startAt,
                endAt: d.endAt,
                categories:
                  ev.categories?.map((c) => c?.category?.description).filter(Boolean) ||
                  [],
              },
            });
          }
        }

        setEvents(mapped);
      } catch (e) {
        if (!abort) {
          setError('No se pudieron cargar tus eventos.');
          // dataset de ejemplo como fallback
          setEvents(mapDemoToEvents(demoTickets()));
        }
      } finally {
        if (!abort) setLoading(false);
      }
    }

    load();
    return () => {
      abort = true;
    };
  }, [token]);

  // Selección inicial (primero del mes con evento)
  const firstEvent = useMemo(() => events[0] || null, [events]);
  useEffect(() => {
    setSelected(firstEvent);
  }, [firstEvent]);

  // -------- Handlers FullCalendar --------
  function onEventClick(info) {
    // info.event contiene los datos; usar .extendedProps
    const ev = info.event;
    setSelected({
      id: ev.id,
      title: ev.title,
      start: ev.start,
      end: ev.end,
      extendedProps: ev.extendedProps,
    });
  }

  // -------- UI principal --------
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Mi calendario de eventos</h1>

        </div>

        <button
          className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-4 py-2 text-white font-semibold shadow hover:opacity-90 transition"
          onClick={() => navigate('/misTickets')}
        >
          ← Volver a Mis tickets
        </button>
      </div>

      {/* Contenido: calendario + panel lateral */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Calendario */}
        <div className="lg:col-span-2 rounded-2xl bg-white p-3 shadow">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Cargando calendario…</div>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: '',
              }}
              height="auto"
              fixedWeekCount={false}
              showNonCurrentDates={false}
              events={events}
              eventClick={onEventClick}
              dayMaxEventRows={3}
              eventDisplay="block"
              eventContent={renderEventContent}
              firstDay={1} // lunes
            />
          )}
        </div>

        {/* Panel lateral de detalle */}
        <aside className="rounded-2xl bg-white p-4 shadow">
          {!selected ? (
            <div className="text-sm text-gray-500">
              Selecciona un evento en el calendario para ver su detalle.
            </div>
          ) : (
            <EventDetailCard selected={selected} onOpenTicket={() => navigate('/mis-tickets')} />
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
              {error}
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

// ---------- Render del evento dentro del día (FullCalendar) ----------
function renderEventContent(arg) {
  const cats = arg.event.extendedProps?.categories || [];
  const badge = cats[0] ? badgeColor(cats[0]) : 'bg-gray-100 text-gray-700';

  return (
    <div className="truncate leading-tight">
      <span className={`mr-1 inline-block rounded px-1.5 py-[1px] text-[10px] ${badge}`}>
        {cats[0] || 'Evento'}
      </span>
      <span className="text-[12px] font-medium text-gray-800">{arg.event.title}</span>
    </div>
  );
}

// ---------- Panel lateral ----------
function EventDetailCard({ selected, onOpenTicket }) {
  const p = selected.extendedProps || {};
  const hasEnd = !!p.endAt;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-xl">
        <img
          src={p.image || '/banners/banner1.jpg'}
          alt={selected.title}
          className="h-40 w-full object-cover"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">{selected.title}</h3>
        <div className="mt-1 flex items-start gap-1.5 text-sm text-gray-600">
          <svg className="mt-[2px] h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
          <a
            href={p.locationUrl || '#'}
            target={p.locationUrl ? '_blank' : undefined}
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-4"
          >
            {p.location || 'Ubicación'}
          </a>
        </div>

        <div className="mt-2 text-sm text-gray-700">
          <div>Inicio: {fmtDateTime(p.startAt)}</div>
          {hasEnd && <div>Fin: {fmtDateTime(p.endAt)}</div>}
        </div>

        {/* Categorías */}
        {Array.isArray(p.categories) && p.categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {p.categories.map((c) => (
              <span key={c} className={`rounded-full px-2 py-[2px] text-xs ${badgeColor(c)}`}>
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3">


      </div>
    </div>
  );
}

// ---------- Datos demo (por si aún no hay backend listo) ----------
function demoTickets() {
  return [
    {
      ticketId: 101,
      event: {
        title: 'Chocolatada 3.0',
        image: '/banners/banner2.jpg',
        venue: {
          city: 'Lima',
          address: 'Av. Principal 123, Piso 4',
          addressUrl:
            'https://www.google.com/maps/place/Av.+Principal+123,+Lima',
        },
        categories: [{ category: { description: 'Música' } }],
        dates: [
          { startAt: '2025-10-10T19:00:00Z', endAt: '2025-10-10T22:00:00Z' },
          { startAt: '2025-11-22T19:00:00Z', endAt: '2025-11-22T22:00:00Z' },
        ],
      },
    },
    {
      ticketId: 102,
      event: {
        title: 'Conferencia JS',
        image: '/banners/banner3.jpg',
        venue: {
          city: 'Cusco',
          address: 'Calle Montaña 456',
        },
        categories: [{ category: { description: 'Conferencias' } }],
        dates: [{ startAt: '2025-10-18T17:30:00Z', endAt: '2025-10-18T20:00:00Z' }],
      },
    },
  ];
}

function mapDemoToEvents(data) {
  const out = [];
  for (const t of data) {
    const ev = t.event || {};
    const dates = Array.isArray(ev.dates) ? ev.dates : [];
    for (const d of dates) {
      out.push({
        id: String(t.ticketId) + '_' + (d.startAt || Math.random()),
        title: ev.title || 'Evento',
        start: toYMD(d.startAt),
        end: toYMD(d.endAt) || toYMD(d.startAt),
        extendedProps: {
          ticketId: t.ticketId,
          image: ev.image || '/banners/banner1.jpg',
          location: [ev?.venue?.city, ev?.venue?.address].filter(Boolean).join(' — ') || 'Ubicación',
          locationUrl: ev?.venue?.addressUrl || '',
          startAt: d.startAt,
          endAt: d.endAt,
          categories: ev.categories?.map((c) => c?.category?.description).filter(Boolean) || [],
        },
      });
    }
  }
  return out;
}
