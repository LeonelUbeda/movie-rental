import userValidator from '../validators/userValidator'
import userService from '../services/userService'
import authService from '../services/authService'
import { filterPropertiesByPermissions, PERMISSION_TYPES } from "../permissions";


const signIn = async (req, res) => {
    // TODO: A logged can only create more accounts if is admin
    let data = filterPropertiesByPermissions(req.body, req.user.allowedFields)

    //If body.role does not exist, it means that the person who made the request does not have permissions or did not
    // indicate, so it is assigned the default value
    if (typeof data.role === 'undefined'){
        data.role = PERMISSION_TYPES.DEFAULT
    }
    console.log(data.role)
    const { value , error } = userValidator.validate(data, {abortEarly: false})
    console.log(value.role)
    if(error){
        console.log("error", error.details)
        res.status(400).json({error: "error"})
    }
    try{
        console.log(value)
        let user = await userService.createUser(value)
        user = filterPropertiesByPermissions(user, req.user.allowedFields)
        //Delete password from the response, refactor this later
        delete user.password

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