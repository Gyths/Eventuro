// src/components/modals/CreateOrganizerModal.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../services/auth/AuthContext.jsx";

/* --- SELECT PERSONALIZADO --- */
function FancySelect({ value, onChange, options, error }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(
    Math.max(0, options.findIndex((o) => o.value === value))
  );
  const rootRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const opt = options[activeIndex];
        if (opt) {
          onChange(opt.value);
          setOpen(false);
          btnRef.current?.focus();
        }
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, options, activeIndex, onChange]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex justify-between items-center rounded-2xl border bg-white/80 px-4 py-2.5 text-left shadow-sm outline-none transition
        focus:ring-2 focus:ring-purple-500/50 ${
          error ? "border-red-400" : "border-gray-200"
        }`}
      >
        <span>{options.find((o) => o.value === value)?.label || "Selecciona"}</span>
        <span className="text-gray-400">▾</span>
      </button>

      {open && (
        <ul
          className="absolute z-10 mt-1 w-full rounded-2xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 animate-[fadeIn_.1s_ease-out]"
          role="listbox"
        >
          {options.map((opt, i) => (
            <li
              key={opt.value}
              role="option"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2 text-sm ${
                i === activeIndex ? "bg-purple-50 text-purple-700" : "hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(-2px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}

/* --- MODAL PRINCIPAL --- */
export default function CreateOrganizerModal({ open, onClose, onSuccess }) {
  const { token } = useAuth();
  const [idType, setIdType] = useState("DNI");
  const [idNumber, setIdNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const panelRef = useRef(null);
  const idInputRef = useRef(null);

  // Reset al cerrar
  useEffect(() => {
    if (!open) {
      setIdType("DNI");
      setIdNumber("");
      setCompanyName("");
      setErrors({});
      setLoading(false);
    } else {
      setTimeout(() => idInputRef.current?.focus(), 50);
    }
  }, [open]);

  // Cerrar con ESC y clic fuera
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    const onClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose?.();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  const validate = () => {
    const errs = {};
    const digits = (idNumber || "").replace(/\D/g, "");
    if (!idType) errs.idType = "Selecciona el tipo de documento.";
    if (!idNumber) errs.idNumber = "Este campo es obligatorio.";
    else if (idType === "DNI" && digits.length !== 8)
      errs.idNumber = "El DNI debe tener 8 dígitos.";
    else if (idType === "RUC" && digits.length !== 11)
      errs.idNumber = "El RUC debe tener 11 dígitos.";
    if (!companyName.trim())
      errs.companyName = "Ingresa el nombre de la compañía.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/eventuro/api/organizers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ idType, idNumber, companyName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "No se pudo guardar.");
      onSuccess?.(data);
      onClose?.();
    } catch (err) {
      setErrors({ submit: err.message || "Ocurrió un error." });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        ref={panelRef}
        className="relative w-full max-w-xl rounded-3xl bg-white/90 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl p-6 animate-[scaleIn_.16s_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Completa tus datos de organizador
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-gray-500 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo de documento */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Tipo de documento
            </label>
            <FancySelect
              value={idType}
              onChange={setIdType}
              options={[
                { value: "DNI", label: "DNI" },
                { value: "RUC", label: "RUC" },
              ]}
              error={errors.idType}
            />
            {errors.idType && (
              <p className="mt-1 text-xs text-red-600">{errors.idType}</p>
            )}
          </div>

          {/* Número */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              {idType === "DNI" ? "DNI (8 dígitos)" : "RUC (11 dígitos)"}
            </label>
            <input
              ref={idInputRef}
              className={`w-full rounded-2xl border bg-white/80 px-4 py-2.5 shadow-sm outline-none transition
              focus:ring-2 focus:ring-purple-500/50 ${
                errors.idNumber ? "border-red-400" : "border-gray-200"
              }`}
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder={idType === "DNI" ? "12345678" : "20123456789"}
              inputMode="numeric"
            />
            {errors.idNumber && (
              <p className="mt-1 text-xs text-red-600">{errors.idNumber}</p>
            )}
          </div>

          {/* Compañía */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Nombre de la compañía
            </label>
            <input
              className={`w-full rounded-2xl border bg-white/80 px-4 py-2.5 shadow-sm outline-none transition
              focus:ring-2 focus:ring-purple-500/50 ${
                errors.companyName ? "border-red-400" : "border-gray-200"
              }`}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Eventos SAC"
            />
            {errors.companyName && (
              <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>
            )}
          </div>

          {/* Error global */}
          {errors.submit && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errors.submit}
            </div>
          )}

          {/* Botones */}
          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl px-4 py-2 text-gray-700 hover:bg-gray-100"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2 font-semibold text-white shadow-lg hover:opacity-95 active:scale-95 transition disabled:opacity-60"
            >
              {loading ? "Guardando..." : "Guardar y continuar"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(.96); opacity: 0 }
          to   { transform: scale(1);   opacity: 1 }
        }
      `}</style>
    </div>
  );
}
