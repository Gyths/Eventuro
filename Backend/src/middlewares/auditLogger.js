import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

export function auditMiddleware() {
  return async (params, next) => {
    const actionsToLog = ["create", "update", "delete"];

    // Si no es una acción relevante, continúa normal
    if (!actionsToLog.includes(params.action)) {
      return next(params);
    }

    // Ejecutar la acción dentro de un try/catch
    let result;
    try {
      // Verificar si el usuario actual es Administrador
      const currentUserId = global.currentUserId || null;

      if (!currentUserId) {
        // Si no hay usuario logueado, no auditar
        return await next(params);
      }

      // Buscar si este userId pertenece a un administrador
      const admin = await prisma.administrator.findUnique({
        where: { userId: currentUserId },
      });

      // Si no es administrador, no auditar
      if (!admin) {
        return await next(params);
      }

      // --- En este punto, sí es Administrador ---
      let description = "";
      let entityId = null;
      let before = null;

      // Si es update, obtenemos los datos previos
      if (params.action === "update") {
        before = await prisma[params.model.toLowerCase()].findUnique({
          where: params.args.where,
        });
      }

      // Ejecutar la acción real
      result = await next(params);

      // Obtener ID afectado
      const idField = Object.keys(result).find((key) =>
        key.toLowerCase().endsWith("id")
      );
      if (idField) entityId = result[idField];

      // Crear descripción según acción
      switch (params.action) {
        case "create":
          description = `Administrador ${currentUserId} creó ${params.model} con Id ${entityId}.`;
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
            ? `Administrador ${currentUserId} actualizó ${params.model} con Id ${entityId}. Campos: ${updatedFields.join(", ")}.`
            : `Administrador ${currentUserId} actualizó ${params.model} con Id ${entityId}, sin cambios visibles.`;
          break;

        case "delete":
          description = `Administrador ${currentUserId} eliminó ${params.model} con Id ${entityId}.`;
          break;
      }

      // Registrar auditoría
      await prisma.auditLog.create({
        data: {
          userId: currentUserId,
          userType: "Administrador",
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
