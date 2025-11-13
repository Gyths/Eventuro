import { createComplaintRepo } from "../repositories/complaint.repo.js";
import { listComplaintsByUserRepo } from "../repositories/complaint.repo.js";

export async function createComplaintSvc(complaintData, evidence) {
  return createComplaintRepo(complaintData, evidence);
}

export async function listComplaintsByUserSvc(userId) {
  return listComplaintsByUserRepo(userId);
}
