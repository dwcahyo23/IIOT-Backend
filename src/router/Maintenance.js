import Maintenance from '../controllers/Maintenance'

import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    app.post('/insCategory', Maintenance.insCategory)
    app.get('/getcategory', Maintenance.getCategory)
    app.post('/insUser', Maintenance.insUser)
    app.get('/getUser', Maintenance.getUser)
    app.post('/insItem', Maintenance.insItem)
    app.get('/finItem', Maintenance.finItem)
    app.get('/finItemBy/:uuid', Maintenance.finItemBy)
    app.get('/pgmtn', Maintenance.pgMtn)
}
