import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import { useAuth } from "../services/auth/AuthContext.jsx";
import { BASE_URL } from "../config.js";
import handleRoleNavigation from "../utils/handleRoleNavigation.js";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen
        bg-[linear-gradient(180deg,rgba(100,8,162,0.8)_0%,rgba(244,180,0,0.8)_100%),linear-gradient(180deg,#2A0243_0%,#6408A2_100%)]
        bg-no-repeat bg-cover bg-center
        flex items-center justify-center
      "
    >
      <LoginCard
        onSubmit={async ({ email, password }) => {
          try {
            // 1️⃣ Llamada de login
            const response = await fetch(`${BASE_URL}/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              throw new Error("Credenciales inválidas");
            }

            const data = await response.json();

            // 2️⃣ Guardamos sesión base
            localStorage.setItem("sessionToken", data.token);
            localStorage.setItem("userData", JSON.stringify(data.user));
            login({ token: data.token, user: data.user });

            // 3️⃣ Consultamos /me para obtener el user más actualizado
            let finalUser = data.user;
            try {
              const resMe = await fetch(`${BASE_URL}/me`, {
                headers: { Authorization: `Bearer ${data.token}` },
              });

              if (resMe.ok) {
                const meData = await resMe.json();
                finalUser = meData.user;
                login({ token: data.token, user: meData.user });
              }
            } catch (err) {
              console.warn("No se pudo refrescar /me:", err);
            }

            // 4️⃣ Usamos finalUser para decidir redirección
            const roles = finalUser.roles || [];
            const organizerStatus = finalUser.organizerStatus || null;
            handleRoleNavigation(roles, organizerStatus, navigate);
          } catch (err) {
            alert("Error en login: " + err.message);
          }
        }}
        onForgotPassword={() => alert("TODO: recuperar contraseña")}
        onRegister={() => navigate("/registro")}
        onLoginWithGoogle={() => {
          window.location.href = `${BASE_URL}/auth/google`;
        }}
      />
    </div>
  );
}
