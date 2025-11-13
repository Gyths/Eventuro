import { prisma } from '../config/prisma.config.js';
import { uploadFile, getSignedUrlForFile } from "../utils/s3.js";

export async function createComplaintRepo(input) {
  const buffer = input.evidence.buffer;
  const fileName = `evidence/${Date.now()}_${input.evidence.originalname
    }`;
  evidenceKey = await uploadFile(
    fileName,
    buffer,
    input.evidence.mimetype
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
