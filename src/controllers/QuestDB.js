import quest from '../config/quest'

export default {
    async getQuery(req, res) {
        const data = req.body
        // console.log(data)
        let query = `SELECT min(count), max(count), max(count)-min(count) as total from zbSens where id = '${data.id_zb_sens}' and ts BETWEEN '${data.ts1}' AND '${data.ts2}';`

        await quest
            .query(query)
            .then((response) => res.status(200).json(response.rows))
            .catch((err) => res.status(500).send(err))
    },
}
