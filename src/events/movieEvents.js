import { EventEmitter } from 'events'
import movieService from "../services/movieService";

const movieEvents = new EventEmitter()

//TODO: avoid the execution of two queries

movieEvents.on('item_created', async (movieId) => {

    await movieService.addStock(movieId, 1)
    await movieService.addAvailableStock(movieId, 1)
})

movieEvents.on('item_deleted', async (movieId) => {
    await movieService.removeStock(movieId, 1)
    await movieService.removeAvailableStock(movieId, 1)
})

movieEvents.on('item_sold', async (movieId) => {
    await movieService.removeStock(movieId, 1)
    await movieService.removeAvailableStock(movieId, 1)
})

movieEvents.on('item_rented', async (movieId) => {
    await movieService.removeAvailableStock(movieId)
})

movieEvents.on('item_returned', async (movieId) => {
    await movieService.addAvailableStock(movieId, 1)
})

movieEvents.on('', () => {

})



export default movieEvents