import { Sequelize } from 'sequelize'
import mysql from '../config/mysql'

const { DataTypes } = Sequelize

export const ProductionSCW = mysql.define('ProductionSCW', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    com: {
        type: DataTypes.STRING(5),
    },
    area: {
        type: DataTypes.STRING(100),
    },
    mch_code: {
        type: DataTypes.STRING,
    },
    req_to: {
        type: DataTypes.STRING,
    },
    req_from: {
        type: DataTypes.STRING,
    },
    problem: {
        type: DataTypes.STRING(100),
    },
    start_time: {
        type: DataTypes.DATE,
    },
    end_time: {
        type: DataTypes.DATE,
    },
    input_by: {
        type: DataTypes.STRING,
    },
    finished_by: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Open',
    },
})
