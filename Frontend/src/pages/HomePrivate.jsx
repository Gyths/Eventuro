import { useAuth } from "../services/auth/AuthContext.jsx";


export default function HomePrivate() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Hola, {user?.email} 👋</h1>
      <p className="mt-2 text-gray-600">Aquí podrías mostrar recomendaciones, mis tickets, etc.</p>
      {/* más secciones y grids de eventos */}
    </section>
  );
}
