import { useState } from "react";
import { EventuroApi } from "../api";
import { useAuth } from "../services/auth/AuthContext";

export default function ChangePasswordModal({ open, onClose }) {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);

    if (newPassword !== confirm) {
      return setMsg({ type: "error", text: "Las contraseñas no coinciden." });
    }

    try {
      setSaving(true);
      await EventuroApi({
        endpoint: "/user/Me/password",
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        data: { currentPassword, newPassword },
      });
      setMsg({ type: "success", text: "Contraseña actualizada." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
      setTimeout(onClose, 900);
    } catch (err) {
      const text = String(err?.message || "");
      let friendly = "No se pudo actualizar la contraseña.";
      if (text.includes("INVALID_CURRENT_PASSWORD")) friendly = "La contraseña actual no es válida.";
      if (text.includes("WEAK_PASSWORD")) friendly = "La nueva contraseña no cumple las reglas.";
      setMsg({ type: "error", text: friendly });
    } finally {
      setSaving(false);
    }
  };

  // Para cuentas OAuth sin password, puedes ocultar el campo "actual"
  const needsCurrent = true; // o hazlo dinámico si guardas esa info en el user

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="mb-4 text-lg font-semibold">Cambiar contraseña</h3>



        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">Nueva contraseña</label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={8}
          />
          <p className="mt-1 text-xs text-gray-500">Mínimo 8 caracteres, con letras y números.</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Confirmar contraseña</label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
          />
        </div>

        {msg && (
          <div className={`mb-4 rounded-lg px-3 py-2 text-sm ${
            msg.type === "success" ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-700"
          }`}>
            {msg.text}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={onClose}
            disabled={saving}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
