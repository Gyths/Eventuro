import { Router } from 'express';
import { ensureAuth } from '../middlewares/ensureAuth.js';
import { protectedHello } from '../controllers/user.controller.js';

const router = Router();

router.get('/protected', ensureAuth, protectedHello);

export default router;
