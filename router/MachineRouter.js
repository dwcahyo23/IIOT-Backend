import express from "express";
import { postMachineIndex } from "../controllers/MachineControllers.js";

const router = express.Router();

router.post('/machine',postMachineIndex);

export default router;