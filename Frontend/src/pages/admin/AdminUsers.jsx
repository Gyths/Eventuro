import React, { useState, useEffect, useCallback } from "react";
import { EventuroApi } from "../../api";
import {
  UsersIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

const animationStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.4s ease-out forwards;
  }
  @keyframes fade-in-backdrop {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-backdrop {
    animation: fade-in-backdrop 0.2s ease-out forwards;
  }
  @keyframes modal-scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-modal-scale-in {
    animation: modal-scale-in 0.3s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
  }
`;

const formatDateTime = (isoString) => {
  if (!isoString) return "No registrado";
  const date = new Date(isoString);
  return date.toLocaleString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function StatusBadge({ status }) {
  let text, icon, classes;
  switch (status) {
    case "A":
      text = "Activo";
      icon = <CheckCircleIcon className="h-4 w-4" />;
      classes = "bg-green-100 text-green-800";
      break;
    case "S":
      text = "Suspendido";
      icon = <ExclamationTriangleIcon className="h-4 w-4" />;
      classes = "bg-yellow-100 text-yellow-800";
      break;
    case "B":
      text = "Baneado";
      icon = <XCircleIcon className="h-4 w-4" />;
      classes = "bg-red-100 text-red-800";
      break;
    case "D":
      text = "Eliminado";
      icon = <XCircleIcon className="h-4 w-4" />;
      classes = "bg-red-100 text-red-800";
      break;
    default:
      text = "Desconocido";
      icon = <UserCircleIcon className="h-4 w-4" />;
      classes = "bg-gray-100 text-gray-800";
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${classes}`}
    >
      {icon}
      {text}
    </span>
  );
}

