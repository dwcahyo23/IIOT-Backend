import { Op, Sequelize, where } from 'sequelize'
import dayjs from 'dayjs'
import _ from 'lodash'

import { ProductionSCW } from '../models/ScwProduction'

export default {
    async getPDSCW(req, res) {
        await ProductionSCW.findAll()
            .then((x) => res.status(200).json(x))
            .catch((err) => res.status(500).json(err))
    },
}
