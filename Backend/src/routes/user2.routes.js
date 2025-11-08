import { Router } from 'express';
import { verifyToken } from '../middlewares/ensureAuth.js';
import { attachUserContext } from '../middlewares/ensureAuth.js';
import { requireAdmin } from '../middlewares/ensureAuth.js';
import { findUserByIdFull } from '../controllers/user.controller.js';

const router = Router();

router.get('/:id', verifyToken, attachUserContext, requireAdmin, findUserByIdFull);

export default router;