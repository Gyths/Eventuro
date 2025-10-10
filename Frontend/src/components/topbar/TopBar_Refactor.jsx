import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FilterPill from "./items/FilterPill";
import Linker from "./items/Linker";
import CategorySelector from "./items/CategorySelector";
import DateRangeSelector from "./items/DateRangeSelector";
import LocationSelector from "./items/LocationSelector";
import logo from "../../assets/logoB.svg";
import { UserIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import TimerTopBar from "./items/TimerTopBar";

/**
 * Props:
 * - isLoggedIn: boolean
 * - onSearch(query), onFiltersChange({category, dateFrom, dateTo, location})
 * - onLogin(), onRegister(), onProfile(), onMyTickets(), onClaims(), onLogout()
 */

export default function TopBarRefactor({
  validation,
  routes,
  onFunctions,
  topBarConfig,
  children,
  /*isLoggedIn = false,
  onSearch,
  filters,
  onFiltersChange,
  onLogin,
  onRegister,
  onProfile,
  onMyTickets,
  onClaims,
  onLogout,*/
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

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full shadow-[0_2px_18px_rgba(0,0,0,0.12)]"
      style={{
        background:
          "linear-gradient(90deg, #2A0243 0%, #6408A2 60%, #2A0243 100%)",
      }}
    >
      <div className="flex w-full items-center justify-between px-6 py-3">
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
      </div>
      {children}
    </header>
  );
}
