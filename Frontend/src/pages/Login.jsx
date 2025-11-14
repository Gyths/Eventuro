import { useNavigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import { useAuth } from "../services/auth/AuthContext.jsx";
import { BASE_URL } from "../config.js";
import handleRoleNavigation from "../utils/handleRoleNavigation.js";
import toast from "react-hot-toast";
export default function Login() {
  const { login, logout } = useAuth?.() ?? { login: () => {}, logout: () => {} };
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
            const response = await fetch(`${BASE_URL}/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            
            const data = await response.json().catch(() => null);

            if (!response.ok) {
              
              const serverMsg =
                data?.error ||
                data?.message ||
                (response.status === 403
                  ? "Tu cuenta está suspendida o baneada."
                  : "Credenciales inválidas.");

              throw new Error(serverMsg);
            }

           
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
              } else if (resMe.status === 403) {
               
                const errBody = await resMe.json().catch(() => null);
                const msg =
                  errBody?.error ||
                  errBody?.message ||
                  "Tu cuenta ya no tiene acceso al sistema.";
                // limpiamos sesión
                localStorage.removeItem("sessionToken");
                localStorage.removeItem("userData");
                if (logout) logout();
                alert(msg);
                return; // no navegamos a ningún lado
              }
            } catch (err) {
              console.warn("No se pudo refrescar /me:", err);
            }

            
            const roles = finalUser.roles || [];
            const organizerStatus = finalUser.organizerStatus || null;
            handleRoleNavigation(roles, organizerStatus, navigate);
          } catch (err) {
            toast.error(err.message);
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
