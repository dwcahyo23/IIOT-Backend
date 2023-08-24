import { Op, Sequelize } from 'sequelize'
import { WhatsappUser } from '../models/WhatsappModel'
import { PgMowMtn } from '../models/PgMowMtn'
import { MaintenanceMachine } from '../models/MaintenanceSystemModel'
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
            const response = await PgMowMtn.findAll({
                where: {
                    chk_mark: { [Op.not]: 'C' },
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('date', Sequelize.col('ymd')),
                            '>=',
                            dayjs().format('YYYY-MM-DD')
                        ),
                        {
                            sts_wa: { [Op.eq]: 'N' },
                        },
                        {
                            chk_mark: { [Op.eq]: 'N' },
                        },
                    ],
                },
                order: [['ymd', 'DESC']],
            })

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

            const result = _(user)
                .map((val) => {
                    if (val.role == 'selected') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.mch_index?.responsible == val.name
                            }),
                        }
                    } else if (val.role == 'all') {
                        return {
                            ...val.dataValues,
                            msg: mapData,
                        }
                    } else if (val.role == 'gm1') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.com_no == '01'
                            }),
                        }
                    } else if (val.role == 'gm2') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.com_no == '02'
                            }),
                        }
                    } else if (val.role == 'gm3') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.com_no == '03'
                            }),
                        }
                    } else if (val.role == 'gm5') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.com_no == '06'
                            }),
                        }
                    }
                })
                .value()

            if (_.isArray(mapData) && mapData.length > 0) {
                let update_sheet_no = []
                _.forEach(mapData, (val) => {
                    update_sheet_no.push(val.sheet_no)
                })
                if (update_sheet_no.length > 0) {
                    await PgMowMtn.update(
                        {
                            sts_wa: 'Y',
                        },
                        {
                            where: {
                                sheet_no: update_sheet_no,
                            },
                        }
                    )
                }
            }
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },

    async worderTodayClose(req, res) {
        try {
            const response = await PgMowMtn.findAll({
                where: {
                    chk_mark: { [Op.not]: 'C' },
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.fn('date', Sequelize.col('ymd')),
                            '>=',
                            '2023-08-21'
                        ),
                        {
                            sts_wa: { [Op.eq]: 'Y' },
                        },
                        {
                            sts_wa2: { [Op.eq]: 'n' },
                        },
                        {
                            chk_mark: { [Op.eq]: 'Y' },
                        },
                    ],
                },
                order: [['ymd', 'DESC']],
            })

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

            const result = _(user)
                .map((val) => {
                    if (val.role == 'selected') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.mch_index?.responsible == val.name
                            }),
                        }
                    } else if (val.role == 'all') {
                        return {
                            ...val.dataValues,
                            msg: mapData,
                        }
                    } else if (val.role == 'gm1') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.com_no == '01'
                            }),
                        }
                    } else if (val.role == 'gm2') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.com_no == '02'
                            }),
                        }
                    } else if (val.role == 'gm3') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.com_no == '03'
                            }),
                        }
                    } else if (val.role == 'gm5') {
                        return {
                            ...val.dataValues,
                            msg: _.filter(mapData, (mch) => {
                                return mch.com_no == '06'
                            }),
                        }
                    }
                })
                .value()

            if (_.isArray(mapData) && mapData.length > 0) {
                let update_sheet_no = []
                _.forEach(mapData, (val) => {
                    update_sheet_no.push(val.sheet_no)
                })
                if (update_sheet_no.length > 0) {
                    await PgMowMtn.update(
                        {
                            sts_wa2: 'Y',
                        },
                        {
                            where: {
                                sheet_no: update_sheet_no,
                            },
                        }
                    )
                }
            }
            res.status(200).json(result)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
}
