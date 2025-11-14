import { prisma } from '../utils/prisma.js';
import { uploadFile, getSignedUrlForFile } from "../utils/s3.js";

export async function createComplaintRepo(input, evidenceFile) {
  const buffer = evidenceFile.buffer;
  const fileName = `evidence/${Date.now()}_${evidenceFile.originalname}`;
  const evidenceKey = await uploadFile(
    fileName,
    buffer,
    evidenceFile.mimetype
  );

  return await prisma.complaint.create({
    data: {
      userId: input.userId ? BigInt(input.userId) : null,
      fullName: input.fullName,
      dni: input.dni,
      address: input.address,
      phone: input.phone,
      email: input.email,
      eventName: input.eventName,
      ticketNum: input.ticketNum ? BigInt(input.ticketNum) : null,
      itemType: input.itemType,
      itemDescription: input.itemDescription,
      amountClaimed: input.amountClaimed,
      type: input.type,
      problemDescription: input.problemDescription,
      expectedSolution: input.expectedSolution,
      target: input.target,
      evidenceUrlKeys: evidenceKey,
    },
  });
}
export async function listComplaintsByUserRepo(userId) {
  const complaints = await prisma.complaint.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  
  const withDownloadUrl = await Promise.all(
    complaints.map(async (c) => {
      let URLDescarga = null;
      if (c.evidenceUrlKeys) {
        try {
          URLDescarga = await getSignedUrlForFile(c.evidenceUrlKeys);
        } catch (err) {
          console.error("Error generando URLDescarga:", err);
        }
      }
      
      return {
        ...c,
        URLDescarga,
      };
    })
  );

  return withDownloadUrl;
}

export async function listComplaintsByAdminRepo() {
  const complaints = await prisma.complaint.findMany({
    where: { state: "PENDING" },
    orderBy: { dateCreation: "desc" },
    select: {
      complaintId: true,
      dateCreation: true,
      fullName: true,
      eventName: true,
      target: true,
      state: true,
    },
  });

  // Mapeo de enums a etiquetas amigables
  const targetMap = {
    PAGE: "Página",
    ORGANIZER: "Organizador",
    EVENT: "Evento",
    OTHERS: "Otros",
  };

  const stateMap = {
    PENDING: "Pendiente",
    ACCEPTED: "Aceptado",
    NEGATED: "Negado",
  };

  return complaints.map(c => ({
    complaintId: c.complaintId,
    dateCreation: c.dateCreation,
    fullName: c.fullName,
    eventName: c.eventName,
    target: targetMap[c.target] ?? c.target,
    state: stateMap[c.state] ?? c.state,
  }));
}

export async function getComplaintDetailRepo(complaintId) {
  const complaint = await prisma.complaint.findUnique({
    where: { complaintId: BigInt(complaintId) },
    select: {
      complaintId: true,
      dateCreation: true,
      fullName: true,
      dni: true,
      address: true,
      phone: true,
      email: true,
      userId: true,

      eventName: true,
      ticketNum: true,

      itemType: true,
      itemDescription: true,
      amountClaimed: true,

      type: true,
      problemDescription: true,
      expectedSolution: true,

      evidenceUrlKeys: true,

      target: true,
      state: true,

      user: {
        select: {
          birthdate: true,
        }
      }
    }
  });

  if (!complaint) {
    throw new Error("Complaint not found");
  }

  // Crear URL firmada para descargar evidencia
  let evidenceDownloadUrl = null;
  if (complaint.evidenceUrlKeys) {
    try {
      evidenceDownloadUrl = await getSignedUrlForFile(complaint.evidenceUrlKeys);
    } catch (err) {
      console.error("Error generating evidence URL:", err);
    }
  }

  return {
    ...complaint,
    evidenceDownloadUrl,
    isMinor: complaint.user?.birthdate
      ? new Date().getFullYear() - complaint.user.birthdate.getFullYear() < 18
      : null
  };
}

export async function updateComplaintStateRepo(complaintId, newState) {

  return await prisma.complaint.update({
    where: { complaintId: BigInt(complaintId) },
    data: {
      state: newState,
    },
    select: {
      complaintId: true,
      state: true,
    }
  });
}
