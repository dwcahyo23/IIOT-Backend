import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

export const ModbusAppModel = sequelize.define('ModbusApp', {
    mch_code: { type: DataTypes.STRING(8), primaryKey: true },
    mch_name: DataTypes.STRING(25),
    ip_address: DataTypes.STRING(18),
    port_address: DataTypes.INTEGER,
    setId_address: DataTypes.INTEGER,
    setTimeout_address: DataTypes.INTEGER,
    address_register: DataTypes.INTEGER,
    quantity_register: DataTypes.INTEGER,
    data_register: {
        type: DataTypes.JSON,
        get() {
            const rawValue = this.getDataValue('data_register')
            return JSON.parse(rawValue)
        },
    },
})

export const ModbusAppModelResult = sequelize.define('ModbusAppResult', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    mch_code: DataTypes.STRING(8),
    data_result: {
        type: DataTypes.JSON,
        get: function () {
            if (typeof this.getDataValue('data_result') == 'string') {
                return JSON.parse(this.getDataValue('data_result'))
            } else {
                return this.getDataValue('data_result')
            }
            // console.log(typeof this.getDataValue('data_result'))
        },
    },
})

export const ModbusAppModelCategory = sequelize.define('ModbusAppCategory', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: DataTypes.STRING(50),
    slug: DataTypes.STRING(50),
    color: DataTypes.STRING(7),
})
