import express from 'express';
import { updateModbus } from '../controllers/ModbusControllers.js';

const router = express.Router();

router.post('/modbus', updateModbus);

export default router;
