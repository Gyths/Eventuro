import { useState } from "react";
import { EyeIcon, EyeSlashIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.svg";

export default function RegistroCard({
  onSubmit,                 // async (payload) => void
  onLogin,                  // () => void
  onRegisterWithGoogle,     // () => void
  loading = false,
}) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    birthdate: "",  // "YYYY-MM-DD"
    genero: "",     // "Masculino" | "Femenino"
  });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});

  const inputBase =
    "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500";
  const selectBase =
    "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-9 text-sm outline-none focus:border-violet-500 appearance-none";

  function onChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const e = {};
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const soloDigitos = /^[0-9+\s-]{6,}$/; // admite +, espacios y guiones, mínimo 6

    if (!form.nombres.trim()) e.nombres = "Ingresa tus nombres";
    else if (!soloLetras.test(form.nombres)) e.nombres = "Solo letras y espacios";

    if (!form.apellidos.trim()) e.apellidos = "Ingresa tus apellidos";
    else if (!soloLetras.test(form.apellidos)) e.apellidos = "Solo letras y espacios";

    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Correo inválido";

    if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    if (form.password !== form.confirm) e.confirm = "Las contraseñas no coinciden";

    if (!form.phone.trim()) e.phone = "Ingresa tu teléfono";
    else if (!soloDigitos.test(form.phone.trim()))
      e.phone = "Teléfono inválido";

    if (!form.birthdate) e.birthdate = "Selecciona tu cumpleaños";
    else if (isNaN(new Date(form.birthdate).getTime()))
      e.birthdate = "Fecha inválida";

    if (!form.genero) e.genero = "Selecciona un género";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    // mapear “Masculino/Femenino” -> “M/F” (enum de la BD)
    const genderEnum = form.genero === "Masculino" ? "M" : "F";

    // convertir a DateTime ISO
    const birthdateIso = new Date(form.birthdate).toISOString();

    await onSubmit?.({
      name: form.nombres.trim(),
      lastName: form.apellidos.trim(),
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim(),
      birthdate: birthdateIso,
      gender: genderEnum,
    });
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg px-12 py-10">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Logo" width={300} height={300} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Nombres y Apellidos */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="mb-1 block text-sm text-gray-600">Nombres</span>
            <input
              name="nombres"
              type="text"
              value={form.nombres}
              onChange={onChange}
              className={inputBase}
              placeholder="Tus nombres"
            />
            {errors.nombres && <p className="mt-1 text-xs text-red-600">{errors.nombres}</p>}
          </label>

          <label className="block">
            <span className="mb-1 block text-sm text-gray-600">Apellidos</span>
            <input
              name="apellidos"
              type="text"
              value={form.apellidos}
              onChange={onChange}
              className={inputBase}
              placeholder="Tus apellidos"
            />
            {errors.apellidos && <p className="mt-1 text-xs text-red-600">{errors.apellidos}</p>}
          </label>
        </div>

        {/* Correo */}
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Correo electrónico</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className={`${inputBase} bg-indigo-50`}
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </label>

        {/* Teléfono */}
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Teléfono</span>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={onChange}
            className={inputBase}
            placeholder="+51 999 999 999"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </label>

        {/* Cumpleaños */}
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Cumpleaños</span>
          <input
            name="birthdate"
            type="date"
            value={form.birthdate}
            onChange={onChange}
            className={inputBase}
          />
          {errors.birthdate && <p className="mt-1 text-xs text-red-600">{errors.birthdate}</p>}
        </label>

        {/* Contraseña */}
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Contraseña</span>
          <div className="relative">
            <input
              name="password"
              type={show ? "text" : "password"}
              value={form.password}
              onChange={onChange}
              className={`${inputBase} pr-10`}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute inset-y-0 right-0 grid w-10 place-items-center text-gray-500 hover:text-gray-700"
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </label>

        {/* Confirmar contraseña */}
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Confirmar contraseña</span>
          <input
            name="confirm"
            type={show ? "text" : "password"}
            value={form.confirm}
            onChange={onChange}
            className={inputBase}
            placeholder="Repite la contraseña"
            autoComplete="new-password"
          />
          {errors.confirm && <p className="mt-1 text-xs text-red-600">{errors.confirm}</p>}
        </label>

        {/* Género */}
        <label className="block relative">
          <span className="mb-1 block text-sm text-gray-600">Género</span>
          <select
            name="genero"
            value={form.genero}
            onChange={onChange}
            className={selectBase}
          >
            <option value="">Selecciona una opción</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
          <svg
            className="pointer-events-none absolute right-2 bottom-2.5 h-4 w-4 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.25 7.5l4.5 4.5 4.5-4.5" />
          </svg>
          {errors.genero && <p className="mt-1 text-xs text-red-600">{errors.genero}</p>}
        </label>

        {/* Botón principal */}
        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
        >
          <UserPlusIcon className="h-5 w-5" />
          {loading ? "Registrando…" : "Registrarse"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">o</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={onRegisterWithGoogle}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        <img
          alt="Google"
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          className="h-5 w-5"
        />
        Registrarse con Google
      </button>

      {/* Ir a login */}
      <p className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="font-semibold text-violet-600 underline underline-offset-2 hover:text-violet-700"
        >
          Inicia sesión
        </button>
      </p>
    </div>
  );
}
