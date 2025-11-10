import { Router } from 'express';
import { verifyToken } from '../middlewares/ensureAuth.js';
import { attachUserContext } from '../middlewares/ensureAuth.js';
import { requireAdmin } from '../middlewares/ensureAuth.js';
import { findUserByIdFull } from '../controllers/user.controller.js';
import { getMe, putMe,changeMyPassword } from '../controllers/user.controller.js';
import { ensureAuth } from '../middlewares/ensureAuth.js';
const router = Router();

router.get('/:id', verifyToken, attachUserContext, requireAdmin, findUserByIdFull);
router.put('/:id/status', verifyToken, attachUserContext, requireAdmin, updateUserStatus);
router.get('/', verifyToken, attachUserContext, requireAdmin, listUsers)
router.get('/Me', verifyToken, attachUserContext, getMe);
router.put('/Me', verifyToken, attachUserContext, putMe);
router.put('/me/password', verifyToken, changeMyPassword);
router.get('/:id', verifyToken, attachUserContext, findUserByIdFull);

export default router;