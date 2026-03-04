import express from 'express'
import authMiddleware from '../../../shared/middleware/auth.middleware.js'

const router = express.Router()



router.post('/create',authMiddleware())
router.post('/delete/:id',authMiddleware(['admin']))

router.get('/all',authMiddleware())

export default router
