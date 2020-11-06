import movieItemService from "../services/movieItemService";


const createMovieItem = async (req, res) => {
    const { movieId } = req.params
    try{
        let { value, error } = await movieItemService.createItem(movieId)
        if (error){
            return res.status(404).json({message: "Movie not found"})
        }
        return res.status(201).json(value)
    }catch (e) {
        console.log(e.message)
        return res.status(500).json({message: "Server error"})
    }
}

const deleteMovieItem = async (req, res) => {
    const { movieId, itemId } = req.params
    try{
        // don't really need the movieId to delete the item, but the verification of the existence of the movie is done
        // in service layer
        let { value, error } = await movieItemService.deleteItem(movieId, itemId)
        if (error){
            return res.status(404).json({message: error})
        }
        return res.status(204).send()
    }catch (e) {
        console.log(e.message)
        return res.status(500).json({message: "Server error"})
    }
}

export default {createMovieItem, deleteMovieItem}