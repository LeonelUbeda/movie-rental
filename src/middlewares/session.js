import jwt from 'jsonwebtoken'

const deserializeSession = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if(authHeader){
        try{
            const token = authHeader.split(' ')[1]
            req.user = await jwt.verify(token, process.env.SUPER_SECRET)
        }catch { }

    }
    next()

}


export default {deserializeSession}