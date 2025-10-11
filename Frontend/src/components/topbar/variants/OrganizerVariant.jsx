import React from "react";
import SearchBar from "../items/SearchBar";
import Linker from "../items/Linker";
import UserMenu from "../items/UserMenu";

export default function OrganizerVariant() {
  return (
    <div className="flex flex-1 items-center gap-4 px-6">
      <SearchBar></SearchBar>
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
        <UserMenu />
      </div>
    </div>
  );
}
