import { default as Mn } from '../controllers/MaintenanceSystem'
import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    app.get('/maintenanceSystem', Mn.getMaintenanceSystem)
    app.get('/userData', Mn.getUser)
    app.get('/maintenanceMachine/:uuid', Mn.getMaintenanceMachineBy)
    app.get('/maintenanceMachineOne/:uuid', Mn.getMaintenanceMachineByOne)
    app.get('/maintenanceMachine', Mn.getMaintenanceMachine)
    app.get('/maintenanceCategory', Mn.getMaintenanceCategory)
    app.get('/maintenanceMachineCom', Mn.getMaintenanceMachineCom)
    app.get('/maintenanceMachineProcess', Mn.getMaintenanceMachineProcess)
    app.get('/maintenanceControlStock', Mn.getMaintenanceControlStock)

    app.get('/maintenanceRequest', Mn.getMaintenanceRequest)
    app.get('/maintenanceReport', Mn.getMaintenanceReport)
    app.get('/pgMaintenance', Mn.pGMaintenance)
    app.get('/maintenanceStock', Mn.getMaintenanceStock)
    app.post('/maintenanceStock', Mn.insMaintenanceStock)

    app.post('/maintenanceSparepart', Mn.insMaintenanceSparepart)
    app.post('/maintenanceReport', Mn.insMaintenanceReport)
    app.post('/maintenanceRequest', Mn.insMaintenanceRequest)
    app.post('/maintenanceCategory', Mn.insMaintenanceCategory)
    app.post('/maintenanceControlStock', Mn.instMaintenanceControlStock)

    app.post('/maintenanceMachine', Mn.insMaintenanceMachine)
    app.post('/maintenanceControlStockB', Mn.instMaintenanceBulkControllStock)
    app.post('/maintenanceSparepartBulk', Mn.insMaintenanceSparepartBulkFind)
    app.post('/maintenanceReportB', Mn.instMaintenanceBulkReport)
    app.post('/maintenanceRequestB', Mn.instMaintenanceBulkRequest)
}
