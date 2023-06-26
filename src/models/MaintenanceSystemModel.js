import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'
import { addSeconds, format } from 'date-fns'
import _ from 'lodash'

const { DataTypes } = Sequelize

export const MaintenanceMachine = sequelize.define(
    'MaintenanceMachine',
    {
        uuid: {
            type: DataTypes.STRING(8),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        mch_code: DataTypes.STRING(8),
        mch_name: DataTypes.STRING(20),
        mch_process: DataTypes.STRING(20),
        mch_process_type: DataTypes.STRING(20),
        mch_com: DataTypes.STRING(8),
        mch_loc: DataTypes.STRING(20),
        mch_prod: DataTypes.STRING(1),
        mch_maker: DataTypes.STRING(50),
    },
    { timestamps: false }
)

export const MaintenanceSparepart = sequelize.define('MaintenanceSparepart', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    mch_code: DataTypes.STRING(8),
    mch_com: DataTypes.STRING(8),
    slug: DataTypes.STRING(10),
    bom: DataTypes.STRING(15),
    category: DataTypes.STRING(3),
    item_name: DataTypes.STRING(50),
    item_life_time: DataTypes.INTEGER,
    item_lead_time: DataTypes.INTEGER,
})

export const MaintenanceCategory = sequelize.define(
    'MaintenanceCategory',
    {
        uuid: {
            type: DataTypes.STRING(8),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: DataTypes.STRING(10),
        slug: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false,
        },
        color: DataTypes.STRING(7),
    },
    { timestamps: false }
)

export const MaintenanceCode = sequelize.define(
    'MaintenanceCode',
    {
        uuid: {
            type: DataTypes.STRING(8),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: DataTypes.STRING(10),
        code: {
            type: DataTypes.STRING(10),
            unique: true,
            allowNull: false,
        },
        color: DataTypes.STRING(7),
    },
    { timestamps: false }
)

export const MaintenanceRequest = sequelize.define('MaintenanceRequest', {
    uuid: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    sheet_no: DataTypes.STRING,
    mch_code: DataTypes.STRING(8),
    mch_com: DataTypes.STRING(8),
    date_request: DataTypes.DATE,
    slug: DataTypes.STRING(10),
    item_name: DataTypes.STRING(50),
    item_qty: DataTypes.INTEGER,
    item_uom: DataTypes.STRING(10),
})

export const MaintenanceReport = sequelize.define('MaintenanceReport', {
    sheet_no: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    mch_code: DataTypes.STRING(8),
    mch_com: DataTypes.STRING(8),
    code: DataTypes.STRING(10),
    date_report: DataTypes.DATE,
    chronological: DataTypes.STRING(),
    corrective: DataTypes.STRING(),
    prevention: DataTypes.STRING(),
})
