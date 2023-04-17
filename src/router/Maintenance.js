import Maintenance from '../controllers/Maintenance'

import { verifyToken } from '../middleware/verifyToken.js'

export default (app) => {
    app.post('/insCategory', verifyToken, Maintenance.insCategory)
    app.get('/getcategory', verifyToken, Maintenance.getCategory)
    app.get('/getusr', Maintenance.getUser)
    app.post('/insItem', verifyToken, Maintenance.insItem)
    app.get('/finItem', verifyToken, Maintenance.finItem)
    app.get('/finItemBy/:uuid', verifyToken, Maintenance.finItemBy)
    app.get('/pgmtn', Maintenance.pgMtn)
}
