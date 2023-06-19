import { Op, Sequelize } from 'sequelize'
import { MachineIndex } from '../models/MachineModel'
import { MnCategory } from '../models/MnCategory'
import { MnAcademy } from '../models/MnAcademy'
import { MnItem } from '../models/MnItem'
import { PgMowMtn } from '../models/PgMowMtn'
import { MnUser } from '../models/MnUser'

MachineIndex.hasMany(MnAcademy)
MnAcademy.belongsTo(MachineIndex)

MnAcademy.hasMany(MnItem)
MnItem.belongsTo(MnAcademy)

MachineIndex.hasMany(MnUser, { foreignKey: 'mch_code' })
MnUser.belongsTo(MachineIndex, { foreignKey: 'role', targetKey: 'mch_code' })

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

    async insUser(req, res) {
        const { nik, name, role, images, mch_code } = req.body
        try {
            const response = await MnUser.create({
                nik,
                name,
                role,
                images,
                mch_code,
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    async getUser(req, res) {
        try {
            const response = await MnUser.findAll({
                include: [{ model: MachineIndex }],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    async insItem(req, res) {
        const {
            mch_code,
            category,
            item_name,
            item_life_time,
            item_lead_time,
            change_at,
            item_status,
            item_category,
        } = req.body

        try {
            const findMchIndex = await MachineIndex.findOne({
                where: { mch_code: mch_code.value },
            })

            const findAcademy = await MnAcademy.findAll({
                where: { machineIndexUuid: findMchIndex.uuid, category },
            })

            if (findAcademy.length < 1) {
                const insMnAcademy = await MnAcademy.create({
                    category,
                    machineIndexUuid: findMchIndex.uuid,
                })

                const boms = await MnItem.findAll({
                    where: {
                        mnAcademyUuid: insMnAcademy.uuid,
                        category: item_category,
                    },
                })

                const bom = `${item_category}${mch_code.value.replace(
                    /\-/g,
                    ''
                )}-${1001 + boms.length}`

                await MnItem.create({
                    item_name,
                    item_life_time,
                    item_lead_time,
                    change_at,
                    item_status,
                    bom,
                    category: item_category,
                    mnAcademyUuid: insMnAcademy.uuid,
                })
                res.status(200).json('success')
            } else {
                const boms = await MnItem.findAll({
                    where: {
                        mnAcademyUuid: findAcademy[0].uuid,
                        category: item_category,
                    },
                })

                const bom = `${item_category}${mch_code.value.replace(
                    /\-/g,
                    ''
                )}-${1001 + boms.length}`

                await MnItem.create({
                    item_name,
                    item_life_time,
                    item_lead_time,
                    change_at,
                    item_status,
                    bom,
                    category: item_category,
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

    async finItemBy(req, res) {
        try {
            const response = await MnAcademy.findOne({
                where: {
                    uuid: req.params.uuid,
                },
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

    async pgMtn(req, res) {
        try {
            const response = await PgMowMtn.findAll({
                where: {
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('date', Sequelize.col('ymd')),
                            '>=',
                            '2023-01-01'
                        ),
                    ],
                },
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },
}
