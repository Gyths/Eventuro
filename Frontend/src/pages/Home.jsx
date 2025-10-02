// src/pages/Home.jsx
// Home.jsx
import { useOutletContext } from "react-router-dom";
import BannerCarousel from "../components/BannerCarousel.jsx";
import EventCard from "../components/EventCard.jsx";

const imagesDemo = [
  "/banners/banner1.jpg",
  "/banners/banner2.jpg",
  "/banners/banner3.jpg",
];

const eventosDemo = [
  { id: 1, titulo: "Concierto de Rock", fecha: "2025-10-10", lugar: "Lima", category: "Música", imagen: "/img/evento1.jpg" }, // se agregó categorias
  { id: 2, titulo: "Feria Gastronómica", fecha: "2025-11-05", lugar: "Cusco", category: "Comida", imagen: "/img/evento2.jpg" },
  { id: 3, titulo: "Startup Summit", fecha: "2025-11-20", lugar: "Arequipa", category: "Seminarios", imagen: "/img/evento3.jpg" },
  { id: 4, titulo: "Expo Arte",        fecha: "2025-12-02", lugar: "Trujillo", category: "Seminarios", imagen: "/img/evento4.jpg" },
  { id: 5, titulo: "Maratón 10K",      fecha: "2025-12-15", lugar: "Lima", category: "Seminarios", imagen: "/img/evento5.jpg" },
];

export default function Home() {
  const { filters } = useOutletContext(); //recibimos los filtros

  const filteredEvents = eventosDemo.filter((e) => {
    let ok = true;

    if (filters.category) ok = ok && e.category === filters.category; //validacion de filtros
    if (filters.location) ok = ok && e.lugar.toLowerCase().includes(filters.location.toLowerCase());
    if (filters.dateFrom) ok = ok && new Date(e.fecha) >= new Date(filters.dateFrom);
    if (filters.dateTo) ok = ok && new Date(e.fecha) <= new Date(filters.dateTo);

    return ok;
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      {/* Grid maestro: 4 columnas grandes, con gap consistente */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
         {/* Banner ocupa las 4 columnas en pantallas grandes */}
        <div className="lg:col-span-4">
          <BannerCarousel
            images={imagesDemo}
            interval={5000}
            showArrows={false}  // ← sin flechas
            heightClass="h-48 md:h-64 lg:h-72" // alto más contenido
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Cards: 4 por fila en lg, 3 en md, 2 en sm */}
        {filteredEvents.length > 0 ? (
          filteredEvents.map((e) => (
            <div key={e.id} className="col-span-1">
              <EventCard evento={e} />
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No hay eventos que coincidan con los filtros seleccionados.
          </p>
        )}
      </div>
    </section>
  );
}
