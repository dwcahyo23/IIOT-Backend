import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'
import Utils from '../@utils/utils.js'

const { DataTypes } = Sequelize

export const AuthUser = sequelize.define(
    '_authUsers',
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING(20),
        },
        loginRedirectUrl: {
            type: DataTypes.STRING(30),
        },
    },
    { timestamps: false }
)

export const AuthData = sequelize.define(
    '_authData',
    {
        displayName: {
            type: DataTypes.STRING(100),
        },
        photoURL: {
            type: DataTypes.STRING,
        },
        userNIK: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        userNumber: DataTypes.STRING(100),
        email: {
            type: DataTypes.STRING(100),
        },
        settings: {
            type: DataTypes.JSON,
            get() {
                const rawValue = this.getDataValue('settings')
                return JSON.parse(rawValue)
            },
        },
        shortcuts: {
            type: DataTypes.JSON,
            get: function () {
                if (typeof this.getDataValue('shortcuts') == 'string') {
                    return JSON.parse(this.getDataValue('shortcuts'))
                } else {
                    return this.getDataValue('shortcuts')
                }
                // console.log(typeof this.getDataValue('data_result'))
            },
        },
    },
    { timestamps: false }
)
