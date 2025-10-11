import React from "react";
import { useNavigate } from "react-router-dom";

export default function AuthButtons() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => navigate("/registro")}
        className="rounded-full border border-amber-400/70 bg-transparent px-4 py-1.5 text-sm font-semibold text-amber-300 hover:bg-amber-400/10"
      >
        Registrarse
      </button>
      <button
        onClick={() => navigate("/login")}
        className="rounded-full border border-amber-400/70 bg-amber-400/90 px-4 py-1.5 text-sm font-semibold text-purple-900 hover:bg-amber-400"
      >
        Iniciar Sesión
      </button>
    </div>
  );
}
