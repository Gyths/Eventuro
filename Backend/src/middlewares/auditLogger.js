
import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export function auditMiddleware() {
  return async (params, next) => {
    const actionsToLog = ["create", "update", "delete"];

    if (!actionsToLog.includes(params.action)) {
      return next(params);
    }

    let result;
    let description = "";
    let entityId = null;

    try {
      // Antes del update, obtener datos previos
      let before = null;
      if (params.action === "update") {
        before = await prisma[params.model.toLowerCase()].findUnique({
          where: params.args.where,
        });
      }

      // Ejecutar la acción real
      result = await next(params);

      // Obtener ID del registro afectado
      const idField = Object.keys(result).find((key) =>
        key.toLowerCase().endsWith("id")
      );
      if (idField) entityId = result[idField];

      // Determinar tipo de usuario dinámicamente
      let userType = "Administrador";
      if (global.currentUserId) {
        const organizer = await prisma.organizer.findUnique({
          where: { userId: global.currentUserId },
        });
        userType = organizer ? "Organizer" : "User";
      }

      // Crear descripción según acción
      switch (params.action) {
        case "create":
          description = `Se creó ${params.model} con Id ${entityId}.`;
          break;

        case "update":
          const updatedFields = [];
          for (const key in params.args.data) {
            const oldValue = before?.[key];
            const newValue = params.args.data[key];
            if (oldValue !== newValue) {
              updatedFields.push(`${key}: '${oldValue}' → '${newValue}'`);
            }
          }
          description = updatedFields.length
            ? `Se actualizaron los campos ${updatedFields.join(", ")} en ${params.model} con Id ${entityId}.`
            : `Se actualizó ${params.model} con Id ${entityId}, sin cambios visibles.`;
          break;

        case "delete":
          description = `Se eliminó ${params.model} con Id ${entityId}.`;
          break;
      }

      // Registrar auditoría
      await prisma.auditLog.create({
        data: {
          userId: global.currentUserId || null,
          userType,
          entityName: params.model,
          entityId,
          action: params.action.toUpperCase(),
          description,
        },
      });
    } catch (error) {
      console.error("Error en middleware de auditoría:", error);
    }

    return result;
  };
}

