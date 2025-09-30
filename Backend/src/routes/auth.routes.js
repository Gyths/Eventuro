import { Router } from 'express';
import { passport } from '../services/passport.js';
import { home, failure, logout, login } from '../controllers/auth.controller.js';
import { tempRegister } from '../controllers/auth.controller.js';

const router = Router();

router.get('/', home);
/*router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);
router.get('/auth/failure', failure);
router.get('/logout', logout);
*/
router.get('/login', login);
router.post("/temp-register", tempRegister);

export default router;
