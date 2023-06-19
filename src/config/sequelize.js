/* eslint-disable no-underscore-dangle */
import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

const winston = require('winston')

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
})

dotenv.config()

const sequelize = new Sequelize(
    process.env.TABLE_DB,
    process.env.USER_DB,
    process.env.PASSWORD_DB,
    {
        host: process.env.HOST_DB,
        port: process.env.PORT_DB,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
            useUTC: false,
        },
        timezone: '+07:00',
        // dialectOptions: { autoJsonMap: false },

        // logging: (msg) => logger.info(msg),
    }
)

export default sequelize
;(async () => {
    await sequelize.sync()
})()
