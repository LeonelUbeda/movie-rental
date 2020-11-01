const defaultFields = [
    'username',
    'firstName',
    'lastName',
    'email'
]

const fullFields = [
    ...defaultFields,
    'isAdmin',
    'updatedAt',
    'createdAt',
    'id'
]


// can receive an object or an arrangement of objects
const genericSerializer = (elements, serializer=defaultFields) => {

    if (Array.isArray(elements)){
        let serializedElements = []
        for (const element of elements){
            let serializedElement = {}
            for (const field of serializer){
                // TODO: do a efficient validation if element[field] is undefined
                serializedElement[field] = element[field]
            }
            serializedElements.push(serializedElement)
        }
        return serializedElements
    }else{
        let serializedElement = {}
        for (const field of serializer){
            serializedElement[field] = elements[field]
        }
        return serializedElement
    }
}

export default {genericSerializer, defaultFields, fullFields}
