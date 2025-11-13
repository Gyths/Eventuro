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