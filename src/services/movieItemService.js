import MovieModel from "../models/movieModel";
import MovieItemModel from "../models/movieItemModel";
import movieEvents from "../events/movieEvents";

const ERROR = {
    MOVIE_NOT_FOUND: "Movie not found",
    ITEM_NOT_FOUND: "Item not found"
}

const createItem = async (movieId) => {
    const movie = await MovieModel.findOne({where: {id: movieId}})
    if (!movie){
        return {error: ERROR.MOVIE_NOT_FOUND}
    }
    let movieItem = await MovieItemModel.create({MovieId: movie.id })
    movieEvents.emit('item_created', movie.id)
    return {value: movieItem}
}

const deleteItem = async (movieId, itemId) => {
    const movie = await MovieModel.findOne({where: {id: movieId}})

    if (!movie){
        return {error: ERROR.MOVIE_NOT_FOUND}
    }
    let deletedItem = await MovieItemModel.destroy({where: {id: itemId}})
    console.log(deletedItem)
    if (deletedItem > 0){
        movieEvents.emit('item_deleted', movie.id)
    }else{
        return {error: ERROR.ITEM_NOT_FOUND}
    }
    return {value: deletedItem}
}
export default { createItem, deleteItem }