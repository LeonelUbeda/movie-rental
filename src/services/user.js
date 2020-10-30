import User from '../models/user'

async function createUser({username, firstName, lastName, email, password}){
    try {
        const findUser = await User.findOne({
            $or: [{username}, {email}]
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
        const user = new User({
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