import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

const sequelize = new Sequelize(process.env.TABLE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
});

export default sequelize;

(async () => {
  await sequelize.sync();
})();
