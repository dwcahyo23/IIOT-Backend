import GenbaSystem from '../controllers/GenbaSystem'

export default (app) => {
    app.post('/genbaAcip/:id', GenbaSystem.instGenbaAcip)
}