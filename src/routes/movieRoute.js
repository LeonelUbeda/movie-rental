import {Router} from 'express'
import movieControllers from '../controllers/movieController'
import {ACTION, SECTION} from "../permissions";
import permissionsMiddleware from "../middlewares/permissionsMiddleware";

const router = Router()


router.get('/', permissionsMiddleware(SECTION.MOVIE, ACTION.READ), movieControllers.getMovies)
router.post('/', permissionsMiddleware(SECTION.MOVIE, ACTION.INSERT), movieControllers.createMovie)
// router.patch('/:movieId', permissionsMiddleware(ENTITIES.MOVIE, ACTION.UPDATE), movieControllers.)

router.put('/:movieId/like', permissionsMiddleware(SECTION.USERMOVIELIKE, ACTION.MERGE), movieControllers.likeMovie)
router.delete('/:movieId/like', permissionsMiddleware(SECTION.USERMOVIELIKE, ACTION.DELETE), movieControllers.removeLikeMovie)

export default router