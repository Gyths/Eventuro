import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth/AuthContext.jsx";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Extraer parámetros de la URL (token y user)
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userString = params.get("user");

    if (token && userString) {
      try {
        // Decodificar el string del usuario
        const user = JSON.parse(decodeURIComponent(userString));
        login({ token, user });
        console.log("asdfasdfasd");
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
        navigate("/"); // redirige a home o dashboard
      } catch (err) {
        console.error("Error procesando usuario:", err);
        navigate("/login");
      }
    }
  }, [login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Procesando inicio de sesión...
    </div>
  );
}
