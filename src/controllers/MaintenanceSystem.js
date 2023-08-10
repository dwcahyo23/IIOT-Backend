import { Op, Sequelize, json, where } from 'sequelize'
import {
    MaintenanceMachine,
    MaintenanceCategory,
    MaintenanceStock,
    MaintenanceRequest,
    MaintenanceReport,
    MaintenanceSparepart,
    MaintenanceSparepartControlStcok,
    MaintenanceWorkshopReport,
} from '../models/MaintenanceSystemModel'

import { AuthData } from '../models/AuthModel'

import { GenbaAcip } from '../models/GenbaModel'

import { PgMowMtn } from '../models/PgMowMtn'
import _ from 'lodash'
import { error } from 'winston'

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
    //--- for dev bulk post  ---

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
            console.log(error)
            res.status(500).json(error)
        }
    },

    async updateMaintenanceMachine(req, res) {
        const machine = req.body
        try {
            _.forEach(machine, async (val) => {
                await MaintenanceMachine.findOne({
                    where: { uuid: val.uuid, mch_code: val.mch_code },
                })
                    .then((obj) => {
                        if (obj) {
                            MaintenanceMachine.update(
                                { ...val },
                                {
                                    where: { uuid: val.uuid },
                                }
                            )
                            return res.end()
                        } else {
                            return res.end()
                        }
                    })
                    .catch((error) => console.log(error))
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async instMaintenanceBulkReport(req, res) {
        const machine = req.body
        try {
            const response = await MaintenanceReport.bulkCreate(
                machine,
                { validate: true },
                {
                    fields: [
                        'sheet_no',
                        'mch_code',
                        'mch_com',
                        'date_report',
                        'kind',
                        'chronological',
                        'corrective',
                        'prevention',
                        'user_rep1',
                        'user_rep2',
                        'date_target',
                        'date_finish',
                        'audit_report',
                    ],
                }
            )
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async instMaintenanceBulkRequest(req, res) {
        const machine = req.body
        try {
            const response = await MaintenanceRequest.bulkCreate(machine, {
                validate: true,
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async instMaintenanceBulkWorkshopReport(req, res) {
        const data = req.body
        try {
            const response = await MaintenanceWorkshopReport.bulkCreate(data, {
                validate: true,
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async insMaintenanceSparepartBulkFind(req, res) {
        try {
            const sparepart = req.body
            console.log(sparepart.length)
            _.forEach(sparepart, async (val, index) => {
                const boms = await MaintenanceSparepart.findAll({
                    where: {
                        mch_code: val.mch_code,
                        category: val.category,
                    },
                })

                if (boms.length < 1) {
                    const bom = `${val.category}${val.mch_code.replace(
                        /\-/g,
                        ''
                    )}-${1001 + boms.length}`
                    const response = await MaintenanceSparepart.create({
                        ...val,
                        bom: bom,
                    })
                    return res.end()
                } else {
                    const bom = `${val.category}${val.mch_code.replace(
                        /\-/g,
                        ''
                    )}-${1001 + boms.length}`
                    const response = await MaintenanceSparepart.create({
                        ...val,
                        bom: bom,
                    })

                    return res.end()
                }
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async instMaintenanceBulkControllStock(req, res) {
        const data = req.body
        try {
            const response = await MaintenanceSparepartControlStcok.bulkCreate(
                data,
                {
                    validate: true,
                }
            )
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    //---- end of bulk post ---

    async insMaintenanceSparepart(req, res) {
        try {
            const sparepart = req.body
            console.log(sparepart.length)
            const boms = await MaintenanceSparepart.findAll({
                where: {
                    mch_code: sparepart.mch_code,
                    category: sparepart.category,
                },
            })

            if (boms.length < 1) {
                const bom = `${
                    sparepart.category
                }${sparepart.mch_code.value.replace(/\-/g, '')}-${
                    1001 + boms.length
                }`
                const response = await MaintenanceSparepart.bulkCreate(
                    { ...sparepart, bom: bom },
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
            } else {
                const bom = `${
                    sparepart.category
                }${sparepart.mch_code.value.replace(/\-/g, '')}-${
                    1001 + boms.length
                }`
                const response = await MaintenanceSparepart.bulkCreate(
                    { ...sparepart, bom: bom },
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
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
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
            console.log(error)
            res.status(500).json(error)
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
            console.log(error)
            res.status(500).json(error)
        }
    },

    async insMaintenanceReport(req, res) {
        try {
            const data = req.body
            const find = await MaintenanceReport.findOne({
                where: { sheet_no: req.body.id_report },
            })
            if (find == null) {
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
                    .then(() => {
                        // PgMowMtn.update(
                        //     { chk_mark: data.audit_report },
                        //     {
                        //         where: {
                        //             sheet_no: data.id_report,
                        //         },
                        //     }
                        // )

                        res.status(200).json(data)
                    })
                    .catch((error) => res.status(500).json(error))
            } else {
                MaintenanceReport.update(data, {
                    where: { sheet_no: data.id_report },
                })
                    .then(() => {
                        // PgMowMtn.update(
                        //     { chk_mark: data.audit_report },
                        //     {
                        //         where: {
                        //             sheet_no: data.id_report,
                        //         },
                        //     }
                        // )
                        res.status(200).json(data)
                    })
                    .catch((error) => res.status(500).json(error))
            }
            // .then((obj) => {
            //     if (obj) {
            //         MaintenanceReport.update(data, {
            //             where: { sheet_no: data.id_report },
            //         })

            //         //! for update chk mark Y in pG
            // PgMowMtn.update(
            //     { chk_mark: data.audit_report },
            //     {
            //         where: {
            //             sheet_no: data.id_report,
            //         },
            //     }
            // )
            // return res.status(200).json(data)
            //     }
            //     MaintenanceReport.create(
            //         {
            //             sheet_no: req.body.id_report,
            //             ...data,
            //         },
            //         { validate: true },
            //         {
            //             fields: [
            //                 'mch_code',
            //                 'mch_com',
            //                 'chronological',
            //                 'corrective',
            //                 'prevention',
            //             ],
            //         }
            //     )
            //     //! for update chk mark Y in pG
            //     // PgMowMtn.update(
            //     //     { chk_mark: data.audit_report },
            //     //     {
            //     //         where: {
            //     //             sheet_no: data.id_report,
            //     //         },
            //     //     }
            //     // )
            //     return res.status(200).json(data)
            // })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async insMaintenanceRequest(req, res) {
        try {
            const data = req.body
            if (!data.uuid_request) {
                !data.new_sparepart
                    ? await MaintenanceRequest.create(
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
                    : await MaintenanceRequest.create(
                          {
                              sheet_no: req.body.id_request,
                              ...data,
                              item_stock: data.new_sparepart,
                          },
                          { validate: true },
                          {
                              fields: [
                                  'mch_code',
                                  'mch_com',
                                  'date_request',
                                  'item_name',
                                  'item_qty',
                                  'item_uom',
                              ],
                          }
                      ).then(() => {
                          MaintenanceStock.create({
                              mat_name: data.new_sparepart,
                          })
                      })
                return res.status(200).json(data)
            }

            if (data.uuid_request) {
                !data.new_sparepart
                    ? await MaintenanceRequest.update(data, {
                          where: { uuid_request: data.uuid_request },
                      })
                    : await MaintenanceRequest.update(
                          { ...data, item_stock: data.new_sparepart },
                          {
                              where: { uuid_request: data.uuid_request },
                          }
                      ).then(() => {
                          MaintenanceStock.create({
                              mat_name: data.new_sparepart,
                          })
                      })

                return res.status(200).json(data)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async instMaintenanceControlStock(req, res) {
        try {
            const data = req.body
            const respone = await MaintenanceSparepartControlStcok.findAll({
                where: { uuid: req.body.uuid },
            })

            if (respone.length < 1) {
                MaintenanceSparepartControlStcok.create({
                    ...data,
                })
            } else {
                MaintenanceSparepartControlStcok.update(data, {
                    where: { uuid: req.body.uuid },
                })
            }
            return res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceControlStock(req, res) {
        try {
            const response = await MaintenanceSparepartControlStcok.findAll({})
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceSystem(req, res) {
        try {
            const mch = await MaintenanceMachine.findAll({
                order: [['mch_code', 'ASC']],
            })

            const pg = await PgMowMtn.findAll({
                where: {
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('date', Sequelize.col('ymd')),
                            '>=',
                            '2023-01-01'
                        ),
                        {
                            chk_mark: { [Op.not]: 'C' },
                        },
                    ],
                },
                attributes: ['sheet_no', 'mch_no', 'pri_no', 'chk_mark'],
                group: ['sheet_no', 'mch_no', 'pri_no', 'chk_mark'],
                order: [['sheet_no', 'DESC']],
            })

            const sp = await MaintenanceSparepart.findAll({})

            const machine = _.map(mch, (val) => {
                // console.log(val.mch_com)
                return {
                    ...val.dataValues,
                    sheet: _.find(pg, {
                        mch_no: val.mch_code,
                    }),
                    sp: _.filter(sp, {
                        mch_code: val.mch_code,
                        mch_com: val.mch_com,
                    }),
                }
            })

            return res.status(200).json(machine)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getUser(req, res) {
        try {
            const response = await AuthData.findAll({})
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceMachine(req, res) {
        try {
            const response = await MaintenanceMachine.findAll({
                order: [['mch_code', 'ASC']],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceMachineByOne(req, res) {
        try {
            const getId = await MaintenanceMachine.findOne({
                where: { uuid: req.params.uuid },
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

            if (!request || !report) {
                return res.status(200).json({
                    ...getId.dataValues,
                    report: report,
                    request: request,
                })
            }
            return res.status(200).json({
                ...getId.dataValues,
                report: report,
                request: request,
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
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

                    chk_mark: { [Op.not]: 'C' },
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
                    audit_request: { [Op.not]: 'C' },
                },
                order: [['sheet_no', 'DESC']],
            })

            const genba = await GenbaAcip.findAll({
                where: { mch_code: getId.mch_code },
            })

            const sparepart = await MaintenanceSparepart.findAll({
                where: {
                    mch_code: getId.mch_code,
                    mch_com: getId.mch_com,
                },
                order: [['createdAt', 'DESC']],
            })

            const user = await AuthData.findAll({})

            if (!sparepart || !request || !report || !genba || !user) {
                return res.status(200).json({
                    ...getId.dataValues,
                    sparepart: sparepart,
                    mow: pGMaintenance,
                    report: report,
                    request: request,
                    genba: genba,
                    user: user,
                })
            }
            return res.status(200).json({
                ...getId.dataValues,
                mow: pGMaintenance,
                report: report,
                request: request,
                genba: genba,
                sparepart: sparepart,
                user: user,
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceCategory(req, res) {
        try {
            const response = await MaintenanceCategory.findAll({})
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
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
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceStock(req, res) {
        try {
            const response = await MaintenanceStock.findAll({
                order: [['mat_name', 'ASC']],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceRequest(req, res) {
        try {
            const req = await MaintenanceRequest.findAll({
                order: [['sheet_no', 'DESC']],
            })
            const mch = await MaintenanceMachine.findAll({})

            const result = _.map(req, (val) => {
                return {
                    ...val.dataValues,
                    mch_index: _.find(mch, {
                        mch_code: val.mch_code,
                        mch_com: val.mch_com,
                    }),
                }
            })

            return res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceReport(req, res) {
        try {
            const req = await MaintenanceReport.findAll({
                order: [['sheet_no', 'DESC']],
            })
            const mch = await MaintenanceMachine.findAll({})

            const result = _.map(req, (val) => {
                return {
                    ...val.dataValues,
                    mch_index: _.find(mch, {
                        mch_code: val.mch_code,
                        mch_com: val.mch_com,
                    }),
                }
            })

            return res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getMaintenanceMachineProcess(req, res) {
        try {
            const response = await MaintenanceMachine.findAll({
                attributes: ['uuid', 'mch_process', 'mch_com'],
                group: ['mch_process', 'mch_com'],
                order: [['mch_process', 'ASC']],
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async pGMaintenance(req, res) {
        try {
            const response = await PgMowMtn.findAll({
                where: {
                    chk_mark: { [Op.not]: 'C' },
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('date', Sequelize.col('ymd')),
                            '>=',
                            '2023-01-01'
                        ),
                    ],
                },
                order: [['s_ymd', 'DESC']],
            })

            const mch = await MaintenanceMachine.findAll({})

            // const req = await MaintenanceRequest.findAll({
            //     where: { audit_request: 'N' },
            // })

            const result = _.map(response, (val) => {
                return {
                    ...val.dataValues,
                    mch_index: _.find(mch, {
                        mch_code: val.mch_no,
                        mch_com:
                            val.com_no == '01'
                                ? 'GM1'
                                : val.com_no == '02'
                                ? 'GM2'
                                : val.com_no == '03'
                                ? 'GM3'
                                : 'GM5',
                    }),
                    // request: _.filter(req, { sheet_no: val.sheet_no }),
                }
            })

            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
}
