import database from '../database'
import UserModel from "./userModel";
import MovieModel from "./movieModel";

const UserMovieLikeModel = database.define('UserLikeMovieModel', {

})

UserModel.belongsToMany(MovieModel, {through: UserMovieLikeModel})
MovieModel.belongsToMany(UserModel, {through: UserMovieLikeModel})
export default UserMovieLikeModel