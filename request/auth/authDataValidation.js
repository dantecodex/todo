import Joi from "joi";

const userSignUpDataValidation = Joi.object({
    first_name: Joi.string().min(2).max(120).trim().lowercase().required(),
    last_name: Joi.string().min(2).max(120).trim().lowercase().required(),
    username: Joi.string().min(2).max(120).trim().lowercase().required(),
    password: Joi.string().min(5).max(120).required()
})

const userLoginDataValidation = Joi.object({
    username: Joi.string().min(2).max(120).trim().lowercase().required(),
    password: Joi.string().min(5).max(120).required()
})

export { userSignUpDataValidation, userLoginDataValidation }