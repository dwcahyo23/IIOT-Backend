import { Op, Sequelize, where } from 'sequelize'
import dayjs from 'dayjs'
import _ from 'lodash'

import { ProductionSCW } from '../models/ScwProduction'

export default {
    //? GET DATA
    async getPDSCW(req, res) {
        await ProductionSCW.findAll()
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    //? CREATE DATA
    async createPDSCW(req, res) {
        await ProductionSCW.create(req.body)
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    //! REMOVE DATA
    async removePDSCW(req, res) {
        await ProductionSCW.destroy({
            where: { uuid: req.params.id },
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    //? GET DATA BY ID
    async getByIdPDSCW(req, res) {
        await ProductionSCW.findOne({
            where: { uuid: req.params.id },
        })
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },

    //? SAVE DATA BY ID
    async saveByIdPDSCW(req, res) {
        // const data = req.body
        await ProductionSCW.update(req.body, {
            where: { uuid: req.params.id },
        })
            .then((x) => res.status(200).json(req.body))
            .catch((err) => res.status(500).json(err))
    },
}
