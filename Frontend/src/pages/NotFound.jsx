
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Página no encontrada.</p>
      <Link to="/" className="mt-6 inline-block text-violet-600 underline">Volver al inicio</Link>
    </div>
  );
}
