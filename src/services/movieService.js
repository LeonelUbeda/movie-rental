import MovieModel from "../models/movieModel"
import UserModel from "../models/userModel";
import {Op} from "sequelize";

/*
This function takes a string and converts it into an arrangement with two elements so that they can be used in sequelize
 input: -title
 output: ['title', 'ASC']
*/
function convertToOrderBy(field){
    if (field[0] === '-'){
        return [field.substring(1), 'DESC']
    }else{
        return [field, 'ASC']
    }
}

function handleFilters(query, defaults={}) {
    const validOperators = [
        "gte",
        "lte",
        "like",
        "substring"
    ]

    let filter = {}

    for (const prop in query){
        let [filterField, filterOperator] = prop.split("__")
        if (filterOperator && validOperators.indexOf(filterOperator) > -1){
            filter[filterField] = {
                [Op[filterOperator]]: query[prop]
            }
        }else{
            filter[filterField] = query[prop]
        }
    }
    return filter
}


const getMovies = async ({attributes, limit=20, offset=0, filters, order='title'}={}) => {
    if (Array.isArray(order)){
        order = order.map(element => convertToOrderBy(element))
    }else{
        //if not array, its a string so lets convert them
        //sequelize expects an array of arrays, so...
        order = [convertToOrderBy(order)]
    }
    filters = handleFilters(filters)
    let query = {
        limit,
        offset,
        order,
        ...(attributes && {attributes}),
        ...(filters && {where: filters})
    }
    return await MovieModel.findAll(query)
}

const getMovie = async (id) => {
    let movie = await MovieModel.findOne({where: {id}})
    return movie ? {value: movie} : {error: "Movie not found"}
}


const createMovie = async ({title, description, rentalPrice, salePrice, availability,}) => {

    const movie = MovieModel.build({
        title,
        description,
        rentalPrice,
        salePrice,
        ...(availability && {availability})
    })
    await movie.save()
    return movie

}

const updateMovie = async (id, newData) => {
    let { error, value: movie } = await getMovie(id)
    if (error){
        return {error}
    }
    await movie.update(newData)
    return {}
}

const deleteMovie = async (id) => {
    let { error, value: movie} = await getMovie(id)
    if (error){
        return error
    }
    await movie.destroy()
    return {}
}

const likeMovie = async (movieId, userId, action="add") => {
    // TODO: improve error handling
    const user = await UserModel.findOne({where: {id: userId}})
    if (!user){
        return {error: "User not found"}
    }

    const movie = await MovieModel.findOne({where: {id: movieId}})
    if (!movie){
        return {error: "Movie not found"}
    }

    let change;
    if (action === "add"){
        change = await user.addMovie(movie)
        //TODO: move the LIKES logic to another service

        //if perform addMovie, change can be object or undefined
        if (typeof change !== 'undefined'){
            await MovieModel.increment('likes', {where: {id: movie.id}})
        }

        return {value: typeof change !== 'undefined'}
    }else{
        change = await user.removeMovie(movie)

        //if perform removeMovie, change is a number
        if (change > 0){
            await MovieModel.decrement('likes', {where: {id: movie.id}})
        }
        return {value: change > 0}
    }

}

likeMovie.ADD = "add"
likeMovie.REMOVE = "remove"

const addStock = async (movieId, quantity=1) => {
    return await MovieModel.increment('stock', {by: quantity, where: {id: movieId}})
}

const removeStock = async (movieId, quantity=1) => {
    return await  MovieModel.decrement('stock', {by: quantity, where: {id: movieId}})
}

const addAvailableStock = async (movieId, quantity=1) => {
    return await MovieModel.increment('availableStock', {by: quantity, where: {id: movieId}})
}

const removeAvailableStock = async (movieId, quantity=1) => {
    return await MovieModel.decrement('availableStock', {by: quantity, where: {id: movieId}})
}


export default {
    createMovie,
    getMovies,
    getMovie,
    updateMovie,

    //Likes management
    deleteMovie,
    likeMovie,

    //Stock management
    addStock,
    removeStock,

    //AvailableStock management
    addAvailableStock,
    removeAvailableStock
}