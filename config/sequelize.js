import { Sequelize } from "sequelize";

const db = new Sequelize('backend','admin','secretkey',{
  host:'192.168.192.7',
  port:3307,
  dialect:'mysql',
  define:{
    freezeTableName:true
  }
})

export default db;