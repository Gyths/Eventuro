import { createComplaintSvc } from '../services/complaint.service.js';

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
