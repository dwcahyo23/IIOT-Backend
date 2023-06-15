import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

export const MnAcademy = sequelize.define('mn_academy', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    category: DataTypes.STRING(50),
})

export const MnCategory = sequelize.define('mn_category', {
    uuid: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: DataTypes.STRING(50),
    slug: DataTypes.STRING(50),
    color: DataTypes.STRING(7),
})

export const MnItem = sequelize.define('mn_item', {
    uuid: {
        type: DataTypes.STRING,
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
    item_status: {
        type: DataTypes.INTEGER(2),
        defaultValue: 1,
    },
})

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
