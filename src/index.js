import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import AuthRouter from './router/AuthRouter.js'
import Genba from './router/GenbaRouter.js'

import ModbusAppRouter from './router/ModbusAppRouter.js'
import MaintenanceSystemRouter from './router/MaintenanceSystemRouter.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(AuthRouter)
ModbusAppRouter(app)
MaintenanceSystemRouter(app)
Genba(app)

app.listen(process.env.PORT_APP, () =>
    console.log(`Server up & running in ${process.env.PORT_APP}`)
)
