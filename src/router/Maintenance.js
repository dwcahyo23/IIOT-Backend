import Maintenance from '../controllers/Maintenance'

import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    app.post('/insCategory', verifyToken, Maintenance.insCategory)
    app.get('/getcategory', verifyToken, Maintenance.getCategory)
    app.post('/insUser', Maintenance.insUser)
    app.get('/getUser', Maintenance.getUser)
    app.post('/insItem', verifyToken, Maintenance.insItem)
    app.get('/finItem', Maintenance.finItem)
    app.get('/finItemBy/:uuid', Maintenance.finItemBy)
    app.get('/pgmtn', Maintenance.pgMtn)
}
