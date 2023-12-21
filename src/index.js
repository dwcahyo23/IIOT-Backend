import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import AuthRouter from './router/AuthRouter.js'
import Genba from './router/GenbaRouter.js'
import ModbusAppRouter from './router/ModbusAppRouter.js'
import MaintenanceSystemRouter from './router/MaintenanceSystemRouter.js'
import WhatsappRouter from './router/WhatsappRouter.js'
import ZviewRouter from './router/ZviewRouter.js'
import QuestRouter from './router/QuestRouter.js'
import ProductionAppRouter from './router/ProductionAppRouter.js'

dotenv.config()

const app = express()
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Authorization', 'Content-Type'],
    })
)
app.use(helmet())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(AuthRouter)
ModbusAppRouter(app)
MaintenanceSystemRouter(app)
Genba(app)
WhatsappRouter(app)
ZviewRouter(app)
QuestRouter(app)
ProductionAppRouter(app)

app.listen(process.env.PORT_APP, () =>
    console.log(`Server up & running in ${process.env.PORT_APP}`)
)
