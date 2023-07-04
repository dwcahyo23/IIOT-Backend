import MaintenanceSystem from '../controllers/MaintenanceSystem.js'
import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    app.get('/maintenanceSystem', MaintenanceSystem.getMaintenanceSystem)
    app.get(
        '/maintenanceMachine/:uuid',
        MaintenanceSystem.getMaintenanceMachineBy
    )
    app.get('/maintenanceMachine', MaintenanceSystem.getMaintenanceMachine)
    app.get('/maintenanceCategory', MaintenanceSystem.getMaintenanceCategory)
    app.get(
        '/maintenanceMachineCom',
        MaintenanceSystem.getMaintenanceMachineCom
    )
    app.get(
        '/maintenanceMachineProcess',
        MaintenanceSystem.getMaintenanceMachineProcess
    )
    app.get('/pgMaintenance', MaintenanceSystem.pGMaintenance)
    app.get('/maintenanceStock', MaintenanceSystem.getMaintenanceStock)
    app.post('/maintenanceStock', MaintenanceSystem.insMaintenanceStock)
    app.post('/maintenanceMachine', MaintenanceSystem.insMaintenanceMachine)
    app.post('/maintenanceSparepart', MaintenanceSystem.insMaintenanceSparepart)
    app.post('/maintenanceReport', MaintenanceSystem.insMaintenanceReport)
    app.post('/maintenanceRequest', MaintenanceSystem.insMaintenanceRequest)
    app.post('/maintenanceCategory', MaintenanceSystem.insMaintenanceCategory)
}
