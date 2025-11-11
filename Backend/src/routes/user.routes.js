import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth.js';
import { protectedHello } from '../controllers/user.controller.js';

import { getMe, putMe } from '../controllers/user.controller.js';
const router = Router();

router.get('/protected', ensureAuth, protectedHello);
router.get('/me', ensureAuth, getMe);
router.put('/me', ensureAuth, putMe);
export default router;
