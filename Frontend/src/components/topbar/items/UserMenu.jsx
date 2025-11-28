// src/components/topbar/items/UserMenu.jsx
import { useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/auth/AuthContext";
import { UserIcon } from "@heroicons/react/24/outline";

export default function UserMenu(isOrganizerApproved) {
  // Rutas
  const profileRoute = "/miPerfil";
  const myTicketsRoute = "/misTickets";
  const claimsRoute = "/misReclamos";
  const calendarRoute = "/miCalendario";
  const salesByZoneRoute = "/ventas-zona";
  const loginRoute = "/";

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative flex flex-row gap-2 items-center" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 justify-center transition-colors duration-200 ${
          isOrganizerApproved
            ? "flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
            : "bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
        }`}
        aria-label="Abrir menú de usuario"
      >
        <UserIcon className="h-5 w-5" />
        <span>{user.name}</span>
        {/* {isOrganizerApproved && (
        <span className="ml-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-600 text-white">
          Organizador
        </span>
     )}*/}
      </button>

      {open && (
        <div className="fixed right-2 top-[64px] w-44 rounded-2xl bg-white p-2 shadow-xl z-50">
          <MenuItem text="Mi perfil" onClick={() => go(profileRoute)} />
          {isOrganizerApproved && (
            <MenuItem
              text="Ventas por zona"
              onClick={() => go(salesByZoneRoute)}
            />
          )}
          <MenuItem text="Mis tickets" onClick={() => go(myTicketsRoute)} />
          <MenuItem text="Mi calendario" onClick={() => go(calendarRoute)} />
          <MenuItem text="Reclamos" onClick={() => go(claimsRoute)} />
          <div className="my-1 h-px bg-gray-100" />
          <MenuItem
            text="Cerrar sesión"
            danger
            onClick={() => {
              setOpen(false);
              logout();
              navigate(loginRoute);
            }}
          />
        </div>
      )}
    </div>
  );
}
