import { Sequelize } from 'sequelize'
import mysql from '../config/mysql'

const { DataTypes } = Sequelize

export const WhatsappUser = mysql.define(
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
        responsible: {
            type: DataTypes.BOOLEAN,
        },
        with_dep_no: {
            type: DataTypes.BOOLEAN,
        },
        dep_no: {
            type: DataTypes.STRING(20),
        },
        with_prior: {
            type: DataTypes.BOOLEAN,
        },
        prior: {
            type: DataTypes.STRING(20),
        },
    },
    { timestamps: false }
)

export const WhatsappConfig = mysql.define(
    'WhatsappConfig',
    {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        menu: {
            type: DataTypes.STRING(100),
        },
        runtime: {
            type: DataTypes.BOOLEAN,
        },
    },
    { timestamps: false }
)

export const WhatsappLog = mysql.define('WhatsappLog', {
    id_log: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    menu: {
        type: DataTypes.STRING(100),
    },
    status: {
        type: DataTypes.STRING(100),
        defaultValue: 'Open',
    },
})
