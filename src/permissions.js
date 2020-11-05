import MovieModel from "./models/movieModel"
import UserModel from "./models/userModel"
import UserMovieLikeModel from "./models/userMovieLikeModel";


export const PERMISSION_TYPES = {
    ADMIN: "admin",
    DEFAULT: "default",
    ANONYMOUS: "anonymous"
}

export const SECTION = {
    MOVIE: "movieSection",
    USER: "userSection",
    USER_MOVIE_LIKE: "userMovieLikeSection",
}

//if action permission is not specified, default is false
export const ACTION = {

    //method: GET
    //values: Boolean, Array
    READ: "read",

    //method: POST
    //values: Boolean, Array
    INSERT: "write",

    //method: PATCH
    // Boolean, Array
    UPDATE: "update",

    //method: DELETE
    //values: Boolean
    DELETE: "delete",
    OTHERS: "others",

    //method: PUT
    //values: Boolean
    MERGE: "merge"
}


export const PERMISSIONS = {
    [PERMISSION_TYPES.ADMIN]: {
        name: "admin",
        models: {
            [SECTION.MOVIE]: {
                [ACTION.READ]: true,
                [ACTION.INSERT]: true,
                [ACTION.UPDATE]: true,
                [ACTION.MERGE]: true,
                [ACTION.DELETE]: true
            },
            [SECTION.USER]: {
                [ACTION.READ]: true,
                [ACTION.INSERT]: true,
                [ACTION.UPDATE]: true,
                [ACTION.DELETE]: true,
                [ACTION.MERGE]: true,
                [ACTION.OTHERS]: true
            },
            [SECTION.USER_MOVIE_LIKE]: {
                [ACTION.MERGE]: true,
                [ACTION.DELETE]: true
            }
        }
    },
    [PERMISSION_TYPES.DEFAULT]: {
        name: "default",
        models: {
            [SECTION.MOVIE]: {
                [ACTION.READ]: ["title", "description", "stock", "rentalPrice", "salePrice", "likes"],
            },
            [SECTION.USER]: {
                [ACTION.READ]: ["username", "email", "firstName", "lastName"],
                [ACTION.UPDATE]: ["password", "firstName", "lastName"],
            },
            [SECTION.USER_MOVIE_LIKE]: {
                [ACTION.MERGE]: true,
                [ACTION.DELETE]: true
            }
        }
    },
    [PERMISSION_TYPES.ANONYMOUS]: {
        name: "Anonymous",
        models: {
            [SECTION.MOVIE]: {
                read: ["title", "description", "stock", "rentalPrice", "salePrice", "likes"],
            },
            [SECTION.USER]: {
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


