import { Sequelize } from 'sequelize'
import mysql from '../config/mysql.js'
import _ from 'lodash'

const { DataTypes } = Sequelize

export const GenbaAcip = mysql.define('GenbaAcip', {
    id_genba: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    sheet: {
        type: DataTypes.STRING(8),
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
    from: DataTypes.STRING,
    dept: DataTypes.STRING,
    area: DataTypes.STRING,
    com: DataTypes.STRING,
    mch_code: DataTypes.STRING,
    cat: DataTypes.STRING,
    case: DataTypes.STRING,
    images1: {
        type: DataTypes.JSON,
        // set(value) {
        //     compresImage(value, 250, 60)
        //         .then((compressed) => {
        //             console.log(compressed)
        //             this.setDataValue('images1', compressed)
        //         })
        //         .catch((err) => console.log(err))
        // },

        get: function () {
            // console.log('img1:' + typeof this.getDataValue('images1'))
            if (typeof this.getDataValue('images1') == 'string') {
                return JSON.parse(this.getDataValue('images1'))
            } else {
                return this.getDataValue('images1')
            }
        },
    },
    images2: {
        type: DataTypes.JSON,
        defaultValue: [],
        get: function () {
            // console.log('img2:' + typeof this.getDataValue('images2'))
            if (typeof this.getDataValue('images2') == 'string') {
                return JSON.parse(this.getDataValue('images2'))
            } else {
                return this.getDataValue('images2')
            }
        },
    },
    a_r1: DataTypes.INTEGER,
    a_r2: DataTypes.INTEGER,
    a_r3: DataTypes.INTEGER,
    a_r4: DataTypes.INTEGER,
    a_r5: DataTypes.INTEGER,
    b_r1: DataTypes.INTEGER,
    b_r2: DataTypes.INTEGER,
    b_r3: DataTypes.INTEGER,
    b_r4: DataTypes.INTEGER,
    b_r5: DataTypes.INTEGER,
    improvement: DataTypes.STRING,
    remark: DataTypes.STRING,
    status: DataTypes.STRING,
    open_date: DataTypes.DATE,
    due_date: DataTypes.DATE,
    close_date: DataTypes.DATE,
})
