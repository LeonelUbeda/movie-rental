import { Router } from 'express'
import authControllers from '../controllers/authController'
import permissionsMiddleware from "../middlewares/permissionsMiddleware";
import {ACTION, SECTION} from "../permissions";


const router = Router()

router.post('/register', permissionsMiddleware(SECTION.USER, ACTION.INSERT), authControllers.signIn)
router.post('/login', authControllers.logIn)


export default router