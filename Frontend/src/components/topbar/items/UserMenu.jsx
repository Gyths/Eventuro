import { useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../services/auth/AuthContext";
import { UserIcon } from "@heroicons/react/24/outline";

export default function UserMenu() {
  const profileRoute = "/";
  const myTicketsRoute = "/";
  const claimsRoute = "/";
  const loginRoute = "/login";

  const navigate = useNavigate();

  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/15"
        aria-label="Abrir menú de usuario"
      >
        <UserIcon className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl">
          <MenuItem
            text="Configuración"
            onClick={() => navigate(profileRoute)}
          />
          <MenuItem
            text="Mis tickets"
            onClick={() => navigate(myTicketsRoute)}
          />
          <MenuItem text="Reclamos" onClick={() => navigate(claimsRoute)} />
          <div className="my-1 h-px bg-gray-100" />
          <MenuItem
            text="Cerrar sesión"
            danger
            onClick={() => {
              logout();
              navigate(loginRoute);
            }}
          />
        </div>
      )}
    </div>
  );
}
