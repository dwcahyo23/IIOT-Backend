import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

export const Modbus = sequelize.define('modbus_data', {
    uuid: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: DataTypes.STRING(20),
    data: {
        type: DataTypes.JSON,
    },
})
