import { Sequelize } from "sequelize";

const sequelize = new Sequelize('backend_app','root','',{
  host:'localhost',
  port:3306,
  dialect:'mysql',
  define:{
    freezeTableName:true
  }
})

export default sequelize;

(async() => {
  await sequelize.sync();
})();