function UserCard({ user, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    >
      <div className="p-4 border-b border-gray-100 bg-gray-50/70 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <UserCircleIcon className="h-10 w-10 text-gray-400" />
          <div>
            <h4 className="text-base font-semibold text-purple-800">
              {user.name} {user.lastName}
            </h4>
            <p className="text-xs text-gray-500">User ID: {user.userId}</p>
          </div>
        </div>
        <StatusBadge status={user.status} />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <EnvelopeIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span className="text-gray-700 truncate" title={user.email}>
            {user.email}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <PhoneIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <span className="text-gray-700">
            {user.phone || "Teléfono no registrado"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (query) => {
    setIsLoading(true);
    setError(null);
    let endpoint = "/user";

    try {
      if (query) {
        endpoint = `/user?search=${encodeURIComponent(query)}`;
      }

      const data = await EventuroApi({
        endpoint: endpoint,
        method: "GET",
      });

      setUsers(data && Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      setError(err.message);
      if (
        err.message.includes("401") ||
        err.message.toLowerCase().includes("token")
      ) {
        Swal.fire(
          "Error",
          "No tienes permiso para ver esta información.",
          "error"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers("");
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      fetchUsers("");
      return;
    }
    const timerId = setTimeout(() => {
      fetchUsers(searchQuery);
    }, 400);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleStatusUpdated = () => {
    fetchUsers(searchQuery);
    handleCloseModal();
  };

  return (
    <>
      <style>{animationStyles}</style>

      <div className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-80px)] flex flex-col">
        <div className="max-w-7xl mx-auto w-full my-auto">
          {/* Encabezado  */}
          <div className="border-b border-gray-200 pb-5 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-3xl font-semibold text-gray-800 flex items-center gap-3">
                <UsersIcon className="h-9 w-9 text-purple-600" />
                Gestión de usuarios
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Busca y administra los usuarios del sistema.
              </p>
            </div>
          </div>

          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o apellido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm shadow-sm"
            />
          </div>

          {/* Contenido  */}
          {isLoading && (
            <div className="text-center text-gray-500 py-12">
              Cargando usuarios...
            </div>
          )}
          {error && (
            <div className="text-center text-red-600 bg-red-50 p-6 m-6 rounded-lg">
              <strong>Error al cargar:</strong> {error}
            </div>
          )}
          {!isLoading && !error && users.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              {searchQuery
                ? `No se encontraron usuarios que coincidan con "${searchQuery}".`
                : "No hay usuarios registrados en el sistema."}
            </div>
          )}
          {!isLoading && !error && users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {users.map((user, index) => (
                <div
                  key={user.userId}
                  className="animate-fade-in-up"
                  style={{
                    animationFillMode: "both",
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <UserCard user={user} onClick={() => handleOpenModal(user)} />
                </div>
              ))}
            </div>
          )}
        </div>

        <UserDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          onStatusUpdated={handleStatusUpdated}
        />
      </div>
    </>
  );
}

// --- (Componente DetailRow ) ---
function DetailRow({ label, value, span = 1 }) {
  return (
    <div className={span === 2 ? "sm:col-span-2" : ""}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value || "—"}</dd>
    </div>
  );
}

// --- (Componente UserDetailModal ) ---
function UserDetailModal({ isOpen, onClose, user, onStatusUpdated }) {
  if (!isOpen || !user) return null;

  const handleUpdateStatus = async (newStatus) => {
    let apiBody = { status: newStatus };
    let swalTitle = "";

    if (newStatus === "A") swalTitle = "¿Activar este usuario?";
    if (newStatus === "B") swalTitle = "¿Banear este usuario?";
    if (newStatus === "S") swalTitle = "Suspender este usuario";

    if (newStatus === "S") {
      const { value: days } = await Swal.fire({
        title: swalTitle,
        input: "number",
        inputLabel: "Número de días de suspensión",
        inputPlaceholder: "Ej: 7",
        showCancelButton: true,
        confirmButtonText: "Suspender",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value || Number(value) <= 0) {
            return "Debes ingresar un número de días mayor a 0";
          }
        },
      });

      if (days) {
        apiBody.days = Number(days);
      } else {
        return;
      }
    } else {
      const result = await Swal.fire({
        title: swalTitle,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: newStatus === "B" ? "#EF4444" : "#10B981",
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    try {
      await EventuroApi({
        endpoint: `/user/${user.userId}/status`,
        method: "PUT",
        data: apiBody,
      });

      await Swal.fire(
        "¡Éxito!",
        "El estado del usuario ha sido actualizado.",
        "success"
      );
      onStatusUpdated();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-fade-in-backdrop"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-modal-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b">
          <div className="flex items-center gap-3">
            <UserCircleIcon className="h-10 w-10 text-purple-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {user.name} {user.lastName}
              </h3>
              <p className="text-sm text-gray-500">User ID: {user.userId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <section>
            <h4 className="text-base font-semibold text-purple-700 mb-3">
              Estado y Acciones
            </h4>
            <div className="p-4 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">
                  Estado Actual:
                </span>
                <StatusBadge status={user.status} />
              </div>

              <div className="flex gap-2 flex-wrap">
                {user.status !== "A" && (
                  <button
                    onClick={() => handleUpdateStatus("A")}
                    className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200"
                  >
                    Activar
                  </button>
                )}
                {user.status !== "S" && (
                  <button
                    onClick={() => handleUpdateStatus("S")}
                    className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                  >
                    Suspender
                  </button>
                )}
                {user.status !== "B" && (
                  <button
                    onClick={() => handleUpdateStatus("B")}
                    className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200"
                  >
                    Banear
                  </button>
                )}
              </div>
            </div>
            {user.status === "S" && user.suspendedUntil && (
              <p className="text-xs text-yellow-700 mt-2">
                Suspendido hasta: {formatDateTime(user.suspendedUntil)}
              </p>
            )}
          </section>

          <section>
            <h4 className="text-base font-semibold text-purple-700 mb-3">
              Información del Usuario
            </h4>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              <DetailRow label="Nombre" value={user.name} />
              <DetailRow label="Apellido" value={user.lastName} />
              <DetailRow label="Email" value={user.email} />
              <DetailRow label="Teléfono" value={user.phone} />
              <DetailRow
                label="Fecha de Nacimiento"
                value={formatDateTime(user.birthdate)}
              />
              <DetailRow label="Género" value={user.gender} />
              <DetailRow
                label="Usuario Creado"
                value={formatDateTime(user.createdAt)}
              />
              <DetailRow
                label="Última Actualización"
                value={formatDateTime(user.updatedAt)}
              />
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
