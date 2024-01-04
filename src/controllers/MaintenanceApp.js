import { Op, Sequelize } from 'sequelize'

import {
    MaintenanceReport,
    MaintenanceRequest,
    MaintenanceMachine,
    MaintenanceSparepart,
    MaintenanceStock,
    MaintenanceUser,
} from '../models/MaintenanceSystemModel'

import { PgMowMtn } from '../models/PgMowMtn'

import dayjs from 'dayjs'

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

    async getMnErp(req, res) {
        await PgMowMtn.findAll({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('date', Sequelize.col('ymd')),
                        '>=',
                        '2022-01-01'
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
