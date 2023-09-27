import { Op, Sequelize } from 'sequelize'
import dayjs from 'dayjs'
import _ from 'lodash'
import { ZbView, ZbConn, ZbSens } from '../models/ZviewModel'
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
            _.forEach(data, (val) => {
                const isExists = ZbConn.findOne({
                    where: {
                        [Op.and]: [
                            { id_zb_sens: val.id_zb_sens },
                            { lock: false },
                        ],
                    },
                })

                if (isExists == null) {
                    ZbConn.create(val, { validate: true })
                        .then(() =>
                            res.status(200).json({ message: 'success' })
                        )
                        .catch((err) => res.status(500).json(err))
                } else {
                    ZbConn.update(val, {
                        where: {
                            [Op.and]: [
                                { id_zb_sens: val.id_zb_sens },
                                { lock: false },
                            ],
                        },
                    })
                }
            })
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
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

            const comb = _.map(zbConn, (val) => {
                return {
                    ...val,
                    zbSens: _.find(zbSens, { id: val.id_zb_sens }),
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
}
