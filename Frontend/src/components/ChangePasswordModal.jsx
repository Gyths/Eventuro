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

  const [newPwError, setNewPwError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  if (!open) return null;

  // ====== Reglas de contraseña ======
  const validateNewPassword = (pw, currentPw) => {
    if (!pw) return "La nueva contraseña es obligatoria.";
    if (pw.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (!/[A-Za-z]/.test(pw)) return "La contraseña debe incluir al menos una letra.";
    if (!/[0-9]/.test(pw)) return "La contraseña debe incluir al menos un número.";
    if (/\s/.test(pw)) return "La contraseña no debe contener espacios.";
    if (currentPw && pw === currentPw) return "La nueva contraseña no puede ser igual a la actual.";
    return "";
  };

  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
    setMsg(null);
    const err = validateNewPassword(value, currentPassword);
    setNewPwError(err);
    // si ya hay confirm, revalidamos coincidencia
    if (confirm) {
      setConfirmError(
        value === confirm ? "" : "Las contraseñas no coinciden."
      );
    }
  };

  const handleConfirmChange = (value) => {
    setConfirm(value);
    setMsg(null);
    setConfirmError(
      value === newPassword ? "" : "Las contraseñas no coinciden."
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);

    // Validar nueva contraseña
    const pwErr = validateNewPassword(newPassword, currentPassword);
    if (pwErr) {
      setNewPwError(pwErr);
      setMsg({ type: "error", text: pwErr });
      return;
    }

    // Validar confirmación
    if (newPassword !== confirm) {
      const text = "Las contraseñas no coinciden.";
      setConfirmError(text);
      setMsg({ type: "error", text });
      return;
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
      setNewPwError("");
      setConfirmError("");
      setTimeout(onClose, 900);
    } catch (err) {
      const text = String(err?.message || "");
      let friendly = "No se pudo actualizar la contraseña.";
      if (text.includes("INVALID_CURRENT_PASSWORD"))
        friendly = "La contraseña actual no es válida.";
      if (text.includes("WEAK_PASSWORD"))
        friendly = "La nueva contraseña no cumple las reglas de seguridad.";
      setMsg({ type: "error", text: friendly });
    } finally {
      setSaving(false);
    }
  };

  // Para cuentas OAuth sin password, puedes cambiar esto a false si quieres ocultar el campo
  const needsCurrent = true;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h3 className="mb-4 text-lg font-semibold">Cambiar contraseña</h3>



        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            Nueva contraseña
          </label>
          <input
            type="password"
            className={`w-full rounded-lg border px-3 py-2 ${
              newPwError ? "border-rose-400" : "border-gray-300"
            }`}
            value={newPassword}
            onChange={(e) => handleNewPasswordChange(e.target.value)}
            autoComplete="new-password"
            required
          />

          {newPwError && (
            <p className="mt-1 text-xs text-rose-600">{newPwError}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Confirmar contraseña
          </label>
          <input
            type="password"
            className={`w-full rounded-lg border px-3 py-2 ${
              confirmError ? "border-rose-400" : "border-gray-300"
            }`}
            value={confirm}
            onChange={(e) => handleConfirmChange(e.target.value)}
            autoComplete="new-password"
            required
          />
          {confirmError && (
            <p className="mt-1 text-xs text-rose-600">{confirmError}</p>
          )}
        </div>

        {msg && (
          <div
            className={`mb-4 rounded-lg px-3 py-2 text-sm ${
              msg.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
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
