import Joi from 'joi'

const movieSchema = Joi.object({
    title: Joi.string()
        .max(100)
        .required(),
    description: Joi.string()
        .max(250),
    rentalPrice: Joi.number()
        .required(),
    salePrice: Joi.number()
        .required(),
    availability: Joi.boolean()
})

export default movieSchema