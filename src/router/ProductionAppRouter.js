import ProductionApp from '../controllers/ProductionApp'

export default (app) => {
    app.get('/ProductionSCW', ProductionApp.getPDSCW)
}
