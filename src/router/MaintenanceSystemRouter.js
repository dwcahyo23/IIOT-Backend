import { default as Mn } from '../controllers/MaintenanceSystem'
import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    //!@noone
    // app.get('/maintenanceCategory', Mn.getMaintenanceCategory)
    // app.post('/maintenanceCategory', Mn.insMaintenanceCategory)

    //!false
    // app.get('/maintenanceMachineOne/:uuid', Mn.getMaintenanceMachineByOne)
    // app.get('/pgMaintenance', Mn.pGMaintenance)
    // app.post('/maintenanceStock', Mn.insMaintenanceStock)
    // app.post('/maintenanceSparepart', Mn.insMaintenanceSparepart)
    // app.post('/maintenanceWorkshopReport', Mn.instMaintenanceBulkWorkshopReport)
    // app.post('/maintenanceMachine', Mn.insMaintenanceMachine)
    // app.post('/maintenanceMachine/update', Mn.updateMaintenanceMachine)
    // app.post('/maintenanceControlStockB', Mn.instMaintenanceBulkControllStock)
    // app.post('/maintenanceReportB', Mn.instMaintenanceBulkReport)
    // app.post('/maintenanceRequestB', Mn.instMaintenanceBulkRequest)
    //Menu dashboard dialog AP-User
    // app.post('/maintenanceSparepartBulk', Mn.insMaintenanceSparepartBulkFind)

    //!@get
    app.get('/maintenanceMachine/:uuid', Mn.getMaintenanceMachineBy)
    app.get('/maintenanceStock', Mn.getMaintenanceStock)
    app.get('/maintenanceMachineCom', Mn.getMaintenanceMachineCom)
    app.get('/maintenanceMachineProcess', Mn.getMaintenanceMachineProcess)
    app.get('/maintenanceSystem', Mn.getMaintenanceSystem)
    app.get('/maintenanceDashboard/:com/:section', Mn.dashboardMN)
    app.get('/maintenanceControlStock', Mn.getMaintenanceControlStock)
    app.get('/maintenanceMachine', Mn.getMaintenanceMachine)
    app.get(
        '/machineSheet/:uuid/:sheet_no/:uuid_request',
        Mn.getMaintenanceMachineBySheet
    )
    app.get('/maintenanceReport', Mn.getMaintenanceReport)
    app.get('/maintenanceRequest', Mn.getMaintenanceRequest)
    app.get('/userData', Mn.getUser)

    //!@post
    app.post('/maintenanceReport', Mn.insMaintenanceReport)
    // app.post('/maintenanceRequest', Mn.insMaintenanceRequest)
    app.post('/maintenanceControlStock', Mn.instMaintenanceControlStock)
    app.post(
        '/maintenanceControlUpdateStock',
        Mn.updateStockMaintenanceControlStock
    )
    app.post('/maintenanceRequest/:options/:user', Mn.handleMaintenanceRequest)
}
