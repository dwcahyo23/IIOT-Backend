import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

export const MnOil = sequelize.define('mn_oil', {
    uuid: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    category: DataTypes.STRING(50),
    bom: DataTypes.STRING(15),
    category: DataTypes.STRING(3),
    item_name: DataTypes.STRING(50),
    item_life_time: DataTypes.INTEGER,
    item_lead_time: DataTypes.INTEGER,
    change_at: {
        type: DataTypes.DATE(6),
    },
})
