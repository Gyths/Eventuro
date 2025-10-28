// src/layout/RootLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../components/topbar/TopBar";
import PaymentVariant from "../components/topbar/variants/PaymentVariant";
import TopBarRoles from "../components/topbar/TopBarRoles"; // 👈 nuevo topbar unificado
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

  // Map de tipos de barra
  const layout_type = new Map();
  layout_type.set(
    "roles",
    <TopBarRoles filters={filters} setFilters={setFilters} />
  );
  layout_type.set("payment", <PaymentVariant />);

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
