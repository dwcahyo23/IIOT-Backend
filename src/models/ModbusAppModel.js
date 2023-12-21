import { Sequelize } from 'sequelize'
import mysql from '../config/mysql.js'
import { addSeconds, format } from 'date-fns'
import _ from 'lodash'

const { DataTypes } = Sequelize

export const ModbusAppModel = mysql.define('ModbusApp', {
    mch_code: { type: DataTypes.STRING(8), primaryKey: true },
    mch_name: DataTypes.STRING(25),
    mch_com: DataTypes.STRING(25),
    ip_address: DataTypes.STRING(18),
    port_address: DataTypes.INTEGER,
    setId_address: DataTypes.INTEGER,
    setTimeout_address: DataTypes.INTEGER,
    address_register: DataTypes.INTEGER,
    quantity_register: DataTypes.INTEGER,
    data_register: {
        type: DataTypes.JSON,
        get: function () {
            if (typeof this.getDataValue('data_register') == 'string') {
                return JSON.parse(this.getDataValue('data_register'))
            } else {
                return this.getDataValue('data_register')
            }
            // console.log(typeof this.getDataValue('data_result'))
        },
    },
})

export const ModbusAppModelResult = mysql.define('ModbusAppResult', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    mch_code: DataTypes.STRING(8),
    category: DataTypes.STRING(8),
    data_result: {
        type: DataTypes.JSON,
        get: function () {
            if (typeof this.getDataValue('data_result') == 'string') {
                const obj = JSON.parse(this.getDataValue('data_result'))
                let newObj = {}
                _.forEach(obj, (val, key) => {
                    newObj[key] = val
                    if (key == 'run') {
                        const duration = addSeconds(new Date(0), val)
                        newObj['run'] = format(duration, 'HH:mm:ss')
                    }
                    if (key == 'off') {
                        const duration = addSeconds(new Date(0), val)
                        newObj['off'] = format(duration, 'HH:mm:ss')
                    }
                })
                return newObj
            } else {
                return this.getDataValue('data_result')
            }
            // console.log(typeof this.getDataValue('data_result'))
        },
    },
})

export const ModbusAppModelCategory = mysql.define('ModbusAppCategory', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: DataTypes.STRING(50),
    slug: DataTypes.STRING(50),
    color: DataTypes.STRING(7),
})
