import { Op, Sequelize } from 'sequelize'
import { GenbaAcip } from '../models/GenbaModel'
import sharp from 'sharp'
import _ from 'lodash'

export default {
    async instGenbaAcip(req, res) {
        const data = req.body
        try {
            const response = GenbaAcip.create({
                ...data,
                id_genba: req.params.id,
                plant: 'N/A',
            }).then(() =>
                GenbaAcip.findOne({
                    where: { id_genba: req.params.id },
                }).then((x) => res.status(200).json(x.sheet))
            )
            return res.status(200).json(response)
        } catch (error) {
            console.log(error.message)
            return res.status(500).send(error.message)
        }
    },

    async updtGenbaAcip(req, res) {
        const data = req.body
        GenbaAcip.update(data, {
            where: { sheet: req.params.id },
        })
            .then(() =>
                GenbaAcip.findOne({
                    where: { sheet: req.params.id },
                }).then((x) => res.status(200).json(x.id_genba))
            )
            .catch((error) => res.status(500).send(error.message))
    },

    async saveGenbaAcip(req, res) {
        const data = req.body
        GenbaAcip.update(data, {
            where: { id_genba: data.id_genba },
        })
            .then(() =>
                GenbaAcip.findOne({
                    where: { id_genba: data.id_genba },
                }).then((x) => res.status(200).json(x))
            )
            .catch((error) => res.status(500).send(error.message))
    },

    async ConvertAcip(req, res) {
        const data = req.body
        try {
            const response = await GenbaAcip.findAll({
                where: Sequelize.where(
                    Sequelize.fn('char_length', Sequelize.col('images1')),
                    {
                        [Op.gt]: 100000,
                    }
                ),
                raw: true,
            })

            const compresImage = (attachmentData, resize, quality) => {
                let imgBuffer = Buffer.from(attachmentData.data, 'base64')
                return new Promise((resolve, reject) => {
                    sharp(imgBuffer)
                        .resize(resize)
                        .jpeg({ quality: quality })
                        .toBuffer()
                        .then((resizedImageBuffer) => {
                            let resizedImageData =
                                resizedImageBuffer.toString('base64')
                            let resizedBase64 = `data:${attachmentData.mimetype};base64,${resizedImageData}`
                            resolve({
                                mimetype: attachmentData.mimetype,
                                data: resizedImageData,
                                filename: attachmentData.filename,
                                filesize: resizedImageData.length,
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                            reject(err)
                        })
                })
            }

            if (response.length > 0) {
                _.forEach(response, async (val) => {
                    const images = JSON.parse(val.images1)
                    await compresImage(images, data.reszie, data.quality).then(
                        (x) => {
                            console.log(`${images.filesize} => ${x.filesize}`)
                        }
                    )
                })
            }

            return res.status(200).send('convert images')
        } catch (error) {
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
                attributes: { exclude: ['images1', 'images2'] },
            })
            // return res.status(200).json({ payload: 'success', data: data })
            return res.status(200).json(data)
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
            const response = GenbaAcip.destroy({
                where: { id_genba: req.params.id },
            })
            return res.status(200).json(response)
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
