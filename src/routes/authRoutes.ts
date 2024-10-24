import { Router } from 'express'
import { registerUser, loginUser, getUserProfile } from '../controllers/authController'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router()

// Public routes
router.post('/register', registerUser)
router.post('/login', loginUser)

// Protected route
router.get('/profile', authMiddleware, getUserProfile)

export default router
