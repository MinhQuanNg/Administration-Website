import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as userController from '../controllers/user/userController.js'

const router = express.Router()

router.patch('/users/:id/password', protect, userController.changePassword)

export default router