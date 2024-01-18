import ProductionApp from '../controllers/ProductionApp'

export default (app) => {
    //? GET DATA
    app.get('/ProductionSCW', ProductionApp.getPDSCW)
    //? CREATE DATA
    app.post('/ProductionSCW', ProductionApp.createPDSCW)
    //? SAVE DATA BY ID
    app.post('/ProductionSCW/:id', ProductionApp.saveByIdPDSCW)
    //? GET EDIT DATA BY ID
    app.get('/ProductionSCW/:id', ProductionApp.getByIdPDSCW)
    //! REMOVE DATA BY ID
    app.delete('/ProductionSCW/:id', ProductionApp.removePDSCW)
    //? BULK
    app.post('/ProductionScwArr', ProductionApp.creatPDSCWarr)
}
