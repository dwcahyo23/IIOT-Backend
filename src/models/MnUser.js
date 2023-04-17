import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

export const MnUser = sequelize.define(
    'mn_user',
    {
        nik: {
            type: DataTypes.STRING(9),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        role: {
            type: DataTypes.STRING(20),
        },
        images: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        mch_code: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
    },
    { timestamps: false }
)
