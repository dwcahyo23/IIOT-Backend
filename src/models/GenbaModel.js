import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

export const Genba = sequelize.define('genba_data', {
    uuid: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: DataTypes.STRING(20),
    mch_code: DataTypes.STRING(20),
    mch_com: DataTypes.STRING(20),
    mch_fin: DataTypes.TEXT,
    sts: DataTypes.STRING(20),
    date: {
        type: DataTypes.DATE(6),
        // defaultValue: Sequelize.NOW,
    },
    data: {
        type: DataTypes.JSON,
    },
})
