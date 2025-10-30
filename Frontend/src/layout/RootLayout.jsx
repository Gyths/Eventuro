// src/layout/RootLayout.jsx
import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import TopBar from "../components/topbar/TopBar";
import TopBarRoles from "../components/topbar/TopBarRoles";
import PaymentVariant from "../components/topbar/variants/PaymentVariant";
import { useAuth } from "../services/auth/AuthContext";

export default function RootLayout() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  // Oculta el topbar en login/registro
  const hideTop = pathname === "/login" || pathname === "/registro";

  // Filtros globales de búsqueda
  const [filters, setFilters] = useState({
    category: null,
    dateFrom: null,
    dateTo: null,
    location: "",
  });

  // Scroll arriba al cambiar de ruta
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  // Solo conserva el topbar de pago como excepción
  const variant = useMemo(() => {
    return pathname === "/pago" ? "payment" : "roles";
  }, [pathname]);

  // Mapa de tipos de layout
  const layout_type = new Map();
  layout_type.set(
    "roles",
    <TopBarRoles filters={filters} setFilters={setFilters} showLogo={false} />
  );
  layout_type.set("payment", <PaymentVariant />);

  return (
    <>
      {!hideTop && <TopBar>{layout_type.get(variant)}</TopBar>}

      <main className={hideTop ? "" : "pt-14"}>
        <Outlet context={{ filters }} />
      </main>
    </>
  );
}
