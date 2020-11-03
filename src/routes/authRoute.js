import { Router } from 'express'
import authControllers from '../controllers/authController'
import permissionsMiddleware from "../middlewares/permissionsMiddleware";
import {ACTION, ENTITIES} from "../permissions";


const router = Router()

router.post('/register', permissionsMiddleware(ENTITIES.USER, ACTION.INSERT), authControllers.signIn)
router.post('/login', authControllers.logIn)


export default router