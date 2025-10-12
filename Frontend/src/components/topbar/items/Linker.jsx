// src/components/common/Linker.jsx
import { Link, useLocation } from "react-router-dom";
import {
  CalendarDaysIcon,
  Squares2X2Icon,
  MapPinIcon,
  PresentationChartBarIcon,
  ChartBarIcon,
  PlusCircleIcon,
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  TicketIcon,
  MegaphoneIcon,
  LifebuoyIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const ICONS = {
  // Claves que ya usabas en FilterPill
  date: CalendarDaysIcon,
  category: Squares2X2Icon,
  location: MapPinIcon,

  // Navegación/acciones
  "chart-bar": PresentationChartBarIcon, // o ChartBarIcon
  "calendar-days": CalendarDaysIcon,
  "plus-circle": PlusCircleIcon,
  "user-plus": UserPlusIcon,
  "arrow-right-on-rectangle": ArrowRightOnRectangleIcon,
  "arrow-left-on-rectangle": ArrowLeftOnRectangleIcon,
  "adjustments-horizontal": AdjustmentsHorizontalIcon,
  ticket: TicketIcon,
  megaphone: MegaphoneIcon,
  lifebuoy: LifebuoyIcon,
  "user-circle": UserCircleIcon,
  cog: Cog6ToothIcon,
  home: HomeIcon,
  sparkles: SparklesIcon,
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Linker: pill de navegación con el MISMO estilo que FilterPill.
 *
 * Props:
 * - label: string
 * - icon: string (clave del mapa ICONS, ej. "chart-bar", "calendar-days")
 * - to: string (ruta interna SPA o URL externa)
 * - exact?: boolean (true = activo solo si pathname === to)
 * - className?: string
 */
export default function Linker({
  label,
  icon,
  to,
  exact = false,
  className = "",
}) {
  const { pathname } = useLocation();
  const Icon = ICONS[(icon || "").toLowerCase()] || AdjustmentsHorizontalIcon;

  const isActive = to
    ? exact
      ? pathname === to
      : pathname.startsWith(to)
    : false;

  // === Estilo idéntico al FilterPill ===
  const base =
    "flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10";
  const active = isActive ? "bg-white/10" : "";

  const classes = cx(base, active, className);

  const content = (
    <>
      {Icon && <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />}
      <span className="truncate">{label}</span>
    </>
  );

  // Soporte para links externos
  if (to && /^https?:\/\//i.test(to)) {
    return (
      <a href={to} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  // Ruta interna SPA
  if (to) {
    return (
      <Link to={to} className={classes} aria-current={isActive ? "page" : undefined}>
        {content}
      </Link>
    );
  }

  // Sin 'to' (por si lo usas como botón momentáneamente)
  return (
    <button type="button" className={classes}>
      {content}
    </button>
  );
}