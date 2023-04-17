import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const pg = new Sequelize(
    process.env.TABLE_DBR,
    process.env.USER_DBR,
    process.env.PASSWORD_DBR,
    {
        host: process.env.HOST_DBR,
        port: process.env.PORT_DBR,
        dialect: 'postgres',
        schema: 'sch_ot',
    }
)

export default pg
