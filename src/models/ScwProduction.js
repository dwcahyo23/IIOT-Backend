import mysql from '../config/mysql'
import { Sequelize } from 'sequelize'

const { DataTypes } = Sequelize

export const ScwModel = mysql.define('ProductionSCW', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    com: DataTypes.STRING,
    area: DataTypes.STRING,
    mch_code: DataTypes.STRING,
    req_to: DataTypes.STRING,
    problem: DataTypes.TEXT,
    start: DataTypes.DATE,
    end: DataTypes.DATE,
    input_by: DataTypes.STRING,
    finish_by: DataTypes.STRING,
})
