import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext.jsx";
import { BASE_URL } from "../config.js";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const processAuth = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const userString = params.get("user");

      if (token && userString) {
        try {
          // 1️ Decodificar usuario recibido del backend (Google callback)
          const user = JSON.parse(decodeURIComponent(userString));

          // 2️ Guardar sesión inicial
          login({ token, user });
          localStorage.setItem("session", JSON.stringify({ token, user }));

          // 3️ Consultar /me para obtener roles y organizerStatus actualizados
          try {
            const resMe = await fetch(`${BASE_URL}/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (resMe.ok) {
              const meData = await resMe.json();
              // Actualizamos con la información completa
              login({ token, user: meData.user });
              localStorage.setItem(
                "session",
                JSON.stringify({ token, user: meData.user })
              );
            }
          } catch (err) {
            console.warn("No se pudo refrescar /me:", err);
          }

          // 4️ Decidir a dónde redirigir según roles y estado
          const finalUser = JSON.parse(localStorage.getItem("session")).user;
          const roles = finalUser.roles || [];
          const organizerStatus = finalUser.organizerStatus || null;

          if (roles.includes("ADMIN")) {
            navigate("/");
          } else if (roles.includes("ORGANIZER")) {
            if (organizerStatus === "APPROVED") {
              navigate("/crearEvento");
            } else {
              alert("Tu perfil de organizador está en revisión o pendiente de aprobación.");
              navigate("/");
            }
          } else {
            navigate("/");
          }

          // 5️ Limpiar la URL (para que no queden los params visibles)
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (err) {
          console.error("Error procesando usuario:", err);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    processAuth();
  }, [login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Procesando inicio de sesión...
    </div>
  );
}
