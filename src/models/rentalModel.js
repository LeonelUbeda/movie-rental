import { DataTypes } from "sequelize";
import database from '../database'
import MovieModel from "./movieModel";
import UserModel from "./userModel";
import MovieItemModel from "./movieItemModel";

const RentalModel = database.define('Rental', {
    rentStart: {
        type: DataTypes.DATE(),
        allowNull: false
    },
    rentedFor: {
        type: DataTypes.FLOAT(),
        allowNull: false
    },

    rentUntil: {
        type: DataTypes.DATE(),
        allowNull: false
    },

    paidAmount: {
        type: DataTypes.FLOAT(),
        allowNull: true
    },
    returnedAt: {
        type: DataTypes.DATE(),
        allowNull: true
    }
})

RentalModel.belongsTo(MovieItemModel, {foreignKey: 'movieId'})
RentalModel.belongsTo(UserModel, {foreignKey: 'rentedBy'})
RentalModel.belongsTo(UserModel, {foreignKey: 'lessee'})

export default RentalModel