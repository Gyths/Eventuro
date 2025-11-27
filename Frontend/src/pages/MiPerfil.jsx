// src/pages/MiPerfil.jsx
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../services/auth/AuthContext";
import { EventuroApi } from "../api";
import ChangePasswordModal from "../components/ChangePasswordModal"; 

function fmtDateTime(d) {
  if (!d) return "—";
  const date = new Date(d);
  return date.toLocaleString("es-PE", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function MiPerfil() {
  const { user, token, login } = useAuth();

  const [firstName, setFirstName] = useState(user?.name ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [openPwd, setOpenPwd] = useState(false); // 🔹 Nuevo estado para abrir el modal

  useEffect(() => {
    if (user) {
      setFirstName(user?.name ?? "");
      setLastName(user?.lastName ?? "");
      setPhone(user?.phone ?? "");
      setEmail(user?.email ?? "");
    }
  }, [user]);

  const initials = useMemo(() => {
    const a = firstName?.[0]?.toUpperCase() ?? "";
    const b = lastName?.[0]?.toUpperCase() ?? "";
    return (a + b) || "U";
  }, [firstName, lastName]);

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg(null);

    try {
      setSaving(true);
      const updated = await EventuroApi({
        endpoint: `/user/Me`,
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        data: { name: firstName, lastName, phone, email },
      });
      //login({ token, user: updated });
      setEditMode(false);
      setMsg({ type: "success", text: "Perfil actualizado correctamente." });
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Error al guardar los cambios." });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFirstName(user?.name ?? "");
    setLastName(user?.lastName ?? "");
    setPhone(user?.phone ?? "");
    setEmail(user?.email ?? "");
    setEditMode(false);
    setMsg(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi perfil</h1>

        {/* ---------- ENCABEZADO ---------- */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-purple-600 text-white grid place-items-center text-2xl font-bold">
            {initials}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{firstName || "Usuario"}</h2>
            <p className="text-sm text-gray-600">{email || "—"}</p>
          </div>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
            >
              Editar perfil
            </button>
          )}
        </div>

        {/* ---------- INFORMACIÓN ---------- */}
        <form onSubmit={handleSave} className="mt-6">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Información</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Nombre</label>
                <input
                  disabled={!editMode}
                  className={`w-full rounded-lg border px-3 py-2 ${
                    editMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
                  }`}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Apellido</label>
                <input
                  disabled={!editMode}
                  className={`w-full rounded-lg border px-3 py-2 ${
                    editMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
                  }`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Correo</label>
                <input
                  disabled={!editMode}
                  type="email"
                  className={`w-full rounded-lg border px-3 py-2 ${
                    editMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Teléfono</label>
                <input
                  disabled={!editMode}
                  className={`w-full rounded-lg border px-3 py-2 ${
                    editMode ? "border-gray-300" : "bg-gray-100 text-gray-500"
                  }`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-between mt-4 text-sm">
              <span className="text-gray-500">Cuenta creada</span>
              <span className="text-gray-900">{fmtDateTime(user?.createdAt)}</span>
            </div>

            {msg && (
              <div
                className={`mt-4 rounded-lg px-4 py-2 ${
                  msg.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {msg.text}
              </div>
            )}

            {editMode && (
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
                >
                  {saving ? "Guardando..." : "Guardar cambios"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            )}
          </section>
        </form>

        {/* ---------- ACCIONES ---------- */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-900 mb-3">Acciones</h3>
          <button
            onClick={() => setOpenPwd(true)} // 🔹 Abre el modal
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cambiar contraseña
          </button>
        </div>

        {/* ---------- MODAL ---------- */}
        <ChangePasswordModal open={openPwd} onClose={() => setOpenPwd(false)} />
      </div>
    </div>
  );
}
