import userValidator from '../validators/user'
import userService from '../services/user'
import authService from '../services/auth'

const signIn = async (req, res) => {
    const { value , error } = userValidator.validate(req.body, {abortEarly: false})

    if(error){
        console.log("error", error.details)
        res.status(400).json({error: "error"})
    }

    try{
        console.log(value)
        const user = await userService.createUser(value)
        console.log(user)
        res.json(user)
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