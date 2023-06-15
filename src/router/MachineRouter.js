import express from 'express'
import {
    // machines
    postMachineIndex,
    bulkMachineIndex,
    getMachineIndex,
    getMachines,
    updateMachineIndex,
    deleteMachineIndex,
    getMachineby,
    // items
    bulkMachineItem,
    getMachineItems,
    getMachineItem,
    updateMachineItem,
    deleteMachineItem,
} from '../controllers/MachineControllers.js'

import { verifyToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.post('/machine/:uuid', verifyToken, postMachineIndex)
router.post('/machines', bulkMachineIndex)
router.get('/machines', verifyToken, getMachines)
router.get('/machine/:uuid', verifyToken, getMachineIndex)
router.patch('/machine/:uuid', verifyToken, updateMachineIndex)
router.delete('/machine/:uuid', verifyToken, deleteMachineIndex)
router.get('/machineby/:mch_process', verifyToken, getMachineby)

router.post('/machineitems', verifyToken, bulkMachineItem)
router.get('/machineitems', getMachineItems)
router.get('/machineitem/:uuid', verifyToken, getMachineItem)
router.patch('/machineitem/:uuid', verifyToken, updateMachineItem)
router.delete('/machineitem', verifyToken, verifyToken, deleteMachineItem)

export default router
