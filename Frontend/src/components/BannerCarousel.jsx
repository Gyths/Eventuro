import { useEffect, useRef, useState } from "react";

/**
 * props:
 * - images: string[] (urls)
 * - interval: ms para autoplay (por defecto 5000)
 * - className: clases extra del contenedor
 * - heightClass: alto responsive (por defecto "h-64 md:h-80 lg:h-96")
 */
export default function BannerCarousel({
  images = [],
  interval = 5000,
  className = "",
  heightClass = "h-64 md:h-80 lg:h-96",
}) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const touch = useRef({ x: 0, y: 0 });

  // Autoplay
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

  // Navegación
  const go = (i) => setIdx(((i % images.length) + images.length) % images.length);
  const prev = () => go(idx - 1);
  const next = () => go(idx + 1);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, images.length]);

  // Touch (swipe)
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

  return (
    <section
      className={`relative w-full overflow-hidden ${heightClass} ${className}`}
      onMouseEnter={stop}
      onMouseLeave={start}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <div
        className="flex h-full w-full transition-transform duration-500 will-change-transform"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {images.map((src, i) => (
          <div className="relative h-full w-full shrink-0" key={i} aria-hidden={i !== idx}>
            <img src={src} alt={`Banner ${i + 1}`} className="h-full w-full object-cover" />
            {/* gradiente opcional para contraste */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
          </div>
        ))}
      </div>

      {/* Flechas (opcionales) */}
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

      {/* Dots centrados */}
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
