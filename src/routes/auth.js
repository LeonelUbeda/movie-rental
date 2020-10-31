import { Router } from 'express'
import authControllers from '../controllers/auth'

const router = Router()

router.post('/register', authControllers.signIn)
router.post('/login', authControllers.logIn)


export default router