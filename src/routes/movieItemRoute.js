import { Router } from 'express'
import movieItemController from "../controllers/movieItemController";

const router = Router()

router.post('/:movieId/items', movieItemController.createMovieItem)
router.delete('/:movieId/items/:itemId', movieItemController.deleteMovieItem)


export default router

