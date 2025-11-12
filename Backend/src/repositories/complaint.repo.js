import { prisma } from '../config/prisma.config.js';

export async function createComplaint(input) {
  return prisma.complaint.create({
    data: input
  });
}
