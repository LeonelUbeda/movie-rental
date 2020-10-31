import { DataTypes } from "sequelize";
import database from '../database'


const Movie = database.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        default: 0
    },
    rentalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    salePrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
})



export default Movie