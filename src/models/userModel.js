import { DataTypes } from "sequelize";
import database from '../database'

import bcrypt from 'bcrypt'

const UserModel = database.define('User', {
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
}, {
    hooks: {
        beforeSave: async (instance, options) => {
            if(instance.changed('password')){
                const salt = await bcrypt.genSalt(10)
                instance.password = await bcrypt.hash(instance.password, salt)
            }
        }
    },


})

UserModel.prototype.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password)
}




export default UserModel