import movieValidator, { schema } from '../validators/movieValidator'
import movieService from '../services/movieService'
import {filterPropertiesByPermissions, filterSearchByPermissions } from "../permissions";
import filtering from '../utils/filtering'
import pagination  from '../utils/pagination'

const ERROR = {
    BAD_REQUEST: "Bad request",
    SERVER_ERROR: "Internal server error"
}


/* -----------  READ ---------- */
const getMovies = async (req, res) => {
    try{

        //just cleaning sort
        let {sort="title"} = req.query;
        sort = filtering.cleanSort(sort, req.user.allowedFields, "title")

        let filters = filterSearchByPermissions(req.query, req.user.allowedFields, "__")
        const { limit, offset } = pagination.handlePagination(req.query)

        //if user dont have permissions to availability field, lets add a filter: availability=true
        if (Array.isArray(req.user.allowedFields)){
            if (req.user.allowedFields.indexOf('availability') === -1){
                filters.availability = true
            }

        }

        //filtering
        let movieQuery = {
            limit,
            offset,
            order: sort,
            filters,
            //if allowedFields equals true, dont need attributes
            ...(!(req.user.allowedFields === true) && {attributes: req.user.allowedFields})
        }

        let movies = await movieService.getMovies(movieQuery)
        res.json(movies)

    }catch (e){
        console.log(e)
        res.status(500).json({message: ERROR.SERVER_ERROR})
    }
}

const getMovie = async (req, res) => {
    const { movieId } = req.params
    //TODO: if user dont have permissions to availability, send 403
    try{
        let {error, value: movie } = await movieService.getMovie(movieId)

        if (error){
            res.status(404).json({message: error})
        }else{
            movie = filterPropertiesByPermissions(movie, req.user.allowedFields)
            return res.json(movie)
        }
    }catch (e){
        res.status(500).send({error: ERROR.SERVER_ERROR})
    }
}


/*  CREATE  */
const createMovie = async (req, res) => {
    const data = filterPropertiesByPermissions(req.body, req.user.allowedFields)
    // If the user does not have permission to modify a field and that field is required, the default value of the validator is used
    // for example, default value for movie.availability is true
    const { value , error } = movieValidator.validate(data, {abortEarly: false})

    if (!error){
        try{
            const movie = await movieService.createMovie(value)
            res.status(201).json(movie)
        }catch (e){
            res.status(500).json({message: ERROR.SERVER_ERROR})
        }
    }else{
        res.status(400).json({
            message: ERROR.BAD_REQUEST,
            errors: error.details.map(e => e.message)
        })
    }

}


const createOrTotalUpdate = async (req, res) => {

}

const partialMovieUpdate = async (req, res) => {
    const { movieId } = req.params

    try{
        const data = filterPropertiesByPermissions(req.body, req.user.allowedFields)

        //If the user does not send any data with which he can operate
        if (Object.keys(data).length === 0){
            // TODO: Make a message for example: "Valid fields: ["title"]
            return res.status(400).json({message: ERROR.BAD_REQUEST})
        }

        //If we have data, let's validate the request data
        let errors = []
        for (let prop in data){
            //validating each prop of data object
            const { error: validationError } = schema[prop]?.validate(data[prop]) ?? {}
            if (validationError){
                console.log(validationError)
                //e.message is "\"value\" must be a integer
                //so we split and use the "mus be a integer" and concatenate with prop name
                //so now is: rentalPrice must be a integer
                errors.push(...validationError.details.map(e => prop + e.message.split(`"`)[2]))
            }
        }
        if (errors.length > 0){
            return res.status(400).json({message: ERROR.BAD_REQUEST, errors})
        }

        //if data from user is correct...
        let { error } = await movieService.updateMovie(movieId, data)
        if (error){
            return res.status(404).json({message: error})
        }
        return res.status(204).send()


    }catch (e) {
        console.log(e)
        return res.status(500).json({message: ERROR.SERVER_ERROR})
    }

}

const deleteMovie = async (req, res) => {
    const { movieId } = req.params
    try{
        const {error, value: movie} = await movieService.deleteMovie(movieId)
        if(error){
            return res.status(404).json({message: error})
        }
        return res.status(204).send()
    }catch (e) {
        res.status(500).json({message: ERROR.SERVER_ERROR})
    }
}


const likeMovie = async (req, res) => {
    const { movieId } = req.params
    const userId = req.user.id
    try{
        const {error, value: created} = await movieService.likeMovie(movieId, userId, movieService.likeMovie.ADD)
        if (!error){
            res.status(created ? 204 : 304).send()
        }else{
            res.status(404).json({message: error})
        }
    }catch (e){
        console.log(e)
        res.status(500).json({message: ERROR.SERVER_ERROR})
    }
}

const removeLikeMovie = async (req, res) => {
    const { movieId } = req.params
    const userId = req.user.id
    try{
        const {error, value: created} = await movieService.likeMovie(movieId, userId, movieService.likeMovie.REMOVE)
        if (!error){
            res.status(created ? 204 : 304).send()
        }else{
            res.status(404).json({message: error})
        }
    }catch (e){
        console.log(e.message)
        res.status(500).json({message: ERROR.SERVER_ERROR})
    }
}

export default {createMovie, getMovies, getMovie, partialMovieUpdate, likeMovie, removeLikeMovie, deleteMovie}