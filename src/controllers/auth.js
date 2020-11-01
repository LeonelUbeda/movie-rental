import userValidator from '../validators/user'
import userService from '../services/user'
import authService from '../services/auth'
import userSerializer from '../serializers/userSerializer'

const signIn = async (req, res) => {
    // TODO: A logged can only create more accounts if is admin
    const { value , error } = userValidator.validate(req.body, {abortEarly: false})

    let serializerFields = req.user?.isAdmin ? userSerializer.fullFields : userSerializer.defaultFields

    if(error){
        console.log("error", error.details)
        res.status(400).json({error: "error"})
    }
    try{
        console.log(value)
        const user = await userService.createUser(value)
        res.json(userSerializer.genericSerializer(user, serializerFields))
    }catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

const logIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password){
        res.status(400).json({error: 'Please provide an email and password'})
    }
    try{
        const token = await authService.createSession({email, password})
        res.json({token})
    }catch (e) {
        res.status(400).json({error: e.message})
    }

}

export default {signIn ,logIn}