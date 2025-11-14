import { 
  createComplaintRepo, 
  listComplaintsByUserRepo,
  listComplaintsByAdminRepo,
  getComplaintDetailRepo,
  updateComplaintStateRepo 
} from "../repositories/complaint.repo.js";

export async function createComplaintSvc(complaintData, evidence) {
  return createComplaintRepo(complaintData, evidence);
}

export async function listComplaintsByUserSvc(userId) {
  return listComplaintsByUserRepo(userId);
}

export async function listComplaintsByAdminSvc() {
  return listComplaintsByAdminRepo();
}

export async function getComplaintDetailSvc(complaintId) {
  return await getComplaintDetailRepo(complaintId);
}

export async function updateComplaintStateSvc(complaintId, state) {
  return updateComplaintStateRepo(complaintId, state);
}