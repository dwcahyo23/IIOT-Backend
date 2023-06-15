import ModbusApp from '../controllers/ModbusApp'

export default (app) => {
    app.post('/insAddress', ModbusApp.insAddress)
    app.get('/getAddress', ModbusApp.getAddress)
    app.post('/insResultAddress', ModbusApp.insResult)
    app.get('/getResultAddress', ModbusApp.getResult)
}
