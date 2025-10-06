import { useNavigate } from "react-router-dom";
import RegisterCard from "../components/RegistroCard"; 
import { useAuth } from "../services/auth/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

    return (
    <section
      className="
        min-h-screen          
        flex justify-center items-start md:items-center
        px-4 py-16            
        bg-[linear-gradient(180deg,rgba(100,8,162,0.8)_0%,rgba(244,180,0,0.8)_100%),linear-gradient(180deg,#2A0243_0%,#6408A2_100%)]
        bg-no-repeat bg-cover bg-center
      "
    >
      <div className="w-full max-w-2xl">
                <RegisterCard
                    onSubmit={async (data) => {
                    // TODO: enviar a tu API real
                    
                    register({ email: data.email });
                    navigate("/app");
                    }}
                    onLogin={() => navigate("/login")}
                    onRegisterWithGoogle={async () => {
                      window.location.href = "http://localhost:4000/auth/google";
                    }}
                />
      </div>
    </section>
  );
}





