import express from "express";
import {
	// machines 
	postMachineIndex,
	bulkMachineIndex,
	getMachineIndex,
	getMachines,
	updateMachineIndex,
	deleteMachineIndex,
	// items
	bulkMachineItem,
	getMachineItems,
	getMachineItem,
	updateMachineItem,
	deleteMachineItem,
} from "../controllers/MachineControllers.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/machine/:uuid', postMachineIndex);
router.post('/machines', bulkMachineIndex);
router.get('/machines', getMachines);
router.get('/machine/:uuid', getMachineIndex);
router.patch('/machine/:uuid', verifyToken, updateMachineIndex);
router.delete('/machine/:uuid', verifyToken, deleteMachineIndex);

router.post('/machineitems', bulkMachineItem);
router.get('/machineitems', getMachineItems)
router.get('/machineitem/:uuid', getMachineItem)
router.patch('/machineitem/:uuid', verifyToken, updateMachineItem);
router.delete('/machineitem', verifyToken, deleteMachineItem);

export default router;