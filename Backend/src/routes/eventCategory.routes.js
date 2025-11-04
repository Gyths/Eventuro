import { Router } from 'express'
import { verifyToken } from '../middlewares/ensureAuth.js'
import { attachUserContext } from '../middlewares/ensureAuth.js'
import { createEventCategory } from '../controllers/eventCategory.controller.js'
import { updateEventCategory } from '../controllers/eventCategory.controller.js'
import { deleteEventCategory } from '../controllers/eventCategory.controller.js'
import { listEventCategories } from '../controllers/eventCategory.controller.js'

const router = Router();

//Agregar ensureAuth antes de despliegue
router.post('/', verifyToken, attachUserContext, createEventCategory);
router.put('/:id', verifyToken, attachUserContext, updateEventCategory);
router.delete('/:id', verifyToken, attachUserContext, deleteEventCategory);
router.get('/',  listEventCategories);

export default router;