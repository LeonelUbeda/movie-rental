import MovieModel from "../models/movieModel"
import UserModel from "../models/userModel";

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



const getMovies = async ({attributes, limit=20, offset=0, filters, order='title'}={}) => {
    if (Array.isArray(order)){
        order = order.map(element => convertToOrderBy(element))
    }else{
        //if not array, its a string so lets convert them
        //sequelize expects an array of arrays, so...
        order = [convertToOrderBy(order)]
    }

    let query = {
        limit,
        offset,
        order,
        ...(attributes && {attributes}),
        ...(filters && {filters})
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
        return error
    }
    return await movie.update(newData)
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

    const change = action === "add" ? await user.addMovie(movie) : await user.removeMovie(movie)
    //if perform removeMovie, change is integer
    //if perform addMovie, change can be object or undefined
    return {value: !(change === 'undefined' || change === 0)}

}

likeMovie.ADD = "add"
likeMovie.REMOVE = "remove"

export default {createMovie, getMovies, getMovie, updateMovie, likeMovie}