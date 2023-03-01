import { Op } from 'sequelize'
import { Genba } from '../models/GenbaModel'

export default {
    async insert_genba(req, res) {
        const { name, mch_code, mch_com, mch_fin, sts, date, data } = req.body
        try {
            const genba = await Genba.create({
                name,
                mch_code,
                mch_com,
                mch_fin,
                sts,
                date,
                data,
            })
            return res.status(200).json(genba)
        } catch (err) {
            console.log(e)
            return res.status(500).send({
                message:
                    'Could not perform operation at this time, kindly try again later.',
            })
        }
    },
}
