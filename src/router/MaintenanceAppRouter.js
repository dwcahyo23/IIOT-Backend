import MaintenanceApp from '../controllers/MaintenanceApp.js'
import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    //? GET DATA
    app.get('/mnreport', verifyToken, MaintenanceApp.getMnReport)
    app.get('/mnrequest', verifyToken, MaintenanceApp.getMnRequest)
    app.get('/mnmachine', verifyToken, MaintenanceApp.getMnMachine)
    app.get('/mnsparepart', verifyToken, MaintenanceApp.getMnSparepart)
    app.get('/mnstock', verifyToken, MaintenanceApp.getMnStock)
    app.get('/mnstockcontrol', verifyToken, MaintenanceApp.getMnStockControl)
    app.get('/mnerp', verifyToken, MaintenanceApp.getMnErp)
    app.get('/stokmnerp', MaintenanceApp.getMnStokErp)
    app.get('/issumnerp', MaintenanceApp.getMnIssuErp)

    //? GET DATA BY ID
    app.get('/mnreportid/:id', verifyToken, MaintenanceApp.getMnReportById)
    app.get('/mnrequestid/:id', verifyToken, MaintenanceApp.getMnRequestById)
    app.get('/mnmachineid/:id', verifyToken, MaintenanceApp.getMnMachineById)
    app.get(
        '/mnsparepartid/:id',
        verifyToken,
        MaintenanceApp.getMnSparepartById
    )
    app.get('/mnstockid/:id', verifyToken, MaintenanceApp.getMnStockById)
    app.get(
        '/mnstockcontrolid/:id',
        verifyToken,
        MaintenanceApp.getMnStockControlById
    )
    app.get('/mnerpid/:id', verifyToken, MaintenanceApp.getMnErpById)

    //? SAVE DATA BY ID
    app.patch('/mnreportid/:id', verifyToken, MaintenanceApp.saveMnReportById)
    app.patch('/mnrequestid/:id', verifyToken, MaintenanceApp.saveMnRequestById)
    app.patch('/mnmachineid/:id', verifyToken, MaintenanceApp.saveMnMachineById)
    app.patch(
        '/mnsparepartid/:id',
        verifyToken,
        MaintenanceApp.saveMnSparepartById
    )
    app.patch('/mnstockid/:id', verifyToken, MaintenanceApp.saveMnStockById)
    app.patch(
        '/mnstockcontrolid/:id',
        verifyToken,
        MaintenanceApp.saveMnStockControlById
    )

    //! REMOVE DATA BY ID
    app.delete(
        '/mnreportid/:id',
        verifyToken,
        MaintenanceApp.removeMnReportById
    )
    app.delete(
        '/mnrequestid/:id',
        verifyToken,
        MaintenanceApp.removeMnRequestById
    )
    app.delete(
        '/mnmachineid/:id',
        verifyToken,
        MaintenanceApp.removeMnMachineById
    )
    app.delete(
        '/mnsparepartid/:id',
        verifyToken,
        MaintenanceApp.removeMnSparepartById
    )
    app.delete('/mnstockid/:id', verifyToken, MaintenanceApp.removeMnStockById)
}
