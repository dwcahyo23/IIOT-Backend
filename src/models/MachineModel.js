import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

export const MachineIndex = sequelize.define(
    'machine_index',
    {
        uuid: {
            type: DataTypes.STRING(8),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        mch_code: DataTypes.STRING(8),
        mch_name: DataTypes.STRING(20),
        mch_com: DataTypes.STRING(8),
        mch_loc: DataTypes.STRING(20),
        mch_process: DataTypes.STRING(20),
    },
    { timestamps: false }
)

export const MachineItems = sequelize.define('machine_items', {
    uuid: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    bom: DataTypes.STRING(15),
    category: DataTypes.STRING(3),
    item_name: DataTypes.STRING(50),
    item_life_time: DataTypes.INTEGER,
    item_lead_time: DataTypes.INTEGER,
    change_at: {
        type: DataTypes.DATE(6),
        defaultValue: Sequelize.NOW,
    },
    featuredImageId: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
    },
    images: {
        type: DataTypes.JSON,
        defaultValue: [],
        get: function () {
            if (typeof this.getDataValue('images') == 'string') {
                return JSON.parse(this.getDataValue('images'))
            } else {
                return this.getDataValue('images')
            }
            // console.log(typeof this.getDataValue('data_result'))
        },
    },
    changes: {
        type: DataTypes.JSON,
        get: function () {
            if (typeof this.getDataValue('changes') == 'string') {
                return JSON.parse(this.getDataValue('changes'))
            } else {
                return this.getDataValue('changes')
            }
            // console.log(typeof this.getDataValue('data_result'))
        },
    },
    item_status: {
        type: DataTypes.INTEGER(2),
        defaultValue: 1,
    },
})
