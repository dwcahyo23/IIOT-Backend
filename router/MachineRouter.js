import express from "express";
import {
	// machines 
	postMachineIndex,
	bulkMachineIndex,
	getMachineIndex,
	updateMachineIndex,
	deleteMachineIndex,
	// items
	postMachineItem,
	bulkMachineItem,
	getMachineItems,
	getMachineItem,
	updateMachineItem,
	deleteMachineItem,
} from "../controllers/MachineControllers.js";

import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/machine', postMachineIndex);
router.post('/machines', bulkMachineIndex);
router.get('/machine/:uuid', getMachineIndex);
router.patch('/machine/:uuid', updateMachineIndex);
router.delete('/machine/:uuid', deleteMachineIndex);

router.post('/machineitem', verifyToken, postMachineItem);
router.post('/machineitems', verifyToken, bulkMachineItem);
router.get('/machineitems', verifyToken, getMachineItems)
router.get('/machineitem/:uuid', verifyToken, getMachineItem)
router.patch('/machineitem/:uuid', verifyToken, updateMachineItem);
router.delete('/machineitem/:uuid', verifyToken, deleteMachineItem);

export default router;