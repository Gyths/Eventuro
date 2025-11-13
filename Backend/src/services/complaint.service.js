import { createComplaintRepo } from "../repositories/complaint.repo.js";

export async function createComplaintSvc(complaintData,evidence) {
  return createComplaintRepo(complaintData, evidence);
}
