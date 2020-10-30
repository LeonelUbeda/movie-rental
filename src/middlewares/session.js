import jwt from 'jsonwebtoken'

const deserializeSession = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log('pasandooo')
    if(authHeader){
        try{
            const token = authHeader.split(' ')[1]
            const data = await jwt.verify(token, process.env.SUPER_SECRET)
            req.user = data
        }catch (e){
            // console.log(e)
        }

    }
    next()

}


export default {deserializeSession}