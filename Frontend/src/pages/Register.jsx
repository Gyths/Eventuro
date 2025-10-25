// src/pages/Register.jsx
import { useNavigate } from "react-router-dom";
import RegistroCard from "../components/RegistroCard";
import { useAuth } from "../services/auth/AuthContext.jsx";

import { BASE_URL } from "../config.js";
export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- para guardar { token, user } tras auto-login

  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegistroCard
        onSubmit={async ({
          name,
          lastName,
          phone,
          email,
          birthdate, // "YYYY-MM-DD"
          gender,    // "M" | "F" (tu schema)
          password,
        }) => {
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 12000);

          try {
            // 1) Registro
            const res = await fetch(`${BASE_URL}/eventuro/api/defaultUser/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                lastName,
                phone,
                email,
                birthdate,
                gender,
                password,
              }),
              signal: ctrl.signal,
            });

            const isJson = res.headers.get("content-type")?.includes("application/json");
            const payload = isJson ? await res.json().catch(() => null) : null;

            if (!res.ok) {
              const msg = payload?.error || `Error HTTP ${res.status}`;
              throw new Error(msg);
            }

            // 2) Auto-login inmediato (mismo email y password)
            const loginRes = await fetch(`${BASE_URL}/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
              signal: ctrl.signal,
            });

            const loginIsJson = loginRes.headers.get("content-type")?.includes("application/json");
            const loginPayload = loginIsJson ? await loginRes.json().catch(() => null) : null;

            if (!loginRes.ok || !loginPayload?.token || !loginPayload?.user) {
              navigate("/login", { replace: true });
              return;
            }

            // 3) Guardar sesión y pasar al home (TopBar privado)
              login({ token: loginPayload.token, user: loginPayload.user });

              if (loginPayload.user.roles?.includes("ADMIN")) {
                navigate("/");
              } else if (loginPayload.user.roles?.includes("ORGANIZER")) {
                navigate("/crearEvento");
              } else {
                navigate("/");
              }
          } catch (err) {
            const msg =
              err.name === "AbortError"
                ? "Tiempo de espera agotado. Intenta de nuevo."
                : err.message || "No se pudo registrar.";
            alert("Error en registro: " + msg);
          } finally {
            clearTimeout(timer);
          }
        }}
        onLogin={() => navigate("/login")}
        onRegisterWithGoogle={async () => {
          window.location.href = `${BASE_URL}/auth/google`;
        }}
      />
    </div>
  );
}
