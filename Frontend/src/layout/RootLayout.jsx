// src/layout/RootLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../components/topbar/TopBar";
import PaymentVariant from "../components/topbar/variants/PaymentVariant";
import TopBarRoles from "../components/topbar/TopBarRoles"; 
import AdminVariant from "../components/topbar/variants/AdminVariant";
import { useAuth } from "../services/auth/AuthContext";

export default function RootLayout() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Oculta el topbar en login/registro
  const hideTop = pathname === "/login" || pathname === "/registro";

  // Filtros globales de búsqueda
  const [filters, setFilters] = useState({
    category: null,
    dateFrom: null,
    dateTo: null,
    location: "",
  });

  // Variante de layout (solo dejamos pago aparte)
  const [variant, setVariant] = useState("roles");

  // Al cambiar de ruta, desplazamiento arriba
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Determinar qué tipo de barra mostrar
  useEffect(() => {
    // Si estamos en la página de pago → usar PaymentVariant
    if (pathname === "/pago") {
      setVariant("payment");
      return;
    }

    // En cualquier otra ruta → usar la nueva barra unificada
    setVariant("roles");
  }, [user, pathname, isAuthenticated]);
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

  // Map de tipos de barra
  const layout_type = new Map();
  layout_type.set(
    "roles",
    <TopBarRoles filters={filters} setFilters={setFilters} />
  );
  layout_type.set("payment", <PaymentVariant />);
  layout_type.set("organizer", <OrganizerVariant></OrganizerVariant>);
  layout_type.set("payment", <PaymentVariant></PaymentVariant>);
  layout_type.set("admin", <AdminVariant></AdminVariant>);

  return (
    <>
      {/* Solo mostrar el TopBar si no está oculto */}
      {!hideTop && <TopBar>{layout_type.get(variant)}</TopBar>}

      {/* Main con padding superior si hay topbar */}
      <main className={hideTop ? "" : "pt-14"}>
        <Outlet context={{ filters }} />
      </main>
    </>
  );
}
