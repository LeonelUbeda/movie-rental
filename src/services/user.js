import { Op } from 'sequelize'
import User from '../models/user'

async function createUser({username, firstName, lastName, email, password}){
    try {
        const findUser = await User.findOne({
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
        const user = User.build({
            username,
            firstName,
            lastName,
            email,
            password
        })
        await user.save()
        return user
    }catch (e) {
        throw e
    }
}

export default {createUser}