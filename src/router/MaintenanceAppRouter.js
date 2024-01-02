import MaintenanceApp from '../controllers/MaintenanceApp.js'
import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    //? GET DATA
    app.get('/mnreport', MaintenanceApp.getMnReport)
    app.get('/mnrequest', MaintenanceApp.getMnRequest)
    app.get('/mnmachine', MaintenanceApp.getMnMachine)
    app.get('/mnsparepart', MaintenanceApp.getMnSparepart)
    app.get('/mnstock', MaintenanceApp.getMnStock)
    app.get('/mnerp', MaintenanceApp.getMnErp)

    //? GET DATA BY ID
    app.get('/mnreportid/:id', MaintenanceApp.getMnReportById)
    app.get('/mnrequestid/:id', MaintenanceApp.getMnRequestById)
    app.get('/mnmachineid/:id', MaintenanceApp.getMnMachineById)
    app.get('/mnsparepartid/:id', MaintenanceApp.getMnSparepartById)
    app.get('/mnstockid/:id', MaintenanceApp.getMnStockById)
    app.get('/mnerpid/:id', MaintenanceApp.getMnErpById)

    //? SAVE DATA BY ID
    app.patch('/mnreportid/:id', MaintenanceApp.saveMnReportById)
    app.patch('/mnrequestid/:id', MaintenanceApp.saveMnRequestById)
    app.patch('/mnmachineid/:id', MaintenanceApp.saveMnMachineById)
    app.patch('/mnsparepartid/:id', MaintenanceApp.saveMnSparepartById)
    app.patch('/mnstockid/:id', MaintenanceApp.saveMnStockById)

    //! REMOVE DATA BY ID
    app.delete('/mnreportid/:id', MaintenanceApp.removeMnReportById)
    app.delete('/mnrequestid/:id', MaintenanceApp.removeMnRequestById)
    app.delete('/mnmachineid/:id', MaintenanceApp.removeMnMachineById)
    app.delete('/mnsparepartid/:id', MaintenanceApp.removeMnSparepartById)
    app.delete('/mnstockid/:id', MaintenanceApp.removeMnStockById)
}
