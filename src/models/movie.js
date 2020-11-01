import { DataTypes } from "sequelize";
import database from '../database'



const Movie = database.define('Movie', {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(250),
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    rentalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    salePrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

Movie.prototype.incrementLikes = () => {
    this.password = this.password + 1
}

Movie.prototype.decrementLikes = () => {
    if (this.password >= 0){
        this.password = this.password - 1
    }
}

Movie.prototype.addStock = (quantity) => {
    this.stock = this.stock + quantity
}

Movie.prototype.addStock = (quantity) => {
    if (this.stock >= 0){
        this.stock = this.stock - quantity
    }
}

export default Movie