import {Router} from 'express'
import movieControllers from '../controllers/movieController'
import {ACTION, ENTITIES} from "../permissions";
import permissionsMiddleware from "../middlewares/permissionsMiddleware";

const router = Router()


router.get('/', permissionsMiddleware(ENTITIES.MOVIE, ACTION.READ), movieControllers.getMovies)
router.post('/', permissionsMiddleware(ENTITIES.MOVIE, ACTION.INSERT), movieControllers.createMovie)


export default router