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
import dayjs from 'dayjs'

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

// MaintenanceCategory.hasMany(MaintenanceSparepart, {
//     foreignKey: 'slug',
//     sourceKey: 'slug',
//     constraints: false,
// })
// MaintenanceSparepart.belongsTo(MaintenanceCategory, {
//     foreignKey: 'slug',
//     targetKey: 'slug',
//     constraints: false,
// })

export default {
    //--- for dev bulk post  ---

    // async insMaintenanceMachine(req, res) {
    //     const machine = req.body
    //     try {
    //         const response = await MaintenanceMachine.bulkCreate(
    //             machine,
    //             { validate: true },
    //             {
    //                 fields: [
    //                     'mch_code',
    //                     'mch_name',
    //                     'mch_process',
    //                     'mch_process_type',
    //                     'mch_com',
    //                     'mch_loc',
    //                     'mch_prod',
    //                     'mch_maker',
    //                     'responsible',
    //                     'mch_hp',
    //                     'memo',
    //                 ],
    //             }
    //         )
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    // async updateMaintenanceMachine(req, res) {
    //     const machine = req.body
    //     try {
    //         _.forEach(machine, async (val) => {
    //             await MaintenanceMachine.findOne({
    //                 where: { uuid: val.uuid, mch_code: val.mch_code },
    //             })
    //                 .then((obj) => {
    //                     if (obj) {
    //                         MaintenanceMachine.update(
    //                             { ...val },
    //                             {
    //                                 where: { uuid: val.uuid },
    //                             }
    //                         )
    //                         return res.end()
    //                     } else {
    //                         return res.end()
    //                     }
    //                 })
    //                 .catch((error) => console.log(error))
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    // async instMaintenanceBulkReport(req, res) {
    //     const machine = req.body
    //     try {
    //         const response = await MaintenanceReport.bulkCreate(
    //             machine,
    //             { validate: true },
    //             {
    //                 fields: [
    //                     'sheet_no',
    //                     'mch_code',
    //                     'mch_com',
    //                     'date_report',
    //                     'kind',
    //                     'chronological',
    //                     'corrective',
    //                     'prevention',
    //                     'user_rep1',
    //                     'user_rep2',
    //                     'date_target',
    //                     'date_finish',
    //                     'audit_report',
    //                 ],
    //             }
    //         )
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    // async instMaintenanceBulkRequest(req, res) {
    //     const machine = req.body
    //     try {
    //         const response = await MaintenanceRequest.bulkCreate(machine, {
    //             validate: true,
    //         })
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    // async instMaintenanceBulkWorkshopReport(req, res) {
    //     const data = req.body
    //     try {
    //         const response = await MaintenanceWorkshopReport.bulkCreate(data, {
    //             validate: true,
    //         })
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    // async insMaintenanceSparepartBulkFind(req, res) {
    //     try {
    //         const sparepart = req.body
    //         _.forEach(sparepart, async (val, index) => {
    //             const boms = await MaintenanceSparepart.findAll({
    //                 where: {
    //                     mch_code: val.mch_code,
    //                     category: val.category,
    //                     item_change_date: { [Op.not]: null },
    //                 },
    //             })

    //             if (boms.length < 1) {
    //                 const bom = `${val.category}${val.mch_code.replace(
    //                     /\-/g,
    //                     ''
    //                 )}-${1001 + boms.length}`
    //                 const response = await MaintenanceSparepart.create({
    //                     ...val,
    //                     bom: bom,
    //                 })
    //                 return res.end()
    //             } else {
    //                 const bom = `${val.category}${val.mch_code.replace(
    //                     /\-/g,
    //                     ''
    //                 )}-${1001 + boms.length}`
    //                 const response = await MaintenanceSparepart.create({
    //                     ...val,
    //                     bom: bom,
    //                 })

    //                 return res.end()
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    // async instMaintenanceBulkControllStock(req, res) {
    //     const data = req.body
    //     try {
    //         const response = await MaintenanceSparepartControlStcok.bulkCreate(
    //             data,
    //             {
    //                 validate: true,
    //             },
    //             {
    //                 fields: [
    //                     'uuid',
    //                     'sparepart_name',
    //                     'op_qty',
    //                     'uom_op',
    //                     'oq_qty',
    //                     'uom_oq',
    //                     'stock_qty',
    //                     'uom_stock',
    //                     'sparepart_category',
    //                     'lead_time',
    //                     'no_pr',
    //                 ],
    //             }
    //         )
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    //---- end of bulk post ---

    // async insMaintenanceSparepart(req, res) {
    //     try {
    //         const sparepart = req.body
    //         const boms = await MaintenanceSparepart.findAll({
    //             where: {
    //                 mch_code: sparepart.mch_code,
    //                 category: sparepart.category,
    //                 item_change_date: { [Op.not]: null },
    //             },
    //         })

    //         if (boms.length < 1) {
    //             const bom = `${
    //                 sparepart.category
    //             }${sparepart.mch_code.value.replace(/\-/g, '')}-${
    //                 1001 + boms.length
    //             }`
    //             const response = await MaintenanceSparepart.bulkCreate(
    //                 { ...sparepart, bom: bom },
    //                 { validate: true },
    //                 {
    //                     fields: [
    //                         'mch_code',
    //                         'mch_com',
    //                         'slug',
    //                         'bom',
    //                         'category',
    //                         'item_name',
    //                         'item_life_time',
    //                         'item_lead_time',
    //                     ],
    //                 }
    //             )
    //             return res.status(200).json(response)
    //         } else {
    //             const bom = `${
    //                 sparepart.category
    //             }${sparepart.mch_code.value.replace(/\-/g, '')}-${
    //                 1001 + boms.length
    //             }`
    //             const response = await MaintenanceSparepart.bulkCreate(
    //                 { ...sparepart, bom: bom },
    //                 { validate: true },
    //                 {
    //                     fields: [
    //                         'mch_code',
    //                         'mch_com',
    //                         'slug',
    //                         'bom',
    //                         'category',
    //                         'item_name',
    //                         'item_life_time',
    //                         'item_lead_time',
    //                     ],
    //                 }
    //             )
    //             return res.status(200).json(response)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    // async insMaintenanceStock(req, res) {
    //     const data = req.body
    //     try {
    //         const response = await MaintenanceStock.bulkCreate(
    //             data,
    //             { validate: true },
    //             { fields: ['mat_no', 'mat_name', 'grade'] }
    //         )
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    // async insMaintenanceCategory(req, res) {
    //     const category = req.body
    //     try {
    //         const response = await MaintenanceCategory.bulkCreate(
    //             category,
    //             { validate: true },
    //             { fields: ['title', 'slug', 'color'] }
    //         )
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    async insMaintenanceReport(req, res) {
        try {
            const data = req.body
            console.log(data)
            const find = await MaintenanceReport.findOne({
                where: { sheet_no: req.body.sheet_no },
            })
            if (find == null) {
                MaintenanceReport.create(
                    {
                        sheet_no: req.body.sheet_no,
                        ...data,
                    },
                    { validate: true }
                )
                    .then(() => {
                        res.status(200).json(data)
                    })
                    .catch((error) => res.status(500).json(error))
            } else {
                MaintenanceReport.update(data, {
                    where: { sheet_no: data.sheet_no },
                })
                    .then(() => {
                        res.status(200).json(data)
                    })
                    .catch((error) => res.status(500).json(error))
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async handleMaintenanceRequest(req, res) {
        const options = req.params.options
        const user = req.params.user
        const dataRow = req.body

        try {
            const userSubmit = await AuthData.findAll({
                where: { datumUuid: user },
                raw: true,
            })

            if (options == 'audit') {
                let uuid_request = dataRow.map((data) => data.uuid_request)
                MaintenanceRequest.update(
                    {
                        date_audit_request: dayjs(),
                        audit_request: 'Y',
                        user_req2: userSubmit.displayName,
                    },
                    { where: { uuid_request: uuid_request, item_ready: 'Y' } }
                )
                    .then(() => {
                        MaintenanceSparepart.update(
                            {
                                item_change_date: [dayjs()],
                            },
                            { where: { sheet_no: uuid_request } }
                        )

                        res.status(200).json({
                            message: 'Data audited successfully',
                        })
                    })
                    .catch((err) => res.status(500).json(err))
            } else if (options == 'ready') {
                let uuid_request = dataRow.map((data) => data.uuid_request)
                MaintenanceRequest.update(
                    {
                        date_ready_request: dayjs(),
                        item_ready: 'Y',
                    },
                    { where: { uuid_request: uuid_request } }
                )
                    .then(() =>
                        res
                            .status(200)
                            .json({ message: 'Data updated successfully' })
                    )
                    .catch((err) => res.status(500).json(err))
            } else if (options == 'cancel') {
                let uuid_request = dataRow.map((data) => data.uuid_request)
                MaintenanceRequest.update(
                    {
                        audit_request: 'C',
                        user_req2: userSubmit.displayName,
                    },
                    { where: { uuid_request: uuid_request } }
                )
                    .then(() =>
                        res
                            .status(200)
                            .json({ message: 'Data canceled successfully' })
                    )
                    .catch((err) => res.status(500).json(err))
            } else if (options == 'save') {
                if (dataRow?.new_sparepart) {
                    MaintenanceRequest.create(
                        { ...dataRow, item_stock: dataRow.new_sparepart },
                        { validate: true }
                    )
                        .then(() => {
                            MaintenanceStock.create({
                                mat_name: dataRow.new_sparepart,
                            })
                            res.status(200).json({
                                message: 'Data saved successfully',
                            })
                        })
                        .catch((err) => res.status(500).json(err))
                } else {
                    MaintenanceRequest.create(dataRow, { validate: true })
                        .then(() =>
                            res
                                .status(200)
                                .json({ message: 'Data saved successfully' })
                        )
                        .catch((err) => res.status(500).json(err))
                }
            } else if (_.includes(options, 'MRE')) {
                let uuid_request = dataRow.map((data) => data.uuid_request)
                MaintenanceRequest.update(
                    {
                        date_mre_request: dayjs(),
                        mre_request: options,
                    },
                    { where: { uuid_request: uuid_request } }
                )
                    .then(() =>
                        res
                            .status(200)
                            .json({ message: 'Data updated successfully' })
                    )
                    .catch((err) => res.status(500).json(err))
            } else if (options == 'lifeTime') {
                const { sparepart, request, machine, uuid_request } = dataRow

                const boms = await MaintenanceSparepart.findAll({
                    where: {
                        mch_code: machine.mch_code,
                        mch_com: machine.mch_com,
                        category: sparepart.category,
                    },
                    raw: true,
                })

                if (boms.length < 1) {
                    const bom = `${
                        sparepart.category
                    }${machine.mch_code.replace(/\-/g, '')}-${
                        1001 + boms.length
                    }`
                    MaintenanceSparepart.create({
                        mch_code: machine.mch_code,
                        mch_com: machine.mch_com,
                        bom: bom,
                        slug: 'life-time',
                        category: sparepart.category,
                        item_life_time: sparepart.item_life_time,
                        item_lead_time: sparepart.item_lead_time,
                        item_name: request.item_stock,
                        item_change_date: [dayjs()],
                        remarks: sparepart.remarks,
                        sheet_no: uuid_request,
                    })
                        .then(() =>
                            res
                                .status(200)
                                .json({ message: 'Data updated successfully' })
                        )
                        .catch((err) => res.status(500).json(err))
                } else {
                    const bom = `${
                        sparepart.category
                    }${machine.mch_code.replace(/\-/g, '')}-${
                        1001 + boms.length
                    }`
                    MaintenanceSparepart.create({
                        mch_code: machine.mch_code,
                        mch_com: machine.mch_com,
                        bom: bom,
                        slug: 'life-time',
                        category: sparepart.category,
                        item_life_time: sparepart.item_life_time,
                        item_lead_time: sparepart.item_lead_time,
                        item_name: request.item_stock,
                        item_change_date: [dayjs()],
                        remarks: sparepart.remarks,
                        sheet_no: uuid_request,
                    })
                        .then(() =>
                            res
                                .status(200)
                                .json({ message: 'Data updated successfully' })
                        )
                        .catch((err) => res.status(500).json(err))
                }
            } else if (options == 'regenerateLifeTime') {
                const { regenerate } = dataRow
                const initVal = await MaintenanceSparepart.findOne({
                    where: {
                        uuid: regenerate,
                    },
                    raw: true,
                })

                if (initVal != null) {
                    const { item_change_date, item_life_time } = initVal

                    let newChangeDate = [
                        dayjs(),
                        ...JSON.parse(item_change_date),
                    ]

                    let toTimestamp = newChangeDate.map((val) =>
                        dayjs(val).unix()
                    )

                    let toDiff = toTimestamp
                        .slice(1)
                        .map((e, i) => toTimestamp[i] - toTimestamp[i + 1])

                    let toAvg =
                        toDiff.reduce((a, b) => a + b, 0) / toDiff.length / 3600

                    // res.status(200).json(toAvg.toFixed(2) * 1)

                    MaintenanceSparepart.update(
                        {
                            item_life_time: toAvg.toFixed(2) * 1,
                            item_change_date: newChangeDate,
                        },
                        { where: { uuid: regenerate } }
                    )
                        .then(() =>
                            res
                                .status(200)
                                .json({ message: 'Data canceled successfully' })
                        )
                        .catch((err) => res.status(500).json(err))
                }
            }
        } catch (error) {
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

    async updateStockMaintenanceControlStock(req, res) {
        try {
            const data = req.body

            const result = (db, xlsx) => {
                return new Promise((resolve, reject) => {
                    const id = _(db)
                        .map((val) => {
                            const newUuid = val.uuid.split(',')
                            return newUuid
                        })
                        .flatMapDeep()
                        .filter()
                        .value()

                    if (id.length > 0) {
                        const fillterXlsx = _.filter(xlsx, (val) =>
                            _.includes(id, val.mat_no)
                        )

                        resolve(fillterXlsx)
                    } else {
                        reject('uuid not match')
                    }
                })
            }

            if (_.isArray(data) && data.length > 1) {
                const response = await MaintenanceSparepartControlStcok.findAll(
                    { raw: true }
                )
                if (response.length > 1) {
                    result(response, data)
                        .then((x) => {
                            _.forEach(x, (val) => {
                                MaintenanceSparepartControlStcok.update(
                                    {
                                        stock_qty: val.stk_qty,
                                    },
                                    { where: { uuid: val.mat_no } }
                                )
                            })
                            res.status(200).json(response)
                        })
                        .catch((e) => res.status(500).json(e))
                } else {
                    return res.status(404)
                }
            } else {
                return res.status(404)
            }
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

            const sp = await MaintenanceSparepart.findAll({
                where: {
                    item_change_date: { [Op.not]: null },
                },
            })

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

    // async getMaintenanceMachineByOne(req, res) {
    //     try {
    //         const getId = await MaintenanceMachine.findOne({
    //             where: { uuid: req.params.uuid },
    //         })

    //         const report = await MaintenanceReport.findAll({
    //             where: {
    //                 mch_code: getId.mch_code,
    //                 mch_com: getId.mch_com,
    //             },
    //             order: [['sheet_no', 'DESC']],
    //         })

    //         const request = await MaintenanceRequest.findAll({
    //             where: {
    //                 mch_code: getId.mch_code,
    //                 mch_com: getId.mch_com,
    //             },
    //             order: [['sheet_no', 'DESC']],
    //         })

    //         if (!request || !report) {
    //             return res.status(200).json({
    //                 ...getId.dataValues,
    //                 report: report,
    //                 request: request,
    //             })
    //         }
    //         return res.status(200).json({
    //             ...getId.dataValues,
    //             report: report,
    //             request: request,
    //         })
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

    async getMaintenanceMachineBy(req, res) {
        try {
            const getId = await MaintenanceMachine.findOne({
                where: { uuid: req.params.uuid },
            })

            const pGMaintenance = await PgMowMtn.findAll({
                where: {
                    mch_no: getId.mch_code,

                    chk_mark: { [Op.not]: 'C' },
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
                    item_change_date: { [Op.not]: null },
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

    async getMaintenanceMachineBySheet(req, res) {
        const { uuid, sheet_no, uuid_request } = req.params
        await MaintenanceMachine.findOne({
            where: { uuid: uuid },
            raw: true,
        })
            .then((machine) => {
                _.isNull(machine) == false &&
                    PgMowMtn.findOne({
                        where: {
                            sheet_no: sheet_no,
                        },
                        raw: true,
                    }).then((apSheet) => {
                        MaintenanceRequest.findAll({
                            where: {
                                sheet_no: sheet_no,
                            },
                            raw: true,
                        }).then((apRequest) => {
                            MaintenanceReport.findOne({
                                where: {
                                    sheet_no: sheet_no,
                                },
                            }).then((apReport) => {
                                MaintenanceSparepart.findAll({
                                    where: {
                                        mch_code: machine.mch_code,
                                        mch_com: machine.mch_com,
                                    },
                                }).then((apSparepart) => {
                                    res.status(200).json({
                                        machine: machine,
                                        sheet: apSheet,
                                        requestList: apRequest,
                                        request:
                                            uuid_request == 'null' ||
                                            apRequest.length < 1
                                                ? {
                                                      sheet_no:
                                                          apSheet.sheet_no,
                                                      mch_code:
                                                          machine.mch_code,
                                                      mch_com: machine.mch_com,
                                                      date_request: dayjs(),
                                                      category_request:
                                                          apSheet.pri_no == '01'
                                                              ? 'Breakdown'
                                                              : apSheet.pri_no ==
                                                                '02'
                                                              ? 'Still Run'
                                                              : apSheet.pri_no ==
                                                                '03'
                                                              ? 'Preventive'
                                                              : apSheet.pri_no ==
                                                                '04'
                                                              ? 'Workshop Still Run'
                                                              : apSheet.pri_no ==
                                                                '05'
                                                              ? 'Workshop Breakdown'
                                                              : '',
                                                      item_stock: null,
                                                  }
                                                : _.find(apRequest, {
                                                      uuid_request:
                                                          uuid_request,
                                                  }),
                                        report:
                                            apReport == null
                                                ? {
                                                      sheet_no:
                                                          apSheet.sheet_no,
                                                      mch_code:
                                                          machine.mch_code,
                                                      mch_com: machine.mch_com,
                                                      date_report: apSheet.ymd,
                                                      date_target: dayjs(),
                                                      date_finish:
                                                          apSheet.chk_date,
                                                  }
                                                : apReport,
                                        sparepartList: apSparepart,
                                    })
                                })
                            })
                        })
                    })
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    },

    // async getMaintenanceCategory(req, res) {
    //     try {
    //         const response = await MaintenanceCategory.findAll({})
    //         return res.status(200).json(response)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(500).json(error)
    //     }
    // },

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
            // const response = await PgMowMtn.findAll({
            //     where: {
            //         chk_mark: { [Op.not]: 'C' },
            //         [Op.and]: [
            //             Sequelize.where(
            //                 Sequelize.fn('date', Sequelize.col('ymd')),
            //                 '>=',
            //                 '2023-01-01'
            //             ),
            //         ],
            //     },
            //     // order: [['s_ymd', 'DESC']],
            // })

            const response = await AuthData.findAll({})

            // const mch = await MaintenanceMachine.findAll({})

            // const result = _.map(response, (val) => {
            //     return {
            //         ...val.dataValues,
            //         mch_index: _.find(mch, {
            //             mch_code: val.mch_no,
            //             mch_com:
            //                 val.com_no == '01'
            //                     ? 'GM1'
            //                     : val.com_no == '02'
            //                     ? 'GM2'
            //                     : val.com_no == '03'
            //                     ? 'GM3'
            //                     : 'GM5',
            //         }),
            //     }
            // })

            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async dashboardMN(req, res) {
        const com = req.params.com
        const sectionCode =
            req.params.section == 'machinery'
                ? ['01', '02', '03', '06']
                : req.params.section == 'utility'
                ? ['01', '02', '03']
                : req.params.section == 'workshop'
                ? ['05', '04', '07']
                : ''

        const sectionName =
            req.params.section == 'machinery'
                ? {
                      breakdown: '01',
                      still_run: '02',
                      preventive: '03',
                      project: '06',
                  }
                : req.params.section == 'utility'
                ? { breakdown: '01', still_run: '02', preventive: '03' }
                : req.params.section == 'workshop'
                ? {
                      breakdown: '05',
                      still_run: '04',
                      project: '07',
                  }
                : ''
        const section =
            req.params.section == 'machinery'
                ? ['machinery']
                : req.params.section == 'utility'
                ? ['utility']
                : req.params.section == 'workshop'
                ? ['machinery', 'utility']
                : ''

        const makeCake = (material, spice) => {
            return new Promise((resolve, reject) => {
                const useMixing = _(material)
                    .map((val) => {
                        if (dayjs(val.ymd).year() == dayjs().year())
                            return {
                                ...val,
                                mch_index: _.find(
                                    spice,
                                    {
                                        mch_code: val.mch_no,
                                        mch_com:
                                            val.com_no == '01'
                                                ? 'GM1'
                                                : val.com_no == '02'
                                                ? 'GM2'
                                                : val.com_no == '03'
                                                ? 'GM3'
                                                : 'GM5',
                                    } || {}
                                ),
                            }
                    })
                    .groupBy((val) => val.mch_index?.responsible)
                    .omit(['undefined'])
                    .value()

                if (_.isObject(useMixing) && _.isEmpty(useMixing == false)) {
                    const mixingKey = _.keys(useMixing)
                    useMixing['Bos'] = _.concat(
                        _.flatMapDeep(_.at(useMixing, mixingKey))
                    )
                    resolve(useMixing)
                } else {
                    reject('some error in makeCake mixing')
                }
            })
        }

        const useOven = (stove) => {
            return new Promise((resolve, reject) => {
                const goodCake = _(stove)
                    .mapValues((items) => {
                        return _(items)
                            .orderBy(['ymd'], ['desc'])
                            .groupBy((val) => dayjs(val.ymd).format('MMMM'))
                            .mapValues((items) => {
                                return {
                                    data: items,
                                    breakdown: _.countBy(items, (val) =>
                                        val.pri_no == sectionName?.breakdown
                                            ? 'pass'
                                            : 'fail'
                                    ),
                                    still_run: _.countBy(items, (val) =>
                                        val.pri_no == sectionName?.still_run
                                            ? 'pass'
                                            : 'fail'
                                    ),
                                    preventive: _.countBy(items, (val) =>
                                        val.pri_no == sectionName?.preventive
                                            ? 'pass'
                                            : 'fail'
                                    ),
                                    project: _.countBy(items, (val) =>
                                        val.pri_no == sectionName?.project
                                            ? 'pass'
                                            : 'fail'
                                    ),
                                    work_order: _.countBy(items, (val) =>
                                        val ? 'pass' : 'fail'
                                    ),
                                    audit: _.countBy(items, (val) =>
                                        val.chk_mark == 'Y' ? 'pass' : 'fail'
                                    ),
                                    breakdown_audit: _.countBy(items, (val) =>
                                        val.pri_no == sectionName?.breakdown &&
                                        val.chk_mark == 'Y'
                                            ? 'pass'
                                            : 'fail'
                                    ),
                                    still_run_audit: _.countBy(items, (val) =>
                                        val.pri_no == sectionName?.still_run &&
                                        val.chk_mark == 'Y'
                                            ? 'pass'
                                            : 'fail'
                                    ),
                                    preventive_audit: _.countBy(items, (val) =>
                                        val.pri_no == sectionName?.preventive &&
                                        val.chk_mark == 'Y'
                                            ? 'pass'
                                            : 'fail'
                                    ),
                                    project_audit: _.countBy(items, (val) =>
                                        val.pri_no == sectionName?.project &&
                                        val.chk_mark == 'Y'
                                            ? 'pass'
                                            : 'fail'
                                    ),
                                }
                            })
                            .value()
                    })
                    .value()

                if (_.isObject(goodCake)) {
                    resolve(goodCake)
                } else {
                    reject('some error in useOven')
                }
            })
        }

        try {
            const response = await PgMowMtn.findAll({
                where: {
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('date', Sequelize.col('ymd')),
                            '>=',
                            '2023-01-01'
                        ),
                        { chk_mark: { [Op.not]: 'C' } },
                        { com_no: { [Op.eq]: com } },
                        { pri_no: { [Op.in]: sectionCode } },
                    ],
                },
                order: [['s_ymd', 'DESC']],
                raw: true,
            })

            if (response.length > 0) {
                const plant =
                    com == '01'
                        ? 'GM1'
                        : com == '02'
                        ? 'GM2'
                        : com == '03'
                        ? 'GM3'
                        : com == '06'
                        ? 'GM5'
                        : ''
                const mch = await MaintenanceMachine.findAll({
                    where: {
                        [Op.and]: [
                            { mch_com: { [Op.eq]: plant } },
                            { responsible: { [Op.not]: null } },
                            { section: { [Op.in]: section } },
                        ],
                    },
                    raw: true,
                })

                if (mch.length > 0) {
                    makeCake(response, mch)
                        .then((x) =>
                            useOven(x)
                                .then((y) => res.status(200).json(y))
                                .catch((err) => res.status(500).json(err))
                        )
                        .catch((err) => res.status(500).json(err))
                } else {
                    return res.status(404).json('data mch not found')
                }
            } else {
                return res.status(404).json('data pg not found')
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async pGMaintenanceToday(req, res) {
        try {
            const response = await PgMowMtn.findAll({
                where: {
                    chk_mark: { [Op.not]: 'C' },
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('date', Sequelize.col('ymd')),
                            '>=',
                            dayjs().format('YYYY-MM-DD')
                        ),
                    ],
                },
                order: [['s_ymd', 'DESC']],
            })

            const mch = await MaintenanceMachine.findAll({})

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
