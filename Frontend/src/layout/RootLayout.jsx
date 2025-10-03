// src/layout/RootLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import TopBar from "../components/topbar/TopBar";
import { useAuth } from "../services/auth/AuthContext";

export default function RootLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const hideTop = pathname === "/login" || pathname === "/registro";

  //estado global para filtros
  const [filters, setFilters] = useState({
    category: null,
    dateFrom: null,
    dateTo: null,
    location: "",
  });

  return (
    <>
      {!hideTop && (
        <TopBar
          isLoggedIn={isAuthenticated}
          onLogin={() => navigate("/login")}
          onRegister={() => navigate("/registro")}
          onProfile={() => navigate("/")}
          onMyTickets={() => navigate("/")}
          onClaims={() => navigate("/")}
          onLogout={() => {
            logout();
            navigate("/", { replace: true });
          }}
          //recibe cambios desde TopBar
          filters={filters} // pasa el estado actual
          onFiltersChange={setFilters} // pasa el setter
        />
      )}

      {/* Si ocultas la TopBar, no pongas padding superior */}
      <main className={hideTop ? "" : "pt-[72px]"}>
        {/* carga de filtros */}
        <Outlet context={{ filters }} />
      </main>
    </>
  );
}
