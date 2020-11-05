import Joi from 'joi'

const movieSchema = Joi.object({
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
})

export default movieSchema