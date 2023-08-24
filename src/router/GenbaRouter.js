import GenbaSystem from '../controllers/GenbaSystem'

export default (app) => {
    app.post('/genbaAcip/:id', GenbaSystem.instGenbaAcip)
    app.delete('/genbaAcipDel/:id', GenbaSystem.delGenbaAcipOne)
    app.post('/genbaAcip', GenbaSystem.saveGenbaAcip)
    app.get('/genbaAcip', GenbaSystem.getGenbaAcip)
    app.get('/genbaAcipOne/:id', GenbaSystem.getGenbaAcipOne)
}
