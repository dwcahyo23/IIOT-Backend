import { Op, Sequelize, QueryTypes } from 'sequelize'

import {
    MaintenanceReport,
    MaintenanceRequest,
    MaintenanceMachine,
    MaintenanceSparepart,
    MaintenanceStock,
    MaintenanceUser,
    MaintenanceSparepartControlStcok,
} from '../models/MaintenanceSystemModel'

import { PgMowMtn } from '../models/PgMowMtn'

import pg2 from '../config/pg2'
import dayjs from 'dayjs'
import { types } from 'pg'
import _ from 'lodash'

export default {
    //? GET DATA
    async getMnReport(req, res) {
        await MaintenanceReport.findAll()
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnRequest(req, res) {
        await MaintenanceRequest.findAll()
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnMachine(req, res) {
        await MaintenanceMachine.findAll()
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnSparepart(req, res) {
        await MaintenanceSparepart.findAll()
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnStock(req, res) {
        await MaintenanceStock.findAll()
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnStockControl(req, res) {
        await MaintenanceSparepartControlStcok.findAll()
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnErp(req, res) {
        await PgMowMtn.findAll({
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
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnStokErp(req, res) {
        await pg2
            .query(
                "select a.mat_no, a.mat_name, a.stk_qty, a.stk_no, a.modi_time from sch_ot.mat_stk_mast_view a, sch_ot.bas_stk_mast b where a.stk_no = b.stk_no and b.stk_kind = 'B'",
                { type: QueryTypes.SELECT }
            )
            .then((x) => {
                const _x = _.map(x, (val) => {
                    return {
                        ...val,
                        id: `${val.stk_no}${dayjs(val.modi_time).unix()}`,
                    }
                })
                res.status(200).json(_x)
            })
            .catch((err) => res.status(500).json(err))
    },

    async getMnIssuErp(req, res) {
        await pg2
            .query('SELECT x.* FROM sch_ot.view_mat_len_mast x', {
                type: QueryTypes.SELECT,
            })
            .then((x) => {
                const _x = _.map(x, (val) => {
                    return {
                        ...val,
                        id: `${val.stk_no}${dayjs(val.modi_time).unix()}`,
                    }
                })
                res.status(200).json(_x)
            })
            .catch((err) => res.status(500).json(err))
    },

    async getMnPurErp(req, res) {
        await pg2
            .query(
                "SELECT a.*, b.mat_name  FROM sch_ot.mat_pur_mast_view a left join sch_ot.bas_mat_mast b on a.mat_no = b.mat_no where pur_sheet_no like 'MRE%' and a.mat_no like any (array['A%', 'H%']) and date_part('year', pp_ymd) >= 2023 order by a.pur_sheet_no desc",
                {
                    type: QueryTypes.SELECT,
                }
            )
            .then((x) => {
                const _x = _.map(x, (val) => {
                    return {
                        ...val,
                        mat_no: _.trim(val.mat_no),
                        pur_sheet_no: _.trim(val.pur_sheet_no),
                        id: `${_.trim(val.mat_no)}${_.trim(val.pur_sheet_no)}`,
                    }
                })
                res.status(200).json(_x)
            })
            .catch((err) => res.status(500).json(err))
    },

    //? GET DATA BY ID

    async getMnReportById(req, res) {
        await MaintenanceReport.findOne({
            where: { sheet_no: req.params.id },
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnRequestById(req, res) {
        await MaintenanceRequest.findOne({
            where: { sheet_no: req.params.id },
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnMachineById(req, res) {
        await MaintenanceMachine.findOne({ where: { uuid: req.params.id } })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnSparepartById(req, res) {
        await MaintenanceSparepart.findOne({ where: { uuid: req.params.id } })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnStockById(req, res) {
        await MaintenanceStock.findOne({ where: { uuid: req.params.id } })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnStockControlById(req, res) {
        await MaintenanceSparepartControlStcok.findOne({
            where: { uuid: req.params.id },
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async getMnErpById(req, res) {
        await PgMowMtn.findOne({ where: { sheet_no: req.params.id } })({
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
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    //? SAVE DATA OR UPDATE BY ID

    async saveMnReportById(req, res) {
        const data = req.body
        await MaintenanceReport.upsert(data)
            .then(([instance, created]) => {
                res.status(200).json(data)
            })
            .catch((err) => res.status(500).json(err))
    },

    async saveMnRequestById(req, res) {
        const data = req.body
        await MaintenanceRequest.upsert(data)
            .then(([instance, created]) => {
                res.status(200).json(data)
            })
            .catch((err) => res.status(500).json(err))
    },

    async saveMnMachineById(req, res) {
        const data = req.body
        await MaintenanceMachine.upsert(data)
            .then(([instance, created]) => {
                res.status(200).json(data)
            })
            .catch((err) => res.status(500).json(err))
    },

    async saveMnSparepartById(req, res) {
        const data = req.body
        await MaintenanceSparepart.upsert(data)
            .then(([instance, created]) => {
                res.status(200).json(data)
            })
            .catch((err) => res.status(500).json(err))
    },

    async saveMnStockById(req, res) {
        const data = req.body
        await MaintenanceStock.upsert(data)
            .then(([instance, created]) => {
                res.status(200).json(data)
            })
            .catch((err) => res.status(500).json(err))
    },

    async saveMnStockControlById(req, res) {
        const data = req.body
        await MaintenanceSparepartControlStcok.upsert(data)
            .then(([instance, created]) => {
                res.status(200).json(data)
            })
            .catch((err) => res.status(500).json(err))
    },

    //! REMOVE DATA BY ID

    async removeMnReportById(req, res) {
        await MaintenanceReport.destroy({
            where: { sheet_no: req.params.id },
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async removeMnRequestById(req, res) {
        await MaintenanceRequest.destroy({
            where: { sheet_no: req.params.id },
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async removeMnMachineById(req, res) {
        await MaintenanceMachine.destroy({ where: { uuid: req.params.id } })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async removeMnSparepartById(req, res) {
        await MaintenanceSparepart.destroy({ where: { uuid: req.params.id } })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    async removeMnStockById(req, res) {
        await MaintenanceStock.destroy({ where: { uuid: req.params.id } })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },
}
