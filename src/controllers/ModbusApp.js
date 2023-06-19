import { Op, Sequelize } from 'sequelize'
import {
    ModbusAppModel,
    ModbusAppModelResult,
    ModbusAppModelCategory,
} from '../models/ModbusAppModel'

// MachineIndex.hasMany(MnUser, { foreignKey: 'mch_code' })
// MnUser.belongsTo(MachineIndex, { foreignKey: 'role', targetKey: 'mch_code' })

ModbusAppModel.hasMany(ModbusAppModelResult, { foreignKey: 'mch_code' })
ModbusAppModelResult.belongsTo(ModbusAppModel, { foreignKey: 'mch_code' })

export default {
    async insCategory(req, res) {
        const { title, slug, color } = req.body
        try {
            const response = await ModbusAppModelCategory.create({
                title,
                slug,
                color,
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    async getCategory(req, res) {
        try {
            const response = await ModbusAppModelCategory.findAll({})
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    async insAddress(req, res) {
        const {
            mch_code,
            mch_name,
            mch_com,
            ip_address,
            port_address,
            setId_address,
            setTimeout_address,
            address_register,
            quantity_register,
            data_register,
        } = req.body
        try {
            const response = await ModbusAppModel.create({
                mch_code,
                mch_name,
                mch_com,
                ip_address,
                port_address,
                setId_address,
                setTimeout_address,
                address_register,
                quantity_register,
                data_register,
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    async getAddress(req, res) {
        try {
            const response = await ModbusAppModel.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async insResult(req, res) {
        const { mch_code, data_result } = req.body

        const isModbusExists = await ModbusAppModelResult.findAll({
            where: {
                mch_code,
                createdAt: {
                    [Op.lt]: new Date(),
                    [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
                },
            },
        })

        try {
            const category = () => {
                if (data_result.status === 1) {
                    return 'mch-run'
                } else {
                    return 'mch-off'
                }
            }
            // console.log(isModbusExists[0])
            if (isModbusExists.length > 0) {
                // console.log(data_result.status)

                await ModbusAppModelResult.update(
                    {
                        mch_code,
                        data_result,
                        category: category(),
                        // data_result: JSON.parse(data_result),
                    },
                    {
                        where: {
                            uuid: isModbusExists[0].uuid,
                        },
                        logging: true,
                    }
                ).catch((error) => {
                    console.log('error', error)
                })
            } else {
                await ModbusAppModelResult.create({
                    mch_code,
                    data_result,
                    category: category(),
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    async getResult(req, res) {
        try {
            const response = await ModbusAppModelResult.findAll({
                where: {
                    createdAt: {
                        [Op.lt]: new Date(),
                        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
                    },
                },
                include: [{ model: ModbusAppModel }],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    async getResultBy(req, res) {
        try {
            const response = await ModbusAppModel.findOne({
                where: {
                    mch_code: req.params.mch_code,
                },
                include: [{ model: ModbusAppModelResult }],
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },
}
