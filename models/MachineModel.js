import { Sequelize } from "sequelize";
import db from "../config/sequelize.js";

const {DataTypes} = Sequelize;

export const MachineIndex = db.define('MachineIndex',{
  uuid:{
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true,
  },
  mch_code:{
    type: DataTypes.STRING(8),
  },
  mch_name:{
    type: DataTypes.STRING(20)
  },
  mch_com:{
    type: DataTypes.INTEGER(1)
  },
  mch_loc:{
    type: DataTypes.STRING(20)
  }
},{ timestamps: false })