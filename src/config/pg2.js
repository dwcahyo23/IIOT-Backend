import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import { Client } from 'pg'
dotenv.config()

const pg2 = new Sequelize(
    process.env.TABLE_DBR,
    process.env.USER_DBR2,
    process.env.PASSWORD_DBR2,
    {
        host: process.env.HOST_DBR,
        port: process.env.PORT_DBR,
        dialect: 'postgres',
        schema: 'sch_ot',
    }
)

// const connectionString = `postgres://${process.env.USER_DBR}:${process.env.PASSWORD_DBR}@${process.env.HOST_DBR}:${process.env.PORT_DBR}/${process.env.TABLE_DBR}?schema=sch_ot`
// const pg2Client = new Client(connectionString)

// pg2Client.connect()

export default pg2
