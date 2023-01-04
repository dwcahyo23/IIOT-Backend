import { Sequelize } from "sequelize";
import sequelize from "../config/sequelize.js";

const {DataTypes} = Sequelize;

export const MachineIndex = sequelize.define('machine_index',{
  uuid:{
    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,
    primaryKey:true,
  },
  mch_code:DataTypes.STRING(8),
  mch_name:DataTypes.STRING(20),
  mch_com:DataTypes.INTEGER(1),
  mch_loc:DataTypes.STRING(20),
	mch_process:DataTypes.STRING(20),
},{ timestamps: false })

export const MachineItems = sequelize.define('machine_items',{
	uuid:{
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey:true,
	},
	bom: DataTypes.STRING(7),
	category: DataTypes.STRING(3),
	item_name: DataTypes.STRING(50),
	item_life_time: DataTypes.INTEGER,
	item_lead_time: DataTypes.INTEGER,
	change_at: DataTypes.DATE(6),
	change_next: DataTypes.DATE(6),
	item_status: {
		type:DataTypes.INTEGER(1),
		defaultValue:0
	}
})

