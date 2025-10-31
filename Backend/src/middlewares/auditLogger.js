import { PrismaClient } from '../generated/prisma/index.js';
const prisma = new PrismaClient();

export function auditMiddleware() {

  // Helper para acceder al modelo correcto de Prisma
  function getModel(prisma, modelName) {
    if (!modelName) return null;
    const key = modelName.charAt(0).toLowerCase() + modelName.slice(1);
    return prisma[key] || null;
  }

  return async (params, next) => {
    const actionsToLog = ["create", "update", "delete"];
    const modelsToLog = ["Fee", "EventCategory", "Event", "User", "Organizer"];

    // Verificar si es una acción y modelo relevantes
    if (!actionsToLog.includes(params.action) || !modelsToLog.includes(params.model)) {
      return next(params);
    }

    // Evitar auditar los logs de auditoría (previene bucles)
    if (params.model === "AuditLog") {
      return next(params);
    }

    const currentUserId = global.currentUserId || null;
    if (!currentUserId) return next(params);

    // Confirmar que sea administrador
    const admin = await prisma.administrator.findUnique({
      where: { userId: currentUserId },
    });
    if (!admin) return next(params);

    let result;
    let entityId = null;
    let description = "";
    let before = null;

    try {
      const model = getModel(prisma, params.model);
      if (!model) return next(params); // si no existe el modelo, salir

      // Si es UPDATE, obtener datos previos
      if (params.action === "update") {
        before = await model.findUnique({
          where: params.args.where,
        });
      }

      // Ejecutar acción principal
      result = await next(params);

      // Identificar ID de entidad afectada
      const idField = Object.keys(result).find(k => k.toLowerCase().endsWith("id"));
      if (idField) entityId = result[idField];

      // === Descripciones personalizadas ===
      switch (params.model) {
        case "Fee":
          switch (params.action) {
            case "create":
              description = `El administrador ${currentUserId} creó una nueva comisión (Fee) con ID ${entityId}.`;
              break;
            case "update":
              description = `El administrador ${currentUserId} actualizó la comisión (Fee) con ID ${entityId}.`;
              break;
            case "delete":
              description = `El administrador ${currentUserId} eliminó la comisión (Fee) con ID ${entityId}.`;
              break;
          }
          break;

        case "EventCategory":
          switch (params.action) {
            case "create":
              description = `El administrador ${currentUserId} creó una nueva categoría de evento con ID ${entityId}.`;
              break;
            case "update":
              description = `El administrador ${currentUserId} actualizó la categoría de evento con ID ${entityId}.`;
              break;
            case "delete":
              description = `El administrador ${currentUserId} eliminó la categoría de evento con ID ${entityId}.`;
              break;
          }
          break;

        case "Event":
          if (params.action === "update" && "status" in params.args.data) {
            description = `El administrador ${currentUserId} actualizó el estado del evento ${entityId} a '${params.args.data.status}'.`;
          } else if (params.action === "update") {
            // Si actualiza otra cosa del evento
            description = `El administrador ${currentUserId} modificó el evento con ID ${entityId}.`;
          }
          break;

        case "User":
          switch (params.action) {
            case "create":
              description = `El administrador ${currentUserId} registró un nuevo usuario con ID ${entityId}.`;
              break;
            case "update":
              description = `El administrador ${currentUserId} actualizó los datos del usuario con ID ${entityId}.`;
              break;
            case "delete":
              description = `El administrador ${currentUserId} eliminó el usuario con ID ${entityId}.`;
              break;
          }
          break;

        case "Organizer":
          switch (params.action) {
            case "create":
              description = `El administrador ${currentUserId} registró un nuevo organizador con ID ${entityId}.`;
              break;
            case "update":
              description = `El administrador ${currentUserId} actualizó la información del organizador con ID ${entityId}.`;
              break;
            case "delete":
              description = `El administrador ${currentUserId} eliminó el organizador con ID ${entityId}.`;
              break;
          }
          break;
      }

      // Registrar la auditoría solo si hay descripción
      if (description) {
        await prisma.auditLog.create({
          data: {
            administratorId: admin.administratorId, 
            entityName: params.model,
            entityId,
            action: params.action.toUpperCase(),
            description,
          },
        });
      }

    } catch (error) {
      console.error("Error en middleware de auditoría:", error);
    }

    return result;
  };
}
