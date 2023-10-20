import * as dotenv from 'dotenv'
import { Pool } from 'pg'
dotenv.config()

const quest = new Pool({
    host: process.env.HOST_QUEST,
    user: process.env.USER_QUEST,
    password: process.env.PASSWORD_QUEST,
    port: process.env.PORT_QUEST,
    database: process.env.DB_QUEST,
})
export default quest
