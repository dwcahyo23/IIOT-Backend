import express from 'express'
import Genba from '../controllers/GenbaControllers'

const router = express.Router()

router.post('/genba/create', Genba.insert_genba)

export default router
