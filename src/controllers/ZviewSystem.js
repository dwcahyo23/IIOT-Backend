import { Op, Sequelize, where } from 'sequelize'
import dayjs from 'dayjs'
import _ from 'lodash'
import { ZbView, ZbConn, ZbSens, ZbLog } from '../models/ZviewModel'
import { MaintenanceMachine } from '../models/MaintenanceSystemModel'

export default {
    async insZbSens(req, res) {
        const data = req.body
        try {
            const response = await ZbSens.bulkCreate(data, { validate: true })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async insZbView(req, res) {
        const data = req.body
        try {
            const response = await ZbView.bulkCreate(data, { validate: true })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async insZbConn(req, res) {
        const data = req.body
        try {
            _.forEach(data, async (val) => {
                await ZbConn.findOne({
                    where: {
                        [Op.and]: [
                            { id_zb_sens: val.id_zb_sens },
                            { lock: false },
                        ],
                    },
                    raw: true,
                }).then((result) => {
                    if (result === null) {
                        console.log(result)
                        ZbConn.create({ ...val }, { validate: true })
                    } else {
                        const count_zb_sens =
                            result.start_zb_sens !== 0
                                ? val.init_zb_sens * 1 -
                                  result.start_zb_sens * 1
                                : 0

                        //--for update form
                        ZbConn.update(
                            { ...val, count_zb_sens },
                            {
                                where: {
                                    [Op.and]: [
                                        { id_zb_sens: val.id_zb_sens },
                                        { lock: false },
                                    ],
                                },
                            }
                        )
                        //--end update form

                        //--for update zblog
                        if (_.isUndefined(val.stop_reason) == false) {
                            ZbLog.findOne({
                                where: {
                                    [Op.and]: [
                                        { id_zb_conn: result.uuid },
                                        { lock: false },
                                    ],
                                },
                                raw: true,
                            }).then((logResult) => {
                                if (logResult === null) {
                                    ZbLog.create({
                                        id_zb_conn: result.uuid,
                                        stop_reason: val.stop_reason,
                                        lock: false,
                                    })
                                } else {
                                    ZbLog.update(
                                        { stop: dayjs(), lock: true },
                                        {
                                            where: {
                                                [Op.and]: [
                                                    { uuid: logResult.uuid },
                                                ],
                                            },
                                        }
                                    ).then(() => {
                                        ZbLog.create({
                                            id_zb_conn: result.uuid,
                                            stop_reason: val.stop_reason,
                                            lock: false,
                                        })
                                    })
                                }
                            })
                        }
                        //--end update zblog
                    }
                })
            })
            res.status(200).json({ message: 'success' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error })
        }
    },
    async upZbconn(req, res) {
        const data = req.body
        try {
            const respone = ZbConn.update(data, {
                where: {
                    [Op.and]: [{ uuid: data.uiid }, { lock: false }],
                },
            })
            res.status(200).json(respone)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    async getZb(req, res) {
        try {
            const zbSens = await ZbSens.findAll({ raw: true })
            const zbView = await ZbView.findAll({ raw: true })
            const machine = await MaintenanceMachine.findAll({ raw: true })

            const comb = _.map(zbSens, (val) => {
                return {
                    ...val,
                    zbView: _.find(zbView, { id: val.id_zb_view }),
                    machine: _.find(machine, {
                        mch_code: val.mch_code,
                        mch_com: val.mch_com,
                    }),
                }
            })

            res.status(200).json(comb)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    async getZbOnlie(req, res) {
        try {
            const zbConn = await ZbConn.findAll({
                where: { lock: false },
                raw: true,
            })
            const zbSens = await ZbSens.findAll({ raw: true })
            const zbView = await ZbView.findAll({ raw: true })
            const machine = await MaintenanceMachine.findAll({ raw: true })
            const zbLog = await ZbLog.findAll({
                raw: true,
                order: [['createdAt', 'DESC']],
            })

            const comb = _.map(zbSens, (val) => {
                return {
                    ...val,
                    zbConn: _.find(zbConn, { id_zb_sens: val.id }) || null,
                    zbLog:
                        _.isObject(_.find(zbConn, { id_zb_sens: val.id })) ===
                        true
                            ? _.filter(zbLog, {
                                  id_zb_conn: _.find(zbConn, {
                                      id_zb_sens: val.id,
                                  }).uuid,
                              })
                            : [],

                    zbView: _.find(zbView, { id: val.id_zb_view }),
                    machine:
                        _.find(machine, {
                            mch_code: val.mch_code,
                            mch_com: val.mch_com,
                        }) || null,
                }
            })

            res.status(200).json(comb)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
}
