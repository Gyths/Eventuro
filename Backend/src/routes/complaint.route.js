import { Router } from 'express';
import { verifyToken } from "../middlewares/ensureAuth.js";
import { 
  createComplaintController, 
  listComplaintsByUserController,
  listComplaintsByAdminController,
  getComplaintDetailController,
  updateComplaintStateController
} from "../controllers/complaint.controller.js";
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post('/', upload.single("evidence"), verifyToken, createComplaintController);
router.get('/user/:userId', listComplaintsByUserController);

// Listar todos los reclamos para administradores
router.get("/list", listComplaintsByAdminController);
router.get("/:complaintId/detail", getComplaintDetailController);
router.put("/:complaintId/update", updateComplaintStateController);


export default router;
