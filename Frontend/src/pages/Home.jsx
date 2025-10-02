// src/pages/Home.jsx
import { useAuth } from "../services/auth/AuthContext.jsx";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">
        {isAuthenticated ? `Hola, ${user?.email} 👋` : "Bienvenido 👋"}
        {console.log(user)}
        {console.log(isAuthenticated)}
      </h1>
      <p className="mt-2 text-gray-600">
        Aquí podrías mostrar recomendaciones, mis tickets u otro contenido
        público.
      </p>
      {/* secciones y grids compartidos */}
    </section>
  );
}
