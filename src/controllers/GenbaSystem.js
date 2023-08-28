import { Op, Sequelize } from 'sequelize'
import { GenbaAcip } from '../models/GenbaModel'

export default {
    async instGenbaAcip(req, res) {
        const data = req.body
        try {
            const findOne = await GenbaAcip.findOne({
                where: { id_genba: req.params.id },
            })

            if (findOne == null) {
                const response = GenbaAcip.create({
                    ...data,
                    id_genba: req.params.id,
                })
                return res.status(200).json(response)
            } else {
                const response = GenbaAcip.update(data, {
                    where: { id_genba: req.params.id },
                })
                return res.status(200).json(response)
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).send(error.message)
        }
    },

    async saveGenbaAcip(req, res) {
        const data = req.body
        try {
            const findOne = await GenbaAcip.findOne({
                where: { id_genba: data.id_genba },
            })

            if (findOne == null) {
                return res.status(404).json({ message: 'data not found' })
            } else {
                const response = GenbaAcip.update(data, {
                    where: { id_genba: data.id_genba },
                })
                return res.status(200).json(response)
            }
        } catch (error) {
            console.log(error.message)
            return res.status(500).json(error)
        }
    },

    async getGenbaAcip(req, res) {
        try {
            const data = await GenbaAcip.findAll({
                where: {
                    images1: {
                        [Op.not]: null,
                    },
                },
            })
            return res.status(200).json({ payload: 'success', data: data })
            // return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json(error)
        }
    },

    async getGenbaAcipOne(req, res) {
        try {
            const response = await GenbaAcip.findOne({
                where: { id_genba: req.params.id },
            })
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
            return res.status(500).json(error)
        }
    },

    async delGenbaAcipOne(req, res) {
        try {
            const findOne = await GenbaAcip.findOne({
                where: { id_genba: req.params.id },
            })

            if (findOne == null) {
                return res.status(404).json({ message: 'data not found' })
            } else {
                const response = GenbaAcip.destroy({
                    where: { id_genba: req.params.id },
                })
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    async removeGenbaAcipOne(req, res) {
        try {
            const findOne = await GenbaAcip.findOne({
                where: { id_genba: req.params.id },
            })

            if (findOne == null) {
                return res.status(404).json({ message: 'data not found' })
            } else {
                const response = GenbaAcip.update(
                    { images2: [] },
                    {
                        where: { id_genba: req.params.id },
                    }
                )
                return res.status(200).json(response)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
}
