import { createComplaintSvc } from '../services/complaint.service.js';

export async function createComplaintController(req, res) {
  try {
    const complaintData = req.body;
    const newComplaint = await createComplaintSvc(complaintData);
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create complaint' });
  }
}
