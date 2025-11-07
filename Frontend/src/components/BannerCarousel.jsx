// src/components/BannerCarousel.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useEvent from "../services/Event/EventContext";

export default function BannerCarousel({
  images = [],
  interval = 5000,
  className = "",
  heightClass = "h-64 md:h-80 lg:h-96",
  showArrows = true,          // ← NUEVO
}) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const touch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (images.length <= 1) return;
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, images]);

  function start() {
    stop();
    timer.current = setTimeout(() => {
      setIdx((i) => (i + 1) % images.length);
    }, interval);
  }
  function stop() {
    if (timer.current) clearTimeout(timer.current);
  }

  const go = (i) => setIdx(((i % images.length) + images.length) % images.length);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, images.length]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
    stop();
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx > 0 ? prev() : next();
    } else {
      start();
    }
  };

  if (!images?.length) return null;

  const navigate = useNavigate();
  const ticketSelectionPage = "/seleccionTickets";
  const { setEvent } = useEvent();
  function onClick(itemId) {
    setEvent({
      eventId: itemId,
    });
    navigate(ticketSelectionPage);
  }

  return (
    <section
      className={`relative w-full overflow-hidden ${heightClass} ${className}`}
      onMouseEnter={stop}
      onMouseLeave={start}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      <div
        className="flex h-full w-full transition-transform duration-500 will-change-transform"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {images.map((item, i) => (
          <div
            key={item.id || i}
            className="relative h-full w-full shrink-0 cursor-pointer"
            aria-hidden={i !== idx}
            onClick={() => onClick(item.id)}
          >
            <img
              src={item.image}
              alt={item.title || `Banner ${i + 1}`}
              className="h-full w-full object-cover"
            />
            {/* Capa oscura + texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-semibold drop-shadow-md truncate">
                {item.title || "Evento destacado"}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Flechas (solo si showArrows) */}
      {showArrows && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-white backdrop-blur hover:bg-black/45"
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-white backdrop-blur hover:bg-black/45"
            aria-label="Siguiente"
          >
            ›
          </button>
        </>
      )}

      {/* Dots (para navegar) */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1 backdrop-blur">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`pointer-events-auto h-2.5 w-2.5 rounded-full transition ${
                i === idx ? "bg-white" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
