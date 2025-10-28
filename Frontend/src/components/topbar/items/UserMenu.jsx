// src/components/topbar/items/UserMenu.jsx
import { useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/auth/AuthContext";
import { UserIcon } from "@heroicons/react/24/outline";

export default function UserMenu() {
  // Rutas (ajusta si usas otras)
  const profileRoute = "/";
  const myTicketsRoute = "/misTickets"; // estandariza a kebab-case si puedes
  const claimsRoute = "/reclamos";
  const calendarRoute = "/miCalendario";
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
        className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15"
        aria-label="Abrir menú de usuario"
      >
        <UserIcon className="h-5 w-5" />
      </button>
      <span className="text-white">{user.name}</span>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl">
          <MenuItem text="Configuración" onClick={() => go(profileRoute)} />
          <MenuItem text="Mis tickets" onClick={() => go(myTicketsRoute)} />
          <MenuItem
            text="Mi calendario"
            onClick={() => go(calendarRoute)}
          />{" "}
          {/* NUEVO */}
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
