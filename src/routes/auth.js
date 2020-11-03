import { Router } from 'express'
import authControllers from '../controllers/auth'
import permissionsMiddleware from "../middlewares/permissionsMiddleware";
import {ACTION, ENTITIES} from "../permissions";


const router = Router()

router.post('/register', permissionsMiddleware(ENTITIES.USER, ACTION.WRITE), authControllers.signIn)
router.post('/login', authControllers.logIn)


export default router