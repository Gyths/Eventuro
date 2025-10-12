// src/layout/RootLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../components/topbar/TopBar";
import UserVariant from "../components/topbar/variants/UserVariant";
import OrganizerVariant from "../components/topbar/variants/OrganizerVariant";
import PaymentVariant from "../components/topbar/variants/PaymentVariant";
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
    //Si esto no funciona, modificar para adpatar a la lógica de gestión de tipos de usuario
    switch (user?.userType) {
      case "O":
        setVariant("organizer");
        break;
      default:
        setVariant("client");
        break;
    }

    //Borrar esto cuando haya lógica para usuario administrador
    pathname === "/crearEvento" && setVariant("organizer");

    //No borrar esto
    pathname === "/pago" && setVariant("payment");
  }, [user, pathname, isAuthenticated]);

  let layout_type = new Map();
  layout_type.set(
    "client",
    <UserVariant filters={filters} setFilters={setFilters}></UserVariant>
  );
  layout_type.set("organizer", <OrganizerVariant></OrganizerVariant>);
  layout_type.set("payment", <PaymentVariant></PaymentVariant>);

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
