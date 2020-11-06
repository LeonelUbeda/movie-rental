
//This function prevents the user from filtering by not allowed fields
const cleanSort = (sort, allowedFields, defaultValue="title") => {

    function compare(item){
        return (
            (item[0] === '-' && allowedFields.indexOf(item.substring(1)) > -1) ||
            allowedFields.indexOf(item) > -1
        )
    }
    if (allowedFields === true){
        return sort
    }
    //TODO: refactor this pls
    if (typeof sort === 'string'){
        return compare(sort) ? sort : defaultValue
    }else if (Array.isArray(sort)){
        let cleaned = sort.filter(e => compare(e))
        return cleaned.length > 0 ? cleaned : defaultValue
    }
}

export default {cleanSort}
