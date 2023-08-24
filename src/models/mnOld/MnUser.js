// import { Sequelize } from 'sequelize'
// import sequelize from '../config/sequelize.js'

// const { DataTypes } = Sequelize

// export const MnUser = sequelize.define(
//     'mn_user',
//     {
//         nik: {
//             type: DataTypes.STRING(9),
//             primaryKey: true,
//         },
//         name: {
//             type: DataTypes.STRING(100),
//         },
//         role: {
//             type: DataTypes.STRING(20),
//         },
//         images: {
//             type: DataTypes.JSON,
//             defaultValue: [],
//             get: function () {
//                 if (typeof this.getDataValue('images') == 'string') {
//                     return JSON.parse(this.getDataValue('images'))
//                 } else {
//                     return this.getDataValue('images')
//                 }
//                 // console.log(typeof this.getDataValue('data_result'))
//             },
//         },
//         mch_code: {
//             type: DataTypes.JSON,
//             defaultValue: [],
//             get: function () {
//                 if (typeof this.getDataValue('mch_code') == 'string') {
//                     return JSON.parse(this.getDataValue('mch_code'))
//                 } else {
//                     return this.getDataValue('mch_code')
//                 }
//                 // console.log(typeof this.getDataValue('data_result'))
//             },
//         },
//     },
//     { timestamps: false }
// )
