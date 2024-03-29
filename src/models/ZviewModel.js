import { Sequelize } from 'sequelize'
import mysql from '../config/mysql'

const { DataTypes } = Sequelize

export const ZbSens = mysql.define(
    'ZbSens',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        id_zb_view: DataTypes.STRING,
        serial: DataTypes.STRING,
        mac: DataTypes.STRING,
        ble: DataTypes.STRING,
        mch_code: DataTypes.STRING,
        mch_com: DataTypes.STRING,
    },
    { timestamps: false }
)

export const ZbView = mysql.define(
    'ZbView',
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        serial: DataTypes.STRING,
        mac: DataTypes.STRING,
        mch_com: DataTypes.STRING,
        mch_loc: DataTypes.STRING,
    },
    { timestamps: false }
)

export const ZbConn = mysql.define('ZbConn', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    id_zb_sens: DataTypes.STRING,
    spm_zb_sens: DataTypes.INTEGER,
    din_zb_sens: DataTypes.INTEGER,
    init_zb_sens: DataTypes.INTEGER,
    start_zb_sens: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    count_zb_sens: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    target_zb_sens: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    id_production: DataTypes.STRING,
    shift_production: DataTypes.INTEGER,
    stop_reason: DataTypes.STRING,
    timeoff: DataTypes.STRING,
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    lock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

export const ZbLog = mysql.define('ZbLog', {
    uuid: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    id_zb_conn: DataTypes.STRING,
    stop_reason: DataTypes.STRING,
    start: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    stop: DataTypes.DATE,
    lock: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})
