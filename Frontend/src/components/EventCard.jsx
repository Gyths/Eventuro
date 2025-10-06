import React from "react";

export default function EventCard({
  image,
  title = "Evento",
  location = "Ubicación del evento",
  startDate,
  endDate,
  hour = "16:00",
  onClick,
  className = "",
}) {
  const s = startDate ? new Date(startDate) : new Date();
  const e = endDate ? new Date(endDate) : new Date(s.getTime() + 2 * 86400000);

  const sDay = s.getDate();
  const eDay = e.getDate();
  const month = s.toLocaleString("es", { month: "short" }).toUpperCase(); // JUL
  const year = s.getFullYear();

  const hh = (hour || "00:00").split(":")[0];
  const mm = (hour || "00:00").split(":")[1] || "00";

  return (
    <article
      onClick={onClick}
      className={`cursor-pointer select-none rounded-2xl bg-white shadow-md transition hover:shadow-lg ${className}`}
    >
      {/* Imagen */}
      <div className="p-3">
        <div className="overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="h-40 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="px-5 pb-5">
        {/* Título */}
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>

        {/* Ubicación */}
        <div className="mt-1 flex items-start gap-1.5 text-[13px] text-gray-600">
          <svg
            className="mt-[2px] h-4 w-4 text-red-500"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span>{location}</span>
        </div>

        {/* Fecha y hora */}
        <div className="mt-4 flex items-start justify-between">
          {/* 14–16  JUL 2025  (alineado por línea base) */}
          <div className="flex items-baseline gap-2">
            <div className="flex items-baseline gap-2 leading-none">
              <span className="text-3xl font-semibold text-gray-900">{sDay}</span>
              <span className="text-3xl font-semibold text-gray-900">–</span>
              <span className="text-3xl font-semibold text-gray-900">{eDay}</span>
            </div>
            <span className="text-xs font-medium uppercase tracking-wide text-gray-600">
              {month} {year}
            </span>
          </div>

          {/* 16^00 horas (superíndice alineado) */}
          <div className="text-right leading-none text-gray-900">
            <div className="flex items-baseline justify-end">
              <span className="text-3xl font-semibold">{hh}</span>
              <span className="ml-[2px] text-[10px] font-semibold relative -top-1">
                {mm}
              </span>
            </div>
            <div className="mt-[2px] text-[11px] tracking-wide text-gray-500">
              horas
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
