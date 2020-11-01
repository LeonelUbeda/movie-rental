import Movie from "../models/movie"


const createMovie = async ({title, description, rentalPrice, salePrice, availability}) => {
    try{
        const movie = Movie.build({
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
    const movies = await Movie.findAll(query)
    return movies
}

export default {createMovie, getMovies}