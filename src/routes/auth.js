import { Router } from 'express'
import authRoutes from '../controllers/auth'

const router = Router()

router.post('/register', authRoutes.signIn)
router.post('/login', authRoutes.logIn)


export default router