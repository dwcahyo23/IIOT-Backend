import { Op, Sequelize, json, where } from 'sequelize'
import {
    MaintenanceMachine,
    MaintenanceCategory,
    MaintenanceStock,
    MaintenanceRequest,
    MaintenanceReport,
    MaintenanceSparepart,
} from '../models/MaintenanceSystemModel'

import { PgMowMtn } from '../models/PgMowMtn'
import _, { reject } from 'lodash'

MaintenanceMachine.hasMany(MaintenanceSparepart, {
    foreignKey: 'mch_code',
    sourceKey: 'mch_code',
    constraints: false,
})
MaintenanceSparepart.belongsTo(MaintenanceMachine, {
    foreignKey: 'mch_code',
    targetKey: 'mch_code',
    constraints: false,
})

MaintenanceCategory.hasMany(MaintenanceSparepart, {
    foreignKey: 'slug',
    sourceKey: 'slug',
    constraints: false,
})
MaintenanceSparepart.belongsTo(MaintenanceCategory, {
    foreignKey: 'slug',
    targetKey: 'slug',
    constraints: false,
})

export default {
    async insMaintenanceMachine(req, res) {
        const machine = req.body
        try {
            const response = await MaintenanceMachine.bulkCreate(
                machine,
                { validate: true },
                {
                    fields: [
                        'mch_code',
                        'mch_name',
                        'mch_process',
                        'mch_process_type',
                        'mch_com',
                        'mch_loc',
                        'mch_prod',
                        'mch_maker',
                    ],
                }
            )
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async insMaintenanceSparepart(req, res) {
        try {
            const sparepart = req.body
            const response = await MaintenanceSparepart.bulkCreate(
                sparepart,
                { validate: true },
                {
                    fields: [
                        'mch_code',
                        'mch_com',
                        'slug',
                        'bom',
                        'category',
                        'item_name',
                        'item_life_time',
                        'item_lead_time',
                    ],
                }
            )
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async insMaintenanceStock(req, res) {
        const data = req.body
        try {
            const response = await MaintenanceStock.bulkCreate(
                data,
                { validate: true },
                { fields: ['mat_no', 'mat_name', 'grade'] }
            )
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async insMaintenanceCategory(req, res) {
        const category = req.body
        try {
            const response = await MaintenanceCategory.bulkCreate(
                category,
                { validate: true },
                { fields: ['title', 'slug', 'color'] }
            )
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async insMaintenanceReport(req, res) {
        try {
            const data = req.body
            await MaintenanceReport.findOne({
                where: { sheet_no: req.body.id_report },
            }).then((obj) => {
                if (obj) {
                    MaintenanceReport.update(data, {
                        where: { sheet_no: req.body.id_report },
                    })
                    return res.status(200).json(data)
                }
                MaintenanceReport.create(
                    {
                        sheet_no: req.body.id_report,
                        ...data,
                    },
                    { validate: true },
                    {
                        fields: [
                            'mch_code',
                            'mch_com',
                            'chronological',
                            'corrective',
                            'prevention',
                        ],
                    }
                )
                return res.status(200).json(data)
            })
        } catch (error) {
            console.log(error.message)
        }
    },

    async insMaintenanceRequest(req, res) {
        try {
            const data = req.body
            if (!data.uuid_request) {
                await MaintenanceRequest.create(
                    { sheet_no: req.body.id_request, ...data },
                    { validate: true },
                    {
                        fields: [
                            'mch_code',
                            'mch_com',
                            'date_request',
                            'item_stock',
                            'item_name',
                            'item_qty',
                            'item_uom',
                        ],
                    }
                )

                return res.status(200).json(data)
            }

            if (data.uuid_request) {
                MaintenanceRequest.update(data, {
                    where: { uuid_request: data.uuid_request },
                })
                return res.status(200).json(data)
            }
        } catch (error) {
            console.log(error.message)
        }
    },

    async getMaintenanceSystem(req, res) {
        try {
            const response = await MaintenanceMachine.findAll({
                where: { mch_prod: 'Y' },
                include: [
                    {
                        model: MaintenanceSparepart,
                        where: {
                            mch_com: { [Op.col]: 'MaintenanceMachine.mch_com' },
                        },
                        include: [{ model: MaintenanceCategory }],
                        order: [[MaintenanceSparepart, 'item_name', 'ASC']],
                        attributes: {
                            exclude: [
                                'mch_code',
                                'mch_com',
                                'createdAt',
                                'updatedAt',
                            ],
                        },
                    },
                ],
                order: [['mch_code', 'ASC']],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async getMaintenanceMachine(req, res) {
        try {
            const response = await MaintenanceMachine.findAll({
                order: [['mch_code', 'ASC']],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async getMaintenanceMachineBy(req, res) {
        try {
            const getId = await MaintenanceMachine.findOne({
                where: { uuid: req.params.uuid },
            })

            const pGMaintenance = await PgMowMtn.findAll({
                where: {
                    mch_no: getId.mch_code,
                    // [Op.and]: [
                    //     Sequelize.where(
                    //         Sequelize.fn('date', Sequelize.col('ymd')),
                    //         '>=',
                    //         '2023-01-01'
                    //     ),
                    // ],
                },
                order: [['sheet_no', 'DESC']],
            })

            const report = await MaintenanceReport.findAll({
                where: {
                    mch_code: getId.mch_code,
                    mch_com: getId.mch_com,
                },
                order: [['sheet_no', 'DESC']],
            })

            const request = await MaintenanceRequest.findAll({
                where: {
                    mch_code: getId.mch_code,
                    mch_com: getId.mch_com,
                },
                order: [['sheet_no', 'DESC']],
            })

            const response = await MaintenanceMachine.findOne({
                where: { mch_prod: 'Y', uuid: req.params.uuid },
                include: [
                    {
                        model: MaintenanceSparepart,
                        where: {
                            mch_com: { [Op.col]: 'MaintenanceMachine.mch_com' },
                        },
                        include: [{ model: MaintenanceCategory }],
                        order: [[MaintenanceSparepart, 'item_name', 'ASC']],
                        attributes: {
                            exclude: [
                                'mch_code',
                                'mch_com',
                                'createdAt',
                                'updatedAt',
                            ],
                        },
                    },
                ],
                order: [['mch_code', 'ASC']],
            })

            if (!response || !request || !report) {
                return res.status(200).json({
                    ...getId.dataValues,
                    MaintenanceSpareparts: [],
                    mow: pGMaintenance,
                    report: report,
                    request: request,
                })
            }
            return res.status(200).json({
                ...response.dataValues,
                mow: pGMaintenance,
                report: report,
                request: request,
            })
        } catch (error) {
            console.log(error.message)
        }
    },

    async getMaintenanceCategory(req, res) {
        try {
            const response = await MaintenanceCategory.findAll({})
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async getMaintenanceMachineCom(req, res) {
        try {
            const response = await MaintenanceMachine.findAll({
                attributes: ['uuid', 'mch_com'],
                group: 'mch_com',
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async getMaintenanceStock(req, res) {
        try {
            const response = await MaintenanceStock.findAll({
                order: [['mat_name', 'ASC']],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async getMaintenanceMachineProcess(req, res) {
        try {
            const response = await MaintenanceMachine.findAll({
                attributes: ['uuid', 'mch_process_type'],
                group: 'mch_process_type',
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
        }
    },

    async pGMaintenance(req, res) {
        try {
            const response = await PgMowMtn.findAll({
                // where: {
                //     [Op.and]: [
                //         Sequelize.where(
                //             Sequelize.fn('date', Sequelize.col('ymd')),
                //             '>=',
                //             '2023-01-01'
                //         ),
                //     ],
                // },
            })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    },
}