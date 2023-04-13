import Maintenance from '../controllers/Maintenance'

export default (app) => {
    app.post('/insCategory', Maintenance.insCategory)
    app.get('/getcategory', Maintenance.getCategory)
    app.get('/getacedemy', Maintenance.getAcademy)
    app.post('/insItem', Maintenance.insItem)
    app.get('/finItem', Maintenance.finItem)
}
