import express from 'express'
import { createOrderCtrl } from '../controllers/order.controller.js'

const router = express.Router();

router.post('/', createOrderCtrl);

export default router;
