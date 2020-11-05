import {Router} from 'express'
import movieControllers from '../controllers/movieController'
import {ACTION, SECTION} from "../permissions";
import permissionsMiddleware from "../middlewares/permissionsMiddleware";

const router = Router()


router.get('/', permissionsMiddleware(SECTION.MOVIE, ACTION.READ), movieControllers.getMovies)
router.get('/:movieId', permissionsMiddleware(SECTION.MOVIE, ACTION.READ), movieControllers.getMovie)
router.post('/', permissionsMiddleware(SECTION.MOVIE, ACTION.INSERT), movieControllers.createMovie)
// router.patch('/:movieId', permissionsMiddleware(ENTITIES.MOVIE, ACTION.UPDATE), movieControllers.)

router.put('/:movieId/like', permissionsMiddleware(SECTION.USER_MOVIE_LIKE, ACTION.MERGE), movieControllers.likeMovie)
router.delete('/:movieId/like', permissionsMiddleware(SECTION.USER_MOVIE_LIKE, ACTION.DELETE), movieControllers.removeLikeMovie)

export default router