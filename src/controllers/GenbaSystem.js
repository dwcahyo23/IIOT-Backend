import { Op, Sequelize } from 'sequelize'
import { GenbaAcip } from '../models/GenbaModel'

export default {
    async instGenbaAcip(req, res) {
        const data = req.body
        try {
            await GenbaAcip.findOne({
                where: { id: req.params.id },
            }).then((obj) => {
                if (obj) {
                    console.log(data)
                    GenbaAcip.update(data, { where: { id: req.params.id } })
                    return res.status(200).send(`data was successfully updated`)
                }
                GenbaAcip.create({
                    ...data,
                    id: req.params.id,
                })
                return res.status(200).send(`data was successfully updated`)
            })
        } catch (error) {
            console.log(error.message)
            return res.status(404).send(error.message)
        }
    },
}
