// src/layout/RootLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../components/topbar/TopBar";
import UserVariant from "../components/topbar/variants/UserVariant";
import OrganizerVariant from "../components/topbar/variants/OrganizerVariant";
import PaymentVariant from "../components/topbar/variants/PaymentVariant";
import AdminVariant from "../components/topbar/variants/AdminVariant";
import { useAuth } from "../services/auth/AuthContext";

export default function RootLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const hideTop = pathname === "/login" || pathname === "/registro";
  const [filters, setFilters] = useState({
    category: null,
    dateFrom: null,
    dateTo: null,
    location: "",
  });

  const [variant, setVariant] = useState("client");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // o "auto" si prefieres sin animación
    });
  }, [pathname]);

  //useEffect que decide que tipo de topbar utilizar
  useEffect(() => {
    const roles = user?.roles || [];

    // Prioridad 1: Rutas especiales (como Pago)
    if (pathname === "/pago") {
      //
      setVariant("payment");
    }
    // Prioridad 2: Rutas de Administrador
    // (Solo muestra 'admin' SI la ruta empieza con /admin)
    else if (pathname.startsWith("/admin") && roles.includes("ADMIN")) {
      setVariant("admin");
    }
    // Prioridad 3: Rutas de Organizador
    // (Solo muestra 'organizer' SI la ruta es de organizador)
    else if (
      pathname.startsWith("/crearEvento") &&
      roles.includes("ORGANIZER")
    ) {
      setVariant("organizer");
    }
    // Por defecto: Cliente/Comprador
    else {
      setVariant("client");
    }
  }, [user, pathname, isAuthenticated]); //

  let layout_type = new Map();
  layout_type.set(
    "client",
    <UserVariant filters={filters} setFilters={setFilters}></UserVariant>
  );
  layout_type.set("organizer", <OrganizerVariant></OrganizerVariant>);
  layout_type.set("payment", <PaymentVariant></PaymentVariant>);
  layout_type.set("admin", <AdminVariant></AdminVariant>);

  return (
    <>
      {!hideTop && <TopBar>{layout_type.get(variant)}</TopBar>}

      {/* Si ocultas la TopBar, no pongas padding superior */}
      <main className={hideTop ? "" : "pt-14"}>
        {/* carga de filtros */}
        <Outlet context={{ filters }} />
      </main>
    </>
  );
}
