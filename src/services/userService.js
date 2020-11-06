import { Op } from 'sequelize'
import UserModel from '../models/userModel'

async function createUser({username, firstName, lastName, email, password, role}){
    try {
        const findUser = await UserModel.findOne({
            where: {
                [Op.or]:[
                    {email},
                    {username}
                ]
            }
        })
        if(findUser){
            if (findUser.email === email){
                console.log('Email error')
                throw new Error('Email is already in use')
            }
            if (findUser.username === username){
                console.log('Username error')
                throw new Error('Username is already in use')
            }
        }
        const user = UserModel.build({
            username: username.toLowerCase(),
            firstName,
            lastName,
            email: email.toLowerCase(),
            password,
            role
        })
        await user.save()
        return user
    }catch (e) {
        throw e
    }
}

export default {createUser}