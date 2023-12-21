import ProductionApp from '../controllers/ProductionApp'

export default (app) => {
    app.post('/insSCW', ProductionApp.insScw)
}
