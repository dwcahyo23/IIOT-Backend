/* eslint-disable no-underscore-dangle */
import path from 'path';
import { fileURLToPath } from 'url';

import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(`dirname: ${path.join(__dirname, '../.env')}`);

dotenv.config({ path: path.join(__dirname, '../.env') });

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
