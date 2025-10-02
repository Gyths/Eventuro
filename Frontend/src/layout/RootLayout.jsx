// src/layout/RootLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom"; 
import TopBar from "../components/topbar/TopBar";
import { useAuth } from "../services/auth/AuthContext";

export default function RootLayout() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();                              

  const hideTop = pathname === "/login" || pathname === "/registro";

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
        />
      )}

      {/* Si ocultas la TopBar, no pongas padding superior */}
      <main className={hideTop ? "" : "pt-[72px]"}>
        <Outlet />
      </main>
    </>
  );
}
