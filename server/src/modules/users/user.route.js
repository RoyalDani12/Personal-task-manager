import express from 'express'
import updateProfileController from './controller/upload.profile.controller.js'
import { upload } from '../../shared/middleware/upload.middleware.js'
import authMiddleware from '../../shared/middleware/auth.middleware.js'

const router = express.Router()



router.post('/upload-profile/:id',authMiddleware(),upload.single('avatar'),updateProfileController )


export default router