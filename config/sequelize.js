import { Sequelize } from "sequelize";

const sequelize = new Sequelize('backend','admin','secretkey',{
  host:'192.168.192.7',
  port:3307,
  dialect:'mysql',
  define:{
    freezeTableName:true
  }
})

export default sequelize;

(async() => {
  await sequelize.sync();
})();