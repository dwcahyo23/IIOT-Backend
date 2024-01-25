import { Op, Sequelize } from 'sequelize'
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
import _ from 'lodash'

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
                                    dayjs().format('YYYY-MM-DD')
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
                                        '2023-08-28'
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

    async getSparepartBreakdown(req, res) {
        await MaintenanceRequest.findAll({
            where: {
                category_request: {
                    [Op.in]: ['Breakdown', '01', 'Workshop Breakdown', '05'],
                },
                audit_request: 'N',
            },
            order: [['sheet_no', 'ASC']],
        })
            .then((x) => {
                const y = _.chain(x)
                    .groupBy('sheet_no')
                    .map((value, sheet_no) => ({ sheet_no, value }))
                    .value()

                res.status(200).json(y)
            })
            .catch((err) => res.status(500).json(err))
    },
}
