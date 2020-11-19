import Joi from '@hapi/joi'

export const registerValidation = (data: Object) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).max(1024).required(),
        }
    )

    return schema.validate(data)
}

export const loginValidation = (data: Object) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(data)
}