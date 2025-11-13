import { createComplaintRepo } from "../repositories/complaint.repo.js";

export async function createComplaintSvc(complaintData) {
  return createComplaintRepo(complaintData);
}
