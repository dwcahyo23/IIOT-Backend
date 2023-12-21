import { Sequelize } from 'sequelize'
import mysql from '../config/mysql.js'
import { addSeconds, format } from 'date-fns'
import _ from 'lodash'

const { DataTypes } = Sequelize

export const MaintenanceMachine = mysql.define(
    'MaintenanceMachine',
    {
        uuid: {
            type: DataTypes.STRING(8),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        mch_code: DataTypes.STRING,
        mch_name: DataTypes.STRING,
        dep_no: DataTypes.STRING,
        mch_process: DataTypes.STRING,
        mch_process_type: DataTypes.STRING,
        mch_com: DataTypes.STRING,
        mch_loc: DataTypes.STRING,
        mch_prod: DataTypes.STRING,
        mch_maker: DataTypes.STRING,
        responsible: DataTypes.STRING,
        section: DataTypes.STRING,
        mch_hp: DataTypes.DOUBLE,
        memo: DataTypes.STRING,
    },
    { timestamps: false }
)

export const MaintenanceSparepart = mysql.define('MaintenanceSparepart', {
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
    item_life_time: DataTypes.FLOAT,
    item_lead_time: DataTypes.FLOAT,
    sheet_no: DataTypes.STRING,
    remarks: DataTypes.STRING,
    item_change_date: {
        type: DataTypes.JSON,
        defaultValue: [],
        get: function () {
            if (typeof this.getDataValue('item_change_date') == 'string') {
                return JSON.parse(this.getDataValue('item_change_date'))
            } else {
                return this.getDataValue('item_change_date')
            }
            // console.log(typeof this.getDataValue('data_result'))
        },
    },
})

// export const MaintenanceCategory = mysql.define(
//     'MaintenanceCategory',
//     {
//         uuid: {
//             type: DataTypes.STRING(8),
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//         },
//         title: DataTypes.STRING(10),
//         slug: {
//             type: DataTypes.STRING(10),
//             unique: true,
//             allowNull: false,
//         },
//         color: DataTypes.STRING(7),
//     },
//     { timestamps: false }
// )

// export const MaintenanceCode = mysql.define(
//     'MaintenanceCode',
//     {
//         uuid: {
//             type: DataTypes.STRING(8),
//             defaultValue: DataTypes.UUIDV4,
//             primaryKey: true,
//         },
//         title: DataTypes.STRING(10),
//         code: {
//             type: DataTypes.STRING(10),
//             unique: true,
//             allowNull: false,
//         },
//         color: DataTypes.STRING(7),
//     },
//     { timestamps: false }
// )

export const MaintenanceRequest = mysql.define('MaintenanceRequest', {
    uuid_request: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    sheet_no: DataTypes.STRING,
    mch_code: DataTypes.STRING(8),
    mch_com: DataTypes.STRING(8),
    date_request: DataTypes.DATE,
    category_request: DataTypes.STRING,
    slug: DataTypes.STRING(10),
    user_req1: DataTypes.STRING,
    user_req2: DataTypes.STRING,
    item_name: DataTypes.STRING,
    item_stock: DataTypes.STRING,
    item_qty: DataTypes.INTEGER,
    item_uom: DataTypes.STRING(10),
    item_ready: {
        type: DataTypes.STRING(1),
        defaultValue: 'N',
    },
    audit_request: {
        type: DataTypes.STRING(1),
        defaultValue: 'N',
    },
    date_audit_request: DataTypes.DATE,
    date_ready_request: DataTypes.DATE,
    date_mre_request: DataTypes.DATE,
    mre_request: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    sts_wa1: DataTypes.STRING(1),
    sts_wa2: DataTypes.STRING(1),
    sts_wa3: DataTypes.STRING(1),
    with_monitor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

export const MaintenanceReport = mysql.define('MaintenanceReport', {
    sheet_no: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    mch_code: DataTypes.STRING,
    mch_com: DataTypes.STRING,
    code: DataTypes.STRING,
    date_report: DataTypes.DATE,
    kind: DataTypes.STRING,
    chronological: DataTypes.TEXT,
    corrective: DataTypes.TEXT,
    prevention: DataTypes.TEXT,
    analyzed: DataTypes.TEXT,
    user_rep1: DataTypes.STRING,
    user_rep2: DataTypes.STRING,
    date_target: DataTypes.DATE,
    date_finish: DataTypes.DATE,
    audit_report: DataTypes.STRING,
    feedback_score: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    feedback_note: DataTypes.STRING,
    feedback_user: DataTypes.STRING,
})

export const MaintenanceWorkshopReport = mysql.define(
    'MaintenanceWorkshopReport',
    {
        sheet_no: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        mch_code: DataTypes.STRING,
        mch_com: DataTypes.STRING,
        code: DataTypes.STRING,
        date_report: DataTypes.DATE,
        kind: DataTypes.STRING,
        chronological: DataTypes.TEXT,
        task_user: {
            type: DataTypes.JSON,
            defaultValue: [],
            get: function () {
                if (typeof this.getDataValue('task_user') == 'string') {
                    return JSON.parse(this.getDataValue('task_user'))
                } else {
                    return this.getDataValue('task_user')
                }
            },
        },
        user_rep1: DataTypes.STRING,
        user_rep2: DataTypes.STRING,
        date_target: DataTypes.DATE,
        date_finish: DataTypes.DATE,
        audit_report: DataTypes.STRING,
    }
)

export const MaintenanceStock = mysql.define('MaintenanceStock', {
    uuid: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    mat_no: DataTypes.STRING,
    mat_name: DataTypes.STRING,
    grade: DataTypes.STRING(8),
})

export const MaintenanceSparepartControlStcok = mysql.define(
    'MaintenanceSparepartControlStock',
    {
        uuid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        sparepart_name: DataTypes.STRING,
        op_qty: DataTypes.INTEGER,
        uom_op: DataTypes.STRING(8),
        oq_qty: DataTypes.INTEGER,
        uom_oq: DataTypes.STRING(8),
        stock_qty: DataTypes.INTEGER,
        uom_stock: DataTypes.STRING(8),
        sparepart_category: DataTypes.STRING,
        lead_time: DataTypes.INTEGER,
        no_pr: DataTypes.STRING,
    }
)

export const MaintenanceUser = mysql.define(
    'MaintenanceUser',
    {
        uuid: {
            type: DataTypes.STRING(9),
            primaryKey: true,
        },
        mn_name: DataTypes.STRING,
        mn_com: DataTypes.STRING,
    },
    { timestamps: false }
)
