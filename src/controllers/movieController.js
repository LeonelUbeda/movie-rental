import movieValidator from '../validators/movieValidator'
import movieService from '../services/movieService'
import {filterPropertiesByPermissions} from "../permissions";

const createMovie = async (req, res) => {

    const data = filterPropertiesByPermissions(req.body, req.user.allowedFields)
    // If the user does not have permission to modify a field and that field is required, the default value of the validator is used
    // for example, default value for movie.availability is true
    const { value , error } = movieValidator.validate(data, {abortEarly: false})

    if (!error){
        try{
            const movie = await movieService.createMovie(value)
            res.json(movie)
        }catch (e){
            res.status(400).json({error: e.message})
        }
    }else{
        console.log("error", error.details)
        res.status(400).json({error: error.details.map(e => e.message)})
    }

}

function handlePagination(query, limitDefault= 10, pageDefault = 1){

    let { limit, page } = query
    limit = isNaN(parseInt(limit)) ?  limitDefault : parseInt(limit)
    page = isNaN(parseInt(page)) ? pageDefault : parseInt(page)

    // to avoid negative offset
    page = page <= 1 ? pageDefault : page

    return {limit, offset: limit * (page - 1)}
}


const getMovies = async (req, res) => {
    const { limit, offset } = handlePagination(req.query)
    //TODO: search
    let movies = await movieService.getMovies({limit, offset})
    movies = filterPropertiesByPermissions(movies, req.user.allowedFields)
    res.json(movies)
}

const getMovie = async (req, res) => {
    const { movieId } = req.params
    try{
        let movie = await movieService.getMovie(movieId)
        movie = filterPropertiesByPermissions(movie, req.user.allowedFields)
        return res.json(movie)
    }catch (e){
        res.status(404).send({error: e.message})
    }
}

const partialUpdate = async (req, res) => {

}


const likeMovie = async (req, res) => {
    const { movieId } = req.params
    const userId = req.user.id
    try{
        const created = await movieService.likeMovie(movieId, userId, movieService.likeMovie.ADD)
        res.status(created ? 204 : 304).send()
    }catch (e){
        res.status(404).json({error: e.message})
    }
}

const removeLikeMovie = async (req, res) => {
    const { movieId } = req.params
    const userId = req.user.id
    try{
        const created = await movieService.likeMovie(movieId, userId, movieService.likeMovie.REMOVE)
        res.status(created ? 204 : 304).send()
    }catch (e){
        res.status(404).json({error: e.message})
    }
}

export default {createMovie, getMovies, getMovie, likeMovie, removeLikeMovie}