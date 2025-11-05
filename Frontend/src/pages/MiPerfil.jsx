// src/pages/MiPerfil.jsx
import { useMemo } from "react";
import { useAuth } from "../services/auth/AuthContext";

function fmtDateTime(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleString("es-PE", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MiPerfil() {
  const { user } = useAuth();

  // Deriva firstName/lastName de forma robusta
  const { firstName, lastName } = useMemo(() => {
    const f = (user?.name ?? "").trim();
    const l = (user?.lastName ?? "").trim();

    if (f || l) return { firstName: f, lastName: l };

    // Si no vienen por backend, los inferimos desde user.name
    const name = (user?.name ?? "").trim();
    if (!name) return { firstName: "", lastName: "" };

    const parts = name.split(/\s+/);
    if (parts.length === 1) return { firstName: parts[0], lastName: "" };
    return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
  }, [user?.firstName, user?.lastName, user?.name]);

  // Iniciales del avatar
  const initials = useMemo(() => {
    const a = firstName?.[0]?.toUpperCase() ?? "";
    const b = lastName?.[0]?.toUpperCase() ?? "";
    return (a + b) || "U";
  }, [firstName, lastName]);

  // Encabezado: solo el nombre
  const headerName = firstName || "Usuario";
  // Campo “Nombre”: nombre + apellido
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || (user?.name ?? "—");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi perfil</h1>

        {/* Encabezado limpio (sin chips) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-purple-600 text-white grid place-items-center text-2xl font-bold">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">
              {headerName}
            </h2>
            <p className="text-sm text-gray-600">{user?.email ?? "—"}</p>
          </div>
        </div>

        {/* Información (incluye Cuenta creada) */}
        <div className="mt-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Información</h3>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <dt className="text-gray-500">Nombre</dt>
                <dd className="text-gray-900">{fullName}</dd>
              </div>

              <div className="flex justify-between border-b border-gray-100 pb-2">
                <dt className="text-gray-500">Correo</dt>
                <dd className="text-gray-900">{user?.email ?? "—"}</dd>
              </div>



              <div className="flex justify-between border-b border-gray-100 pb-2">
                <dt className="text-gray-500">Teléfono</dt>
                <dd className="text-gray-900">{user?.phone ?? "—"}</dd>
              </div>

              <div className="flex justify-between pb-2">
                <dt className="text-gray-500">Cuenta creada</dt>
                <dd className="text-gray-900">{fmtDateTime(user?.createdAt)}</dd>
              </div>
            </dl>
          </section>
        </div>

        {/* Acciones */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Acciones</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50">
              Editar perfil
            </button>
            <button className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50">
              Cambiar contraseña
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
