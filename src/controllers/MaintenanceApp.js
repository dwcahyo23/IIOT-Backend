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

export default {
    //? CREATE DATA

    async createMnReport(req, res) {
        const data = req.body
        MaintenanceReport.create({ ...data })
    },
}
