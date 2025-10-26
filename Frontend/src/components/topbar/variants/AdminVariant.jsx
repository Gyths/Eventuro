import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/logoB.svg";

import Linker from "../items/Linker";

import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function AdminTopBar() {
  const navigate = useNavigate();

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 w-full shadow-[0_2px_18px_rgba(0,0,0,0.12)]"
      style={{
        background:
          "linear-gradient(90deg, #2A0243 0%, #6408A2 60%, #2A0243 100%)",
      }}
    >
      <div className="flex w-full items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="Eventuro"
            className="h-8 w-auto cursor-pointer"
            onClick={() => navigate("/admin/dashboard")}
          />
        </div>

        <div className="flex items-center gap-2">
          <Linker
            label="Dashboard"
            icon="home" // "home" está definido en Linker.jsx
            to="/admin/dashboard"
          />
          <Linker
            label="Ajustes"
            icon="cog" // "cog" está definido en Linker.jsx
            to="/admin/settings"
          />
          <Linker
            label="Eventos"
            icon="calendar-days" // "calendar-days" está definido en Linker.jsx
            to="/admin/events"
          />
          <Linker
            label="Reclamaciones"
            icon="lifebuoy" // "lifebuoy" está definido en Linker.jsx
            to="/admin/complaints"
          />
          <Linker
            label="Usuarios"
            icon="user-circle" // "user-circle" está definido en Linker.jsx
            to="/admin/users"
          />
          <Linker
            label="Logs"
            icon="adjustments-horizontal" // "adjustments-horizontal" está definido en Linker.jsx
            to="/admin/logs"
          />
        </div>

        <div
          className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/90"
          style={{ opacity: 0.9 }}
        >
          <UserCircleIcon className="h-5 w-5 shrink-0" />
          <span className="truncate">Administrador</span>
        </div>
      </div>
    </header>
  );
}
