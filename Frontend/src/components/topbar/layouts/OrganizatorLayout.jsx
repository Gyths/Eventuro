import React from "react";
import searchBar from "../items/SearchBar";
import Linker from "../items/Linker";
import useAuth from "../../../services/auth/AuthContext";

export default function organizatorLayout() {
  const { session } = useAuth();

  return (
    <div className="flex flex-1 items-center gap-4 px-6">
      <searchBar></searchBar>
      <div className="hidden items-center gap-2 md:flex">
        <Linker
          label="Reportes"
          icon="chart-bar"
          to="/reports"
          activeMatch="/reports"
        />
        <Linker
          label="Mis Eventos"
          icon="calendar-days"
          to="/my-events"
          activeMatch="/my-events"
        />
        <Linker
          label="Crear Evento"
          icon="plus-circle"
          to="/create_event"
          activeMatch="/create_event"
        />
      </div>
      <div>
        {session != null ? (
          <UserMenu
            onProfile={onProfile}
            onMyTickets={onMyTickets}
            onClaims={onClaims}
            onLogout={onLogout}
          />
        ) : (
          <AuthButtons onLogin={onLogin} onRegister={onRegister} />
        )}
      </div>
    </div>
  );
}
