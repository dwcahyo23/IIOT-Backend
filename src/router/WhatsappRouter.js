import WhatsappSystem from '../controllers/WhatsappSystem'

export default (app) => {
    app.get('/userWhatsapp', WhatsappSystem.getUser)
    app.post('/userWhatsapp', WhatsappSystem.insUser)
    app.get('/newsWorderOpen', WhatsappSystem.worderTodayOpen)
    app.get('/newsWorderClose', WhatsappSystem.worderTodayClose)
    app.get('/newsLog', WhatsappSystem.getLog)
    app.post('/sprtbreakdown/:cat/:com', WhatsappSystem.getSparepart)
}
