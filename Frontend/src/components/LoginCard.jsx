import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';
import BotonCTA from './BotonCTA';
export default function LoginCard({
  title = 'Inicio de sesión',
  subtitle = 'Ingresa con tu cuenta',
  onSubmit,                // async ({email, password}) => void
  onForgotPassword,        // () => void
  onRegister,              // () => void
  onLoginWithGoogle,       // () => void
  loading = false,
  error = ''
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!onSubmit) return;
    await onSubmit({ email, password });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg px-12 py-10">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Logo" width={300} height={300} />
      </div>

      {/* Error global */}
      {error ? (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
    
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Correo</span>
          <input
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-violet-500"
            required
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm text-gray-600">Contraseña</span>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pr-10 text-sm outline-none ring-0 focus:border-violet-500"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute inset-y-0 right-0 grid w-10 place-items-center text-gray-500 hover:text-gray-700"
              aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
        </label>

        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs text-gray-600 underline underline-offset-2 hover:text-gray-800"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          {loading ? 'Ingresando…' : 'Iniciar sesión'}
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
        onClick={onLoginWithGoogle}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        <img
          alt="Google"
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          className="h-5 w-5"
        />
        Ingresar con Google
      </button>

      {/* Registro */}
      <p className="mt-4 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <button
          type="button"
          onClick={onRegister}
          className="font-semibold text-violet-600 underline underline-offset-2 hover:text-violet-700"
        >
          Regístrate
        </button>
      </p>
    </div>
  );
}
