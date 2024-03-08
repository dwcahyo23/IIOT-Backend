import { Op, Sequelize, QueryTypes } from 'sequelize'
import {
    WhatsappUser,
    WhatsappConfig,
    WhatsappLog,
} from '../models/WhatsappModel'
import { PgMowMtn } from '../models/PgMowMtn'
import {
    MaintenanceMachine,
    MaintenanceRequest,
} from '../models/MaintenanceSystemModel'
import dayjs from 'dayjs'
import _, { uniqBy } from 'lodash'
import pg2 from '../config/pg2'

export default {
    async getUser(req, res) {
        try {
            const response = await WhatsappUser.findAll({})
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async insUser(req, res) {
        const data = req.body
        try {
            const response = await WhatsappUser.bulkCreate(
                data,
                { validate: true },
                {
                    fields: ['name', 'number', 'role'],
                }
            )
            return res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async worderTodayOpen(req, res) {
        try {
            const runtime = await WhatsappConfig.findOne({
                where: { uuid: '91362436-b13e-4416-b4fc-f64fd1be8a2d' },
            })
            if (runtime && runtime.dataValues?.runtime == true) {
                const log = await WhatsappLog.findAll({})
                if (log) {
                    const logId = []

                    _.forEach(log, (val) => {
                        logId.push(val.dataValues.id_log)
                    })

                    const response = await PgMowMtn.findAll({
                        where: {
                            [Op.and]: [
                                Sequelize.where(
                                    Sequelize.fn('date', Sequelize.col('ymd')),
                                    '>=',
                                    dayjs()
                                        .subtract(3, 'month')
                                        .format('YYYY-MM-DD')
                                ),
                                //? Dev

                                {
                                    //validasi pgsql
                                    sts_wa: { [Op.eq]: 'N' },
                                },
                                {
                                    chk_mark: { [Op.notIn]: ['C', 'Y'] },
                                },
                                {
                                    //validasi msql
                                    sheet_no: {
                                        [Op.notIn]: logId,
                                    },
                                },
                            ],
                        },
                        order: [['ymd', 'DESC']],
                    })

                    if (response) {
                        const mch = await MaintenanceMachine.findAll({})

                        const user = await WhatsappUser.findAll({
                            where: { with_dep_no: false },
                        })

                        const mapData = _.map(response, (val) => {
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
                            }
                        })

                        const resultX = _(user).map((val) => {
                            const matchCom = val.role.split(',')
                            if (
                                val.responsible == true &&
                                val.with_prior == false
                            ) {
                                return {
                                    ...val.dataValues,
                                    msg: _.filter(mapData, (mch) => {
                                        return (
                                            _.includes(matchCom, mch.com_no) &&
                                            mch.mch_index?.responsible ==
                                                val.name
                                        )
                                    }),
                                }
                            } else if (val.with_prior == true) {
                                const prior = val.prior.split(',')
                                return {
                                    ...val.dataValues,
                                    msg: _.filter(mapData, (mch) => {
                                        return (
                                            _.includes(matchCom, mch.com_no) &&
                                            _.includes(prior, mch.pri_no)
                                        )
                                    }),
                                }
                            } else if (
                                val.responsible == false &&
                                val.with_prior == false
                            ) {
                                return {
                                    ...val.dataValues,
                                    msg: _.filter(mapData, (mch) => {
                                        return _.includes(matchCom, mch.com_no)
                                    }),
                                }
                            }
                        })

                        //? Dev
                        if (_.isArray(mapData) && mapData.length > 0) {
                            let updateSheetNo = []
                            let updateLog = []
                            _.forEach(mapData, (val) => {
                                updateSheetNo.push(val.sheet_no)
                                updateLog.push({
                                    id_log: val.sheet_no,
                                    menu: 'Work Order',
                                })
                            })
                            if (updateSheetNo.length > 0) {
                                await PgMowMtn.update(
                                    {
                                        sts_wa: 'Y',
                                    },
                                    {
                                        where: {
                                            sheet_no: updateSheetNo,
                                        },
                                    }
                                )

                                await WhatsappLog.bulkCreate(
                                    updateLog,
                                    { validate: true },
                                    {
                                        fields: ['id_log', 'menu'],
                                    }
                                )
                            }
                        }
                        res.status(200).json(resultX)
                    }
                }
            } else {
                return res.status(500).json({ message: 'runtime off' })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async worderTodayClose(req, res) {
        try {
            const runtime = await WhatsappConfig.findOne({
                where: { uuid: '91362436-b13e-4416-b4fc-f64fd1be8a2d' },
            })
            if (runtime && runtime.dataValues?.runtime == true) {
                const log = await WhatsappLog.findAll({})
                if (log) {
                    const logId = []

                    _.forEach(log, (val) => {
                        if (val.status == 'Open') {
                            logId.push(val.dataValues.id_log)
                        }
                    })

                    if (logId.length > 0) {
                        const response = await PgMowMtn.findAll({
                            where: {
                                [Op.and]: [
                                    Sequelize.where(
                                        Sequelize.fn(
                                            'date',
                                            Sequelize.col('ymd')
                                        ),
                                        '>=',
                                        dayjs()
                                            .subtract(3, 'month')
                                            .format('YYYY-MM-DD')
                                        // dayjs().format('YYYY-MM-DD')
                                    ),
                                    {
                                        //validasi pgsql
                                        sts_wa2: { [Op.eq]: 'n' },
                                    },
                                    {
                                        chk_mark: { [Op.notIn]: ['C', 'N'] },
                                    },
                                    {
                                        //validasi msql
                                        sheet_no: {
                                            [Op.in]: logId,
                                        },
                                    },
                                ],
                            },
                            order: [['ymd', 'DESC']],
                        })

                        if (response) {
                            const mch = await MaintenanceMachine.findAll({})

                            const user = await WhatsappUser.findAll({})

                            const mapData = _.map(response, (val) => {
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
                                }
                            })

                            const resultX = _(user).map((val) => {
                                const matchCom = val.role.split(',')
                                if (
                                    val.responsible == true &&
                                    val.with_prior == false &&
                                    val.with_dep_no == false
                                ) {
                                    return {
                                        ...val.dataValues,
                                        msg: _.filter(mapData, (mch) => {
                                            return (
                                                _.includes(
                                                    matchCom,
                                                    mch.com_no
                                                ) &&
                                                mch.mch_index?.responsible ==
                                                    val.name
                                            )
                                        }),
                                    }
                                } else if (
                                    val.responsible == false &&
                                    val.with_dep_no == true &&
                                    val.with_prior == false
                                ) {
                                    const dep_no = val.dep_no.split(',')
                                    return {
                                        ...val.dataValues,
                                        msg: _.filter(mapData, (mch) => {
                                            return (
                                                _.includes(
                                                    matchCom,
                                                    mch.com_no
                                                ) &&
                                                _.includes(dep_no, mch.dep_no)
                                            )
                                        }),
                                    }
                                } else if (
                                    val.responsible == false &&
                                    val.with_prior == true &&
                                    val.with_dep_no == false
                                ) {
                                    const prior = val.prior.split(',')
                                    return {
                                        ...val.dataValues,
                                        msg: _.filter(mapData, (mch) => {
                                            return (
                                                _.includes(
                                                    matchCom,
                                                    mch.com_no
                                                ) &&
                                                _.includes(prior, mch.pri_no)
                                            )
                                        }),
                                    }
                                } else if (
                                    val.with_prior == false &&
                                    val.responsible == false &&
                                    val.with_dep_no == false
                                ) {
                                    return {
                                        ...val.dataValues,
                                        msg: _.filter(mapData, (mch) => {
                                            return _.includes(
                                                matchCom,
                                                mch.com_no
                                            )
                                        }),
                                    }
                                }
                            })

                            if (_.isArray(mapData) && mapData.length > 0) {
                                let updateSheetNo = []
                                _.forEach(mapData, (val) => {
                                    updateSheetNo.push(val.sheet_no)
                                })
                                if (updateSheetNo.length > 0) {
                                    await PgMowMtn.update(
                                        {
                                            sts_wa2: 'Y',
                                        },
                                        {
                                            where: {
                                                sheet_no: updateSheetNo,
                                            },
                                        }
                                    )

                                    await WhatsappLog.update(
                                        {
                                            status: 'Close',
                                        },
                                        {
                                            where: {
                                                id_log: updateSheetNo,
                                            },
                                        }
                                    )

                                    // await WhatsappLog.bulkCreate(
                                    //     updateLog,
                                    //     { validate: true },
                                    //     {
                                    //         fields: ['id_log', 'menu'],
                                    //     }
                                    // )
                                }
                            }
                            res.status(200).json(resultX)
                        }
                    } else {
                        return res
                            .status(500)
                            .json({ message: 'log open not found' })
                    }
                }
            } else {
                return res.status(500).json({ message: 'runtime off' })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getLog(req, res) {
        try {
            const response = await WhatsappLog.findAll({})
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async getSparepart(req, res) {
        const { cat, com } = req.params
        await MaintenanceRequest.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('date', Sequelize.col('createdAt')),
                        '>=',
                        '2024-01-01'
                    ),
                ],
                category_request: {
                    [Op.eq]: cat,
                },
                mch_com: {
                    [Op.eq]: com,
                },
                audit_request: {
                    [Op.eq]: 'N',
                },
            },
            attributes: [
                'sheet_no',
                'mch_com',
                'mch_code',
                'item_stock',
                'item_qty',
                'item_uom',
                'mre_request',
                'item_ready',
                'date_request',
            ],
            order: [['sheet_no', 'ASC']],
        })
            .then(async (x) => {
                if (x.length < 1) {
                    return res.status(200).json([])
                }
                const sheet_no = await _.map(x, (val) => val.sheet_no)
                let mre_request = []
                await _.forEach(x, (val) => {
                    val.mre_request.length > 1 &&
                        mre_request.push(val.mre_request)
                })

                const y = await PgMowMtn.findAll({
                    where: { sheet_no: { [Op.in]: sheet_no } },
                    attributes: [
                        'sheet_no',
                        'mch_no',
                        'com_no',
                        'memo',
                        'ymd',
                        'chk_mark',
                        'pri_no',
                    ],
                })

                let z

                const mat_pur_mast_view = (params) => {
                    return (z = _.map(params, (val) => {
                        return {
                            mat_no: _.trim(val.mat_no),
                            pur_sheet_no: _.trim(val.pur_sheet_no),
                            ove_mk: val.ove_mk,
                            ship_ymd: val.ship_ymd,
                            eta_ymd: val.eta_ymd,
                            mat_name: val.mat_name,
                            qty: val.qty,
                        }
                    }))
                    // z = params
                }

                await pg2
                    .query(
                        'SELECT a.*, b.mat_name  FROM sch_ot.mat_pur_mast_view a left join sch_ot.bas_mat_mast b on a.mat_no = b.mat_no where a.pur_sheet_no IN (:mre) order by a.pur_sheet_no desc',
                        {
                            replacements: { mre: mre_request },
                            type: QueryTypes.SELECT,
                        }
                    )
                    .then((r) => mat_pur_mast_view(r))

                const chaintes = await _.chain(x)
                    .groupBy('mch_code')
                    .mapValues((j) => {
                        // const uniq = _.map(
                        //     _.uniqBy(j, 'mre_request'),
                        //     (val) => val.mre_request
                        // )

                        const map = _.map(j, (val) => {
                            const mow = _.find(y, { sheet_no: val.sheet_no })
                            return {
                                ...mow.dataValues,
                                stock: _.trim(val.item_stock),
                                request_qty: val.item_qty,
                                request_uom: val.item_uom,
                                mre_request: _.trim(val.mre_request),
                                request_ready: val.item_ready,
                                date_request: val.date_request,
                            }
                        })

                        const sheet_no = _(map)
                            .groupBy('sheet_no')
                            .map((h, j) => {
                                return {
                                    j,
                                    h,
                                    i: _.filter(z, (val) => {
                                        return _.includes(
                                            _.uniqBy(h, 'mre_request').map(
                                                (r) => r.mre_request
                                            ),
                                            val.pur_sheet_no
                                        )
                                    }),
                                }
                            })
                        return { sheet_no }
                    })
                    .map((value, index) => ({
                        index,
                        ...value,
                    }))
                    .value()

                return res.status(200).json(chaintes)
            })
            .catch((err) => res.status(500).json(err))
    },
}
