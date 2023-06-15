import { Op, Sequelize } from 'sequelize'
import { ModbusAppModel, ModbusAppModelResult } from '../models/ModbusAppModel'
import { error } from 'winston'

// MachineIndex.hasMany(MnUser, { foreignKey: 'mch_code' })
// MnUser.belongsTo(MachineIndex, { foreignKey: 'role', targetKey: 'mch_code' })

ModbusAppModel.hasMany(ModbusAppModelResult, { foreignKey: 'mch_code' })
ModbusAppModelResult.belongsTo(ModbusAppModel, { foreignKey: 'mch_code' })

export default {
    async insAddress(req, res) {
        const {
            mch_code,
            mch_name,
            ip_address,
            port_address,
            setId_address,
            setTimeout_address,
            holdReg_count,
            holdReg_run,
            data_register,
        } = req.body
        try {
            const response = await ModbusAppModel.create({
                mch_code,
                mch_name,
                ip_address,
                port_address,
                setId_address,
                setTimeout_address,
                address_register,
                quantity_register,
                data_register: JSON.parse(data_register),
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
            // console.log(JSON.stringify(isModbusExists, null, 4))
            // const datas = JSON.parse(isModbusExists[0].data_result)
            const datas = isModbusExists[0].data_result
            // console.log(isModbusExists[0])
            if (isModbusExists.length > 0) {
                await ModbusAppModelResult.update(
                    {
                        mch_code,
                        data_result: data_result,
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
                    data_result: data_result,
                })
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    async getResult(req, res) {
        try {
            const response = await ModbusAppModelResult.findAll({
                include: [{ model: ModbusAppModel }],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },
}
