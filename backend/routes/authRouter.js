import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import * as userController from '../controllers/user/userController.js'

const router = express.Router()

router.post('/login', userController.loginUser)
router.post('/register', userController.registerUser)
router.route('/profile').get(protect, userController.getUserProfile)

export default router