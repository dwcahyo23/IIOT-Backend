import GenbaSystem from '../controllers/GenbaSystem'

export default (app) => {
    app.post('/genbaAcip/:id', GenbaSystem.instGenbaAcip)
    app.post('/genbaAcipUp/:id', GenbaSystem.updtGenbaAcip)
    app.delete('/genbaAcipDel/:id', GenbaSystem.delGenbaAcipOne)
    app.post('/genbaAcipRem/:id', GenbaSystem.removeGenbaAcipOne)
    app.post('/genbaAcipConvert', GenbaSystem.ConvertAcip)
    app.post('/genbaAcip', GenbaSystem.saveGenbaAcip)
    app.get('/genbaAcip', GenbaSystem.getGenbaAcip)
    app.get('/genbaAcipOne/:id', GenbaSystem.getGenbaAcipOne)
}
