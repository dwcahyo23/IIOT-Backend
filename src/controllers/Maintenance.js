import sequelize from '../config/sequelize'
import { QueryTypes } from 'sequelize'

import { MachineIndex } from '../models/MachineModel'
import { MnCategory } from '../models/MnCategory'
import { MnAcademy } from '../models/MnAcademy'
import { MnItem } from '../models/MnItem'

MachineIndex.hasMany(MnAcademy)
MnAcademy.belongsTo(MachineIndex)

MnAcademy.hasMany(MnItem)
MnItem.belongsTo(MnAcademy)

export default {
    async insCategory(req, res) {
        const { title, slug, color } = req.body
        try {
            const response = await MnCategory.create({
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
            const response = await MnCategory.findAll({})
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    async getAcademy(req, res) {
        const { category } = req.body
        try {
            if ((category = 'all')) {
                const response = await MnAcademy.findAll({})
                return res.status(200).json(response)
            } else {
                const response = await MnAcademy.findAll({
                    where: {
                        category,
                    },
                })
                return res.status(200).json(response)
            }
        } catch (error) {}
    },

    async insItem(req, res) {
        const { mch_code, category, item_name } = req.body
        try {
            const findMchIndex = await MachineIndex.findOne({
                where: { mch_code },
            })

            const findAcademy = await MnAcademy.findAll({
                where: { machineIndexUuid: findMchIndex.uuid, category },
            })
            if (findAcademy.length < 1) {
                const insMnAcademy = await MnAcademy.create({
                    category,
                    machineIndexUuid: findMchIndex.uuid,
                })

                await MnItem.create({
                    item_name,
                    mnAcademyUuid: insMnAcademy.uuid,
                })
                res.status(200).json('success')
            } else {
                await MnItem.create({
                    item_name,
                    mnAcademyUuid: findAcademy[0].uuid,
                })
                res.status(200).json('success')
            }
        } catch (error) {
            console.log(error)
        }
    },

    async finItem(req, res) {
        try {
            // const response = await MachineIndex.findAll({
            //     include: {
            //         model: MnAcademy,
            //         include: { model: MnItem },
            //     },
            // })
            const response = await MnAcademy.findAll({
                include: [
                    {
                        model: MachineIndex,
                    },
                    { model: MnItem },
                ],
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },
}
