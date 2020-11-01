import movieValidator from '../validators/movie'
import movieService from '../services/movie'

const createMovie = async (req, res) => {
    const { value , error } = movieValidator.validate(req.body, {abortEarly: false})
    console.log(value)
    if (error){
        console.log("error", error.details)
        res.status(400).json({error: "error"})
    }
    try{
        const movie = await movieService.createMovie(value)
        res.json(movie)
    }catch (e){
        res.status(400).json({error: e.message})
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
    function getSerializer(){

    }
    const { limit, offset } = handlePagination(req.query)
    const movies = await movieService.getMovies({limit, offset})
    res.json(movies)
}

export default {createMovie, getMovies}