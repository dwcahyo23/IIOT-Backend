import { default as Mn } from '../controllers/MaintenanceSystem'
import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    //!@noone
    // app.get('/maintenanceCategory',verifyToken, Mn.getMaintenanceCategory)
    // app.post('/maintenanceCategory',verifyToken, Mn.insMaintenanceCategory)

    //!false
    // app.get('/maintenanceMachineOne/:uuid',verifyToken, Mn.getMaintenanceMachineByOne)
    // app.get('/pgMaintenance',verifyToken, Mn.pGMaintenance)
    // app.post('/maintenanceStock',verifyToken, Mn.insMaintenanceStock)
    // app.post('/maintenanceSparepart',verifyToken, Mn.insMaintenanceSparepart)
    // app.post('/maintenanceWorkshopReport',verifyToken, Mn.instMaintenanceBulkWorkshopReport)
    // app.post('/maintenanceMachine',verifyToken, Mn.insMaintenanceMachine)
    // app.post('/maintenanceMachine/update',verifyToken, Mn.updateMaintenanceMachine)
    // app.post('/maintenanceControlStockB',verifyToken, Mn.instMaintenanceBulkControllStock)
    // app.post('/maintenanceReportB',verifyToken, Mn.instMaintenanceBulkReport)
    // app.post('/maintenanceRequestB',verifyToken, Mn.instMaintenanceBulkRequest)
    //Menu dashboard dialog AP-User
    // app.post('/maintenanceSparepartBulk',verifyToken, Mn.insMaintenanceSparepartBulkFind)

    //!@get
    app.get(
        '/maintenanceMachine/:uuid',
        verifyToken,
        Mn.getMaintenanceMachineBy
    )
    app.get('/maintenanceStock', verifyToken, Mn.getMaintenanceStock)
    app.get('/maintenanceMachineCom', verifyToken, Mn.getMaintenanceMachineCom)
    app.get(
        '/maintenanceMachineProcess',
        verifyToken,
        Mn.getMaintenanceMachineProcess
    )
    app.get('/maintenanceSystem', verifyToken, Mn.getMaintenanceSystem)
    app.get('/pgMaintenance', verifyToken, Mn.pGMaintenance)
    app.get('/maintenanceDashboard/:com/:section', verifyToken, Mn.dashboardMN)
    app.get(
        '/maintenanceControlStock',
        verifyToken,
        Mn.getMaintenanceControlStock
    )
    app.get('/maintenanceMachine', verifyToken, Mn.getMaintenanceMachine)
    app.get(
        '/machineSheet/:uuid/:sheet_no/:uuid_request',
        Mn.getMaintenanceMachineBySheet
    )
    app.get('/maintenanceReport', verifyToken, Mn.getMaintenanceReport)
    app.get('/maintenanceRequest', verifyToken, Mn.getMaintenanceRequest)
    app.get('/userData', verifyToken, Mn.getUser)

    //!@post
    app.post('/maintenanceReport', verifyToken, Mn.insMaintenanceReport)
    // app.post('/maintenanceRequest',verifyToken, Mn.insMaintenanceRequest)
    app.post(
        '/maintenanceControlStock',
        verifyToken,
        Mn.instMaintenanceControlStock
    )
    app.post(
        '/maintenanceControlUpdateStock',
        verifyToken,
        Mn.updateStockMaintenanceControlStock
    )
    app.post(
        '/maintenanceRequest/:options/:user',
        verifyToken,
        Mn.handleMaintenanceRequest
    )
}
