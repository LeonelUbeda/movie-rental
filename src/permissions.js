import Movie from "./models/movie"
import User from "./models/user"


export const PERMISSION_TYPES = {
    ADMIN: "admin",
    DEFAULT: "default",
    ANONYMOUS: "anonymous"
}

export const ENTITIES = {
    MOVIE: Movie.tableName,
    USER: User.tableName
}

//if action permission is not specified, default is false
export const ACTION = {
    READ: "read",
    WRITE: "write",
    UPDATE: "update",
    DELETE: "delete",
    OTHERS: "others"
}


export const PERMISSIONS = {
    [PERMISSION_TYPES.ADMIN]:{
        name: "admin",
        models: {
            [ENTITIES.MOVIE]: {
                [ACTION.READ]: "*",
                [ACTION.WRITE]: "*",
                [ACTION.UPDATE]: "*",
                [ACTION.DELETE]: true
            },
            [ENTITIES.USER]: {
                [ACTION.READ]: "*",
                [ACTION.WRITE]: "*",
                [ACTION.UPDATE]: "*",
                [ACTION.DELETE]: true,
                [ACTION.OTHERS]: true
            }
        }
    },
    [PERMISSION_TYPES.DEFAULT]: {
        name: "default",
        models: {
            [ENTITIES.MOVIE]: {
                [ACTION.READ]: ["title", "description", "stock", "rentalPrice", "salePrice", "likes"],
            },
            [ENTITIES.USER]: {
                read: ["username", "email", "firstName", "lastName"],
                update: ["password", "firstName", "lastName"],
            }
        }
    },
    [PERMISSION_TYPES.ANONYMOUS]: {
        name: "Anonymous",
        models: {
            [ENTITIES.MOVIE]: {
                read: ["title", "description", "stock", "rentalPrice", "salePrice", "likes"],
            },
            [ENTITIES.USER]: {
                write: ["username" ,"password", "firstName", "lastName", "password", "email"]
            }
        }
    }
}

export const filterPropertiesByPermissions = (elements, allowedFields) => {
    if (allowedFields === '*'){
        return elements
    }
    if (Array.isArray(elements)){
        let serializedElements = []
        for (const element of elements){
            let serializedElement = {}
            for (const field of allowedFields){
                // TODO: do a efficient validation if element[field] is undefined
                serializedElement[field] = element[field]
            }
            serializedElements.push(serializedElement)
        }
        return serializedElements
    }else{
        let serializedElement = {}
        for (const field of allowedFields){
            serializedElement[field] = elements[field]
        }
        return serializedElement
    }
}


