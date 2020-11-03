import UserModel from '../models/userModel'
import jwt from 'jsonwebtoken'

const createSession = async ({email, password}) => {
    try {
        const user = await UserModel.findOne({where: {email}})
        if (!user){
            throw new Error('Incorrect credentials')
        }

        const passwordIsValid = await user.comparePassword(password)
        if (!passwordIsValid){
            throw new Error('Incorrect credentials')
        }

        const token = await jwt.sign({
            userId: user.id,
            email: user.email,
            username: user.username,
            role: user.role
        }, process.env.SUPER_SECRET, {expiresIn: process.env.JWT_EXPIRE_TIME})

        return token
    }catch (e) {
        throw e
    }
}


export default {createSession}
