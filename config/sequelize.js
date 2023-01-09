import * as dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.TABLE, process.env.USER, process.env.PASSWORD, {
	host: process.env.HOST,
	port: 3307,
	dialect: 'mysql',
	define: {
		freezeTableName: true
	}
})

export default sequelize;

(async () => {
	await sequelize.sync();
})();