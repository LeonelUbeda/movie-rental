import {Router} from 'express'
import movieControllers from '../controllers/movie'
import {ACTION, ENTITIES} from "../permissions";
import permissionsMiddleware from "../middlewares/permissionsMiddleware";

const router = Router()


router.get('/', permissionsMiddleware(ENTITIES.MOVIE, ACTION.READ), movieControllers.getMovies)
router.post('/', permissionsMiddleware(ENTITIES.MOVIE, ACTION.WRITE), movieControllers.createMovie)


export default router