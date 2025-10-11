// src/layout/RootLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import TopBar_Refactor from "../components/topbar/TopBar_Refactor";
import UserVariant from "./variants/UserVariant";
import OrganizerVariant from "./variants/OrganizerVariant";
import PaymentVariant from "./variants/PaymentVariant";
import { useAuth } from "../services/auth/AuthContext";

export default function RootLayout() {
  const { isAuthenticated, logout } = useAuth();
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
    if (!isAuthenticated) {
      setVariant("client");
      return;
    }

    switch (user?.userType) {
      case "O": // Organizador
        setVariant("organizer");
        break;
      default: // Cliente
        setVariant("client");
        break;
    }

    // También puedes forzar un layout por ruta si lo prefieres
    if (pathname.startsWith("/pago")) {
      setLayoutType("payment");
    }
  }, [user, pathname, isAuthenticated]);

  let layout_type = new Map();
  layout_type.set("client", <UserVariant></UserVariant>);
  layout_type.set("organizer", <OrganizerVariant></OrganizerVariant>);
  layout_type.set("payment", <PaymentVariant></PaymentVariant>);

  let type;
  return (
    <>
      {!hideTop && <TopBar_Refactor>layout_type.get(type)</TopBar_Refactor>}

      {/* Si ocultas la TopBar, no pongas padding superior */}
      <main className={hideTop ? "" : "pt-14"}>
        {/* carga de filtros */}
        <Outlet context={{ filters }} />
      </main>
    </>
  );
}
