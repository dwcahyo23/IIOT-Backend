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
	getMachineItem,
	updateMachineItem,
	deleteMachineItem,
} from "../controllers/MachineControllers.js";

const router = express.Router();

router.post('/machine',postMachineIndex);
router.post('/machines',bulkMachineIndex);
router.get('/machine/:uuid',getMachineIndex);
router.patch('/machine/:uuid',updateMachineIndex);
router.delete('/machine/:uuid',deleteMachineIndex);

router.post('/machineitem',postMachineItem);
router.post('/machineitems',bulkMachineItem);
router.get('/machineitem/:uuid',getMachineItem)
router.patch('/machineitem/:uuid',updateMachineItem);
router.delete('/machineitem/:uuid',deleteMachineItem);

export default router;