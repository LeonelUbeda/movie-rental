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
    MOVIE_ITEMS: "movieItems",
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
        permissions: {
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
            },
            [SECTION.MOVIE_ITEMS]: {
                [ACTION.INSERT]: true,
                [ACTION.DELETE]: true
            }
        }
    },
    [PERMISSION_TYPES.DEFAULT]: {
        name: "default",
        permissions: {
            [SECTION.MOVIE]: {
                [ACTION.READ]: ["title", "description", "stock", "rentalPrice", "salePrice", "likes", "id"],
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
        permissions: {
            [SECTION.MOVIE]: {
                [ACTION.READ]: ["title", "description", "stock", "salePrice", "likes", "id"],
            },
            [SECTION.USER]: {
                [ACTION.INSERT]: ["username" ,"password", "firstName", "lastName", "password", "email"]
            }
        }
    }
}


export const filterPropertiesByPermissions = (elements, allowedFields, separator=null, invert_separator=false) => {
    if (allowedFields === true){
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
            if (elements[field]){
                serializedElement[field] = elements[field]
            }
        }
        return serializedElement
    }
}

//separator only works if elements is object type
//If separator=true then checks will be made for elements that contain field__operator.
//for example rentalPrice__lge
export const filterSearchByPermissions = (elements, allowedFields, separator="__") => {
    if (allowedFields === true){
        return elements
    }
    let serializedElement = {}
    for (const field in elements){
        let [fieldName, filterOperator] = field.split(separator)

        if (
            //If the field does not have a separator and exists in allowedFields
            (!filterOperator && allowedFields.indexOf(field) > -1) ||
            //If have a separator and if fieldName exists in allowedFields
            (allowedFields.indexOf(fieldName) > -1)
        ){
            serializedElement[field] = elements[field]
        }
    }
    // console.log(serializedElement)
    return serializedElement
}
