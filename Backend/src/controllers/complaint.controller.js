import { 
  createComplaintSvc, 
  listComplaintsByUserSvc,
  listComplaintsByAdminSvc,
  getComplaintDetailSvc,
  updateComplaintStateSvc
} from "../services/complaint.service.js";
import { toJSONSafe } from "../utils/serialize.js";

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
    res.status(200).json(toJSONSafe(complaints));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to list complaints', details: error.message });
  }
}

export async function listComplaintsByAdminController(req, res) {
  try {
    const data = await listComplaintsByAdminSvc();
    res.status(200).json(toJSONSafe(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to list complaints" });
  }
}

export async function getComplaintDetailController(req, res) {
  try {
    const { complaintId } = req.params;

    const detail = await getComplaintDetailSvc(complaintId);

    return res.status(200).json(toJSONSafe(detail));

  } catch (error) {
    console.error("getComplaintDetailController error:", error);
    return res.status(500).json({
      ok: false,
      message: "Failed to get complaint detail",
      error: error.message,
    });
  }
}

export async function updateComplaintStateController(req, res) {
  try {
    const { complaintId } = req.params;
    const { state } = req.body;

    // Validación simple
    const validStates = ["PENDING", "ACCEPTED", "NEGATED"];
    if (!validStates.includes(state)) {
      return res.status(400).json({ error: "Invalid state value" });
    }

    const updated = await updateComplaintStateSvc(complaintId, state);

    return res.status(200).json(toJSONSafe(updated));

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update complaint state",
      details: error.message
    });
  }
}