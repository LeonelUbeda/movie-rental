import { DataTypes } from "sequelize";
import database from '../database'
import MovieItemModel from "./movieItemModel";
import UserModel from "./userModel";

const PurchaseModel = database.define('Purchase', {
    purchasedAt: DataTypes.DATE(),
    boughtFor: DataTypes.FLOAT(),
})

PurchaseModel.belongsTo(MovieItemModel, {foreignKey: 'movieId'})
PurchaseModel.belongsTo(UserModel, {foreignKey: 'purchasedBy'})
PurchaseModel.belongsTo(UserModel, {foreignKey: 'soldBy'})

export default PurchaseModel