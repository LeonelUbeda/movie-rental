import {Router} from 'express'
import movieControllers from '../controllers/movie'


const router = Router()


router.get('/', movieControllers.getMovies)
router.post('/', movieControllers.createMovie)


export default router