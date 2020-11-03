import jwt from 'jsonwebtoken'
import { PERMISSIONS, PERMISSION_TYPES  } from '../permissions'


const deserializeSession = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    let anonymousUser = true
    if(authHeader){
        try{
            const token = authHeader.split(' ')[1]
            const tokenData = await jwt.verify(token, process.env.SUPER_SECRET)
            anonymousUser = false

            //just in case
            const permissions = PERMISSIONS[tokenData.role].models ?? PERMISSIONS[PERMISSION_TYPES.DEFAULT].models
            req.user = {
                ...tokenData,
                isAuthenticated: true,
                permissions
            }
        }catch {}

    }
    if (anonymousUser){

        req.user = {
            isAuthenticated: false,
            permissions: PERMISSIONS[PERMISSION_TYPES.ANONYMOUS].models
        }
    }
    next()

}


export default {deserializeSession}