import { createComplaintSvc } from '../services/complaint.service.js';
import { listComplaintsByUserSvc } from '../services/complaint.service.js';

export async function createComplaintController(req, res) {
  try {
    const complaintData = req.body;
    const evidence = req.file; // Assuming evidence is uploaded as a file
    const newComplaint = await createComplaintSvc(complaintData, evidence);
    res.status(201).json(JSON.parse(JSON.stringify(newComplaint, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )));
  } catch (error) {
    res.status(500).json({ error: 'Failed to create complaint', details: error.message });
  }
}

export async function listComplaintsByUserController(req, res) {
  try {
    const userId = BigInt(req.params.userId);
    const complaints = await listComplaintsByUserSvc(userId);
    res.status(200).json(jsonifyBigInt(complaints));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to list complaints', details: error.message });
  }
}
