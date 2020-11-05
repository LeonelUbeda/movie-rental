//This middleware checks if the user has permission to perform the requested action
//And if user have permission, we assign in req.user.allowedFields the fields that user is allowed to
import {ACTION} from "../permissions";


export default function (entity, action) {
    return function (req, res, next) {
        if (
            (Array.isArray(req.user.permissions[entity]?.[action]) && req.user.permissions[entity]?.[action].length > 0) ||
            req.user.permissions[entity]?.[action] === true
        ){
            req.user.allowedFields = req.user.permissions[entity][action]
            next()
        }else{
            res.status(403).send()
        }
    }


}
