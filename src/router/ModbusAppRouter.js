import ModbusApp from '../controllers/ModbusApp'

export default (app) => {
    app.post('/insCategoryAddress', ModbusApp.insCategory)
    app.get('/getCategoryAddress', ModbusApp.getCategory)
    app.post('/insAddress', ModbusApp.insAddress)
    app.get('/getAddress', ModbusApp.getAddress)
    app.post('/insResultAddress', ModbusApp.insResult)
    app.get('/getResultAddress', ModbusApp.getResult)
    app.get('/getResultBy/:mch_code', ModbusApp.getResultBy)
}
