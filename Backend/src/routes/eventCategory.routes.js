import { Router } from 'express'
import { ensureAuth } from '../middlewares/ensureAuth.js'
import { createEventCategory } from '../controllers/eventCategory.controller.js'
import { updateEventCategory } from '../controllers/eventCategory.controller.js'
import { deleteEventCategory } from '../controllers/eventCategory.controller.js'
import { listEventCategories } from '../controllers/eventCategory.controller.js'

const router = Router();

//Agregar ensureAuth antes de despliegue
router.post('/', createEventCategory);
router.put('/:id', updateEventCategory);
router.delete('/:id', deleteEventCategory);
router.get('/',  listEventCategories);

export default router;