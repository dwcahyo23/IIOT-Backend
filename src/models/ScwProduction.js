import { Sequelize } from 'sequelize'
import mysql from '../config/mysql'

const { DataTypes } = Sequelize

export const ProductionSCW = mysql.define('ProductionSCW', {
    uuid: {
        type: DataTypes.STRING(8),
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
        type: DataTypes.TEXT,
    },
    remarks: {
        type: DataTypes.TEXT,
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
    no_drawing: {
        type: DataTypes.STRING,
    },
    dept: {
        type: DataTypes.STRING,
    },
    name_prd: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Open',
    },
})
