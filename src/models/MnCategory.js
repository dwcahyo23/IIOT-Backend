import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

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
