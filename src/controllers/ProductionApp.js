import { Op, Sequelize } from 'sequelize'
import { ScwModel } from '../models/ScwProduction'

export default {
    async insScw(req, res) {
        const data = req.body
        await ScwModel.create({ ...data })
            .then((response) => res.status(200).json(response))
            .catch((err) => res.status(500).json(err))
    },

    async upScw(req, res) {
        const data = req.body
        await ScwModel.update({ ...data }, { where: { uuid: req.params.id } })
    },
}
