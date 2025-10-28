import React from "react";

import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../services/auth/AuthContext";

export default function AdminRoute() {
  const { ready, isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!ready) {
    return <div>Verificando permisos...</div>;
  }

  //Comprueba si está logueado
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const roles = user?.roles || [];
  const isAdmin = roles.includes("ADMIN");

  //Si no es admin, lo redirige al Home
  if (!isAdmin) {
    return (
      <Navigate to="/" state={{ reason: "notAdmin", from: location }} replace />
    );
  }

  return <Outlet />;
}
