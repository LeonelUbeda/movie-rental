import { DataTypes } from "sequelize";
import database from '../database'
import MovieModel from "./movieModel";


const MovieItemModel = database.define('MovieItem', {
})

MovieItemModel.belongsTo(MovieModel, {foreignKey: {field: 'movieId', allowNull: false}})

export default MovieItemModel