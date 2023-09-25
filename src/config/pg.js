import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import { Client } from 'pg'
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

// const connectionString = `postgres://${process.env.USER_DBR}:${process.env.PASSWORD_DBR}@${process.env.HOST_DBR}:${process.env.PORT_DBR}/${process.env.TABLE_DBR}?schema=sch_ot`
// const pgClient = new Client(connectionString)

// pgClient.connect()

export default pg
