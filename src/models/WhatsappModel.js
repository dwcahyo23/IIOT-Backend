import { Sequelize } from 'sequelize'
import sequelize from '../config/sequelize.js'

const { DataTypes } = Sequelize

export const WhatsappUser = sequelize.define(
    'WhatsappUser',
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
        },
        number: {
            type: DataTypes.STRING(100),
        },
        role: {
            type: DataTypes.STRING(20),
        },
    },
    { timestamps: false }
)
