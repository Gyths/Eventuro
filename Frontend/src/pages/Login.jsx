import { useNavigate, Link } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import { useAuth } from "../services/auth/AuthContext.jsx";

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
            const response = await fetch("http://localhost:4000/login", {
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
            // Suponiendo que tu backend devuelve { token, user }
            login({ token: data.token, user: data.user });

            navigate("/");
          } catch (err) {
            alert("Error en login: " + err.message);
          }
        }}
        onForgotPassword={() => alert("TODO: recuperar contraseña")}
        onRegister={() => navigate("/registro")}
        onLoginWithGoogle={async () => {
          window.location.href = "http://localhost:4000/auth/google";
        }}
      />
    </div>
  );
}
