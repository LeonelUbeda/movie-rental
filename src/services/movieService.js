import MovieModel from "../models/movieModel"
import UserModel from "../models/userModel";


const createMovie = async ({title, description, rentalPrice, salePrice, availability}) => {
    try{
        const movie = MovieModel.build({
            title,
            description,
            rentalPrice,
            salePrice,
            ...(availability && {availability})
        })
        await movie.save()
        return movie
    }catch (e){
        throw e
    }
}

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
    console.log(query)

    return await MovieModel.findAll(query)
}


const likeMovie = async (movieId, userId, action="add") => {
    const user = await UserModel.findOne({where: {id: userId}})
    const movie = await MovieModel.findOne({where: {id: movieId}})
    // TODO: improve error handling
    if (user === null){
        throw new Error("User not found")
    }
    if (movie === null){
        throw new Error("Movie not found")
    }
    const change = action === "add" ? await user.addMovie(movie) : await user.removeMovie(movie)
    console.log(change)
    //if perform removeMovie, change is integer
    //if perform addMovie, change can be object or undefined
    return !(change === 'undefined' || change === 0)

}

likeMovie.ADD = "add"
likeMovie.REMOVE = "remove"

export default {createMovie, getMovies, likeMovie}