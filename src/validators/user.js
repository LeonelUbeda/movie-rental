import Joi from 'joi'

const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(5)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
        .required(),

    firstName: Joi.string()
        .alphanum()
        .max(50)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .max(50)
        .required(),
    email: Joi.string()
        .email()
        .required()
})

export default userSchema