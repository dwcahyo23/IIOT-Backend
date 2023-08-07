import { Op, Sequelize } from 'sequelize'
import { GenbaAcip } from '../models/GenbaModel'

export default {
    async instGenbaAcip(req, res) {
        const data = req.body
        try {
            await GenbaAcip.findOne({
                where: { id_genba: req.params.id },
            }).then((obj) => {
                if (obj) {
                    console.log(data)
                    GenbaAcip.update(data, {
                        where: { id_genba: req.params.id },
                    })
                    return res.status(200).send(`data was successfully updated`)
                }
                GenbaAcip.create({
                    ...data,
                    id_genba: req.params.id,
                })
                return res.status(200).send(`data was successfully updated`)
            })
        } catch (error) {
            console.log(error.message)
            return res.status(404).send(error.message)
        }
    },

    async saveGenbaAcip(req, res) {
        const data = req.body
        try {
            await GenbaAcip.findOne({
                where: { id_genba: data.id_genba },
            }).then((obj) => {
                if (obj) {
                    const resp = GenbaAcip.update(data, {
                        where: { id_genba: data.id_genba },
                    })
                    return res.status(200).json(resp)
                } else {
                    return res.status(200).send(`error`)
                }
            })
        } catch (error) {
            console.log(error.message)
            return res.status(401).json(error)
        }
    },

    async getGenbaAcip(req, res) {
        await GenbaAcip.findAll({})
            .then((data) => {
                return res.status(200).json({ payload: 'success', data: data })
            })
            .catch((error) => console.log(error.message))
    },
}
