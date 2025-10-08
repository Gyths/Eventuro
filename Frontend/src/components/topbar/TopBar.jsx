import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterPill from "./FilterPill";
import Linker from "./Linker";
import CategorySelector from "./panels/CategorySelector";
import DateRangeSelector from "./panels/DateRangeSelector";
import LocationSelector from "./panels/LocationSelector";
import logo from "../../assets/logoB.svg";
import { UserIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import TimerTopBar from "./TimerTopBar";

/**
 * Props:
 * - isLoggedIn: boolean
 * - onSearch(query), onFiltersChange({category, dateFrom, dateTo, location})
 * - onLogin(), onRegister(), onProfile(), onMyTickets(), onClaims(), onLogout()
 */

export default function TopBar({
  isLoggedIn = false,
  onSearch,
  filters,
  onFiltersChange,
  onLogin,
  onRegister,
  onProfile,
  onMyTickets,
  onClaims,
  onLogout,
}) {
  const paymentPageRoute = "/pago";
  const disabledPaths = [paymentPageRoute];
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const variant = pathname === paymentPageRoute ? "paymentPage" : "default";
  const isCreateEvent =
    pathname.startsWith("/crearEvento") || pathname.startsWith("/CrearEvento");
  const [query, setQuery] = useState("");
  /*const [filters, setFilters] = useState({ //evitaamos duplicar estaado
    category: null,
    dateFrom: null,
    dateTo: null,
    location: "",
  });*/

  function updateFilters(patch) {
    const next = { ...filters, ...patch };
    /*setFilters(next);*/ //evitamos setear doblemente
    onFiltersChange?.(next);
  }

  if (variant === "paymentPage") {
    return (
      <header
        className="fixed inset-x-0 top-0 z-50 w-full shadow-[0_2px_18px_rgba(0,0,0,0.12)]"
        style={{
          background:
            "linear-gradient(90deg, #2A0243 0%, #6408A2 60%, #2A0243 100%)",
        }}
      >
        <div className="flex w-full items-center justify-between px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Eventuro"
              className="h-8 w-auto cursor-pointer"
              onClick={() => {
                !disabledPaths.includes(location.pathname) && navigate("/home");
              }}
            />
          </div>

          {/* Contador */}
          <TimerTopBar></TimerTopBar>
        </div>
      </header>
    );
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full shadow-[0_2px_18px_rgba(0,0,0,0.12)]"
      style={{
        background:
          "linear-gradient(90deg, #2A0243 0%, #6408A2 60%, #2A0243 100%)",
      }}
    >
      <div className="flex w-full items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Eventuro"
            className="h-8 w-auto cursor-pointer"
            onClick={() => {
              !disabledPaths.includes(location.pathname) && navigate("/home");
            }}
          />
        </div>
        {/* Center: Search + Filters */}
        {!isCreateEvent ? (
          <div className="flex flex-1 items-center gap-4 px-6">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                placeholder="Search..."
                className="w-full rounded-full border border-white/20 bg-white/95 px-4 py-2 text-sm outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-violet-400"
              />
            </div>

            {/* Filters */}
            <div className="hidden items-center gap-2 md:flex">
              <FilterPill label="Categoria" icon="category">
                <CategorySelector
                  value={filters.category}
                  onChange={(category) => updateFilters({ category })}
                />
              </FilterPill>
              <FilterPill label="Fecha" icon="date">
                <DateRangeSelector
                  from={filters.dateFrom}
                  to={filters.dateTo}
                  onChange={({ from, to }) =>
                    updateFilters({ dateFrom: from, dateTo: to })
                  }
                />
              </FilterPill>
              <FilterPill label="Ubicación" icon="location">
                <LocationSelector
                  value={filters.location}
                  onChange={(location) => updateFilters({ location })}
                />
              </FilterPill>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center gap-4 px-6">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                placeholder="Search..."
                className="w-full rounded-full border border-white/20 bg-white/95 px-4 py-2 text-sm outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-violet-400"
              />
            </div>

            {/* Filters */}
            <div className="hidden items-center gap-2 md:flex">
              <Linker
                label="Reportes"
                icon="chart-bar"
                to="/reports"
                activeMatch="/reports"
              />
              <Linker
                label="Mis Eventos"
                icon="calendar-days"
                to="/my-events"
                activeMatch="/my-events"
              />
              <Linker
                label="Crear Evento"
                icon="plus-circle"
                to="/create_event"
                activeMatch="/create_event"
              />
            </div>
          </div>
        )}

        {/* Right: User */}
        {isCreateEvent ? (
          <div>
            <UserMenu
              onProfile={onProfile}
              onMyTickets={onMyTickets}
              onClaims={onClaims}
              onLogout={onLogout}
            />
          </div>
        ) : (
          <div>
            {isLoggedIn ? (
              <UserMenu
                onProfile={onProfile}
                onMyTickets={onMyTickets}
                onClaims={onClaims}
                onLogout={onLogout}
              />
            ) : (
              <AuthButtons onLogin={onLogin} onRegister={onRegister} />
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function AuthButtons({ onLogin, onRegister }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onRegister}
        className="rounded-full border border-amber-400/70 bg-transparent px-4 py-1.5 text-sm font-semibold text-amber-300 hover:bg-amber-400/10"
      >
        Registrarse
      </button>
      <button
        onClick={onLogin}
        className="rounded-full border border-amber-400/70 bg-amber-400/90 px-4 py-1.5 text-sm font-semibold text-purple-900 hover:bg-amber-400"
      >
        Iniciar Sesión
      </button>
    </div>
  );
}

function UserMenu({ onProfile, onMyTickets, onClaims, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15"
        aria-label="Abrir menú de usuario"
      >
        <UserIcon className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl">
          <MenuItem text="Configuración" onClick={onProfile} />
          <MenuItem text="Mis tickets" onClick={onMyTickets} />
          <MenuItem text="Reclamos" onClick={onClaims} />
          <div className="my-1 h-px bg-gray-100" />
          <MenuItem text="Cerrar sesión" danger onClick={onLogout} />
        </div>
      )}
    </div>
  );
}

function MenuItem({ text, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-800 hover:bg-gray-50"
      }`}
    >
      {text}
    </button>
  );
}
