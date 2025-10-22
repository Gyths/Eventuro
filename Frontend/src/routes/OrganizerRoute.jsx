import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext";

export default function OrganizerRoute({ requireApproved = true }) {
  const { ready, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!ready) return null; // o un splash

  // 1) si no está logueado → login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2) si no tiene rol ORGANIZER → home (puedes abrir modal desde ahí)
  const roles = user?.roles || [];
  const isOrganizer = roles.includes("ORGANIZER");
  if (!isOrganizer) {
    return (
      <Navigate
        to="/"
        state={{ reason: "notOrganizer", from: location }}
        replace
      />
    );
  }

  // 3) si exiges aprobado → bloquea SUBMITTED/REJECTED/DRAFT
  const status = user?.organizerStatus ?? null;
  if (requireApproved && status !== "APPROVED") {
    return (
      <Navigate
        to="/"
        state={{ reason: "organizerNotApproved", from: location }}
        replace
      />
    );
  }

  // 4) OK
  return <Outlet />;
}
