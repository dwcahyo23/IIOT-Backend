/* eslint-disable no-underscore-dangle */
import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

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
    }
)

export default sequelize
// ;(async () => {
//     await sequelize.sync()
// })()
