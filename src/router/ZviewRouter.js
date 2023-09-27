import ZviewSystem from '../controllers/ZviewSystem'

export default (app) => {
    app.post('/ZbConn', ZviewSystem.insZbConn)
    app.post('/ZbSens', ZviewSystem.insZbSens)
    app.post('/ZbView', ZviewSystem.insZbView)

    app.get('/Zb', ZviewSystem.getZb)
    app.get('/ZbOn', ZviewSystem.getZbOnlie)
}
