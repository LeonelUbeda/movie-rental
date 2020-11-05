import Joi from 'joi'

export const schema = {
    title: Joi.string()
        .max(100)
        .required(),
    description: Joi.string()
        .max(250)
        .required(),
    rentalPrice: Joi.number()
        .required(),
    salePrice: Joi.number()
        .required(),
    availability: Joi.boolean()
        .default(true)
        .required()
}

const movieSchema = Joi.object(schema)


export default movieSchema