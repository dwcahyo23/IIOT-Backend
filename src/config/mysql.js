import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const mysql = new Sequelize(
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
        // logging: (...msg) => console.log(msg),
        // logging: (msg) => logger.info(msg),
    }
)

export default mysql
;(async () => {
    await mysql.sync()
})()